import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsActions';
import moment from 'moment';
import Chart from 'chart.js/auto';

function CarData() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedOption, setSelectedOption] = useState('today');

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  // Function to process data for the chart
  const processDataForChart = (cars, option) => {
    const data = {};

    if (option === 'today') {
      const today = moment().format('YYYY-MM-DD');
      for (let i = 0; i < 24; i++) {
        data[`${i}:00`] = 0;
      }
      cars.forEach((car) => {
        const addedAt = moment(car.createdAt);
        if (addedAt.format('YYYY-MM-DD') === today) {
          const hour = addedAt.hour();
          data[`${hour}:00`] = (data[`${hour}:00`] || 0) + 1;
        }
      });
    } else if (option === 'currentWeek') {
      const startOfWeek = moment().startOf('week');
      const endOfWeek = moment().endOf('week');
      for (let i = 0; i < 7; i++) {
        const day = startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD');
        data[moment(day).format('dddd')] = 0;
      }
      cars.forEach((car) => {
        const addedAt = moment(car.createdAt);
        if (addedAt.isBetween(startOfWeek, endOfWeek, null, '[]')) {
          const day = addedAt.format('dddd');
          data[day] = (data[day] || 0) + 1;
        }
      });
    } else if (option === 'currentMonth') {
      const startOfMonth = moment().startOf('month');
      const endOfMonth = moment().endOf('month');
      const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;
      for (let i = 0; i < daysInMonth; i++) {
        const day = startOfMonth.clone().add(i, 'day').format('YYYY-MM-DD');
        data[moment(day).format('DD')] = 0;
      }
      cars.forEach((car) => {
        const addedAt = moment(car.createdAt);
        if (addedAt.isBetween(startOfMonth, endOfMonth, null, '[]')) {
          const day = addedAt.format('DD');
          data[day] = (data[day] || 0) + 1;
        }
      });
    } else if (option === 'currentYear') {
      const startOfYear = moment().startOf('year');
      const endOfYear = moment().endOf('year');
      for (let i = 0; i < 12; i++) {
        const month = startOfYear.clone().add(i, 'month').format('MMMM');
        data[month] = 0;
      }
      cars.forEach((car) => {
        const addedAt = moment(car.createdAt);
        if (addedAt.isBetween(startOfYear, endOfYear, null, '[]')) {
          const month = addedAt.format('MMMM');
          data[month] = (data[month] || 0) + 1;
        }
      });
    }

    return data;
  };

  // Function to draw or update the chart
  const drawOrUpdateChart = (canvasId, data) => {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Check if a chart instance already exists
    if (chartInstance) {
      // If a chart instance exists, update its data and options
      chartInstance.data.labels = Object.keys(data);
      chartInstance.data.datasets[0].data = Object.values(data);
      chartInstance.options.scales.x.title.text =
        selectedOption === 'today'
          ? 'Time (Today)'
          : selectedOption === 'currentWeek'
          ? 'Day (Current Week)'
          : selectedOption === 'currentMonth'
          ? 'Day (Current Month)'
          : 'Month (Current Year)';
      chartInstance.update(); // Update the chart
    } else {
      // If no chart instance exists, create a new one
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Total Cars Added',
              data: Object.values(data),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Cars Added: ${context.parsed.y}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1,
            },
            x: {
              title: {
                display: true,
                text:
                  selectedOption === 'today'
                    ? 'Time (Today)'
                    : selectedOption === 'currentWeek'
                    ? 'Day (Current Week)'
                    : selectedOption === 'currentMonth'
                    ? 'Day (Current Month)'
                    : 'Month (Current Year)',
              },
            },
          },
        },
      });

      // Set the new chart instance
      setChartInstance(newChartInstance);
    }
  };

  useEffect(() => {
    if (cars.length > 0) {
      const data = processDataForChart(cars, selectedOption);
      drawOrUpdateChart('carChart', data);
    }
  }, [cars, chartInstance, selectedOption]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <h2>Cars Added</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="today">Today</option>
        <option value="currentWeek">Current Week</option>
        <option value="currentMonth">Current Month</option>
        <option value="currentYear">Current Year</option>
      </select>
      <canvas id="carChart" width="15000" height="10000"></canvas>
    </div>
  );
}

export default CarData;
