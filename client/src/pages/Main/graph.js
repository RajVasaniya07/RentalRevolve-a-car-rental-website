import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsActions';
import { getAllBookings } from '../../redux/actions/bookingActions';
import moment from 'moment';
import Chart from 'chart.js/auto';

const GraphComponent = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedOption, setSelectedOption] = useState('today');

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(getAllBookings());
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('email');

    const filteredCars = cars.filter((car) => car.email === email);
    const filteredCarIds = filteredCars.map((car) => car._id);

    const filteredBookings = bookings.filter((booking) => {
      if (booking.car && booking.car._id) {
        return filteredCarIds.includes(booking.car._id);
      }
      return false;
    });

    const data = processDataForChart(filteredBookings, selectedOption);

    drawOrUpdateChart('bookingChart', data);
  }, [cars, bookings, selectedOption]);

  const processDataForChart = (bookings, option) => {
    const data = {};

    if (option === 'today') {
      const today = moment();
      for (let i = 0; i < 24; i++) {
        data[`${i}:00`] = 0;
      }
      bookings.forEach((booking) => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.isSame(today, 'day')) {
          const hour = createdAt.hour();
          data[`${hour}:00`] = (data[`${hour}:00`] || 0) + 1;
        }
      });
    } else if (option === 'currentWeek') {
      const startOfWeek = moment().startOf('week');
      for (let i = 0; i < 7; i++) {
        const day = startOfWeek.clone().add(i, 'day');
        data[day.format('dddd')] = 0;
      }
      bookings.forEach((booking) => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.isSame(startOfWeek, 'week')) {
          const day = createdAt.format('dddd');
          data[day] = (data[day] || 0) + 1;
        }
      });
    } else if (option === 'currentMonth') {
      const startOfMonth = moment().startOf('month');
      const daysInMonth = moment().daysInMonth();
      for (let i = 0; i < daysInMonth; i++) {
        const day = startOfMonth.clone().add(i, 'day');
        data[day.format('DD')] = 0;
      }
      bookings.forEach((booking) => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.isSame(startOfMonth, 'month')) {
          const day = createdAt.format('DD');
          data[day] = (data[day] || 0) + 1;
        }
      });
    } else if (option === 'currentYear') {
      const startOfYear = moment().startOf('year');
      for (let i = 0; i < 12; i++) {
        const month = startOfYear.clone().add(i, 'month');
        data[month.format('MMMM')] = 0;
      }
      bookings.forEach((booking) => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.isSame(startOfYear, 'year')) {
          const month = createdAt.format('MMMM');
          data[month] = (data[month] || 0) + 1;
        }
      });
    }

    return data;
  };

  const drawOrUpdateChart = (canvasId, data) => {
    const ctx = document.getElementById(canvasId).getContext('2d');

    if (chartInstance) {
      chartInstance.data.labels = Object.keys(data);
      chartInstance.data.datasets[0].data = Object.values(data);
      chartInstance.options.scales.x.title.text = selectedOption === 'today' ? 'Time (Today)' :
        selectedOption === 'currentWeek' ? 'Day (Current Week)' :
        selectedOption === 'currentMonth' ? 'Day (Current Month)' :
        'Month (Current Year)';
      chartInstance.update();
    } else {
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Total Bookings',
            data: Object.values(data),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Bookings: ${context.parsed.y}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1
            },
            x: {
              title: {
                display: true,
                text: selectedOption === 'today' ? 'Time (Today)' :
                      selectedOption === 'currentWeek' ? 'Day (Current Week)' :
                      selectedOption === 'currentMonth' ? 'Day (Current Month)' :
                      'Month (Current Year)'
              }
            }
          }
        }
      });
      setChartInstance(newChartInstance);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <h2>Your car's Bookings</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="today">Today</option>
        <option value="currentWeek">Current Week</option>
        <option value="currentMonth">Current Month</option>
        <option value="currentYear">Current Year</option>
      </select>
      <canvas id="bookingChart" width="4000" height="2000"></canvas>
    </div>
  );
};

export default GraphComponent;
