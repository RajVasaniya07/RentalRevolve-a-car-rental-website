import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsActions';
import moment from 'moment';
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';

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

    if (chartInstance) {
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
      chartInstance.update();
    } else {
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

  // Function to generate CSV content for all objects
 // Function to generate CSV content for all objects
const generateCSVContentForAllObjects = () => {
  if (!cars || cars.length === 0) {
    return '';
  }

  // Attributes to exclude
  const excludedAttributes = ['image', 'images']; 

  // Filter out the excluded attributes
  const headers = Object.keys(cars[0]).filter(header => !excludedAttributes.includes(header));

  // Generate CSV content excluding the excluded attributes
  let csvContent = headers.join(',') + '\n';
  cars.forEach((car) => {
    const row = headers.map(header => car[header]);
    csvContent += row.join(',') + '\n';
  });
  return csvContent;
};

  // Function to initiate download of CSV file
  const handleDownloadClick = () => {
    const csvContent = generateCSVContentForAllObjects();
    if (csvContent) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'cars_data.csv');
    } else {
      console.error('No data to download');
    }
  };

  return (
    
      <div style={{ width: '95%', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <div>
            <h2 style={{ marginRight: '10px' }}>Cars Added</h2>
            <select value={selectedOption} onChange={handleSelectChange} style={{ marginRight: '10px' }}>
              <option value="today">Today</option>
              <option value="currentWeek">Current Week</option>
              <option value="currentMonth">Current Month</option>
              <option value="currentYear">Current Year</option>
            </select>
          </div>
          <button onClick={handleDownloadClick}>Download CSV</button>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '390px' }}>
          <canvas id="carChart" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
    
    
  );
  
}

export default CarData;
