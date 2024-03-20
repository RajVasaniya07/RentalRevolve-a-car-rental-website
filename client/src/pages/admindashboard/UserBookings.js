import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from "../../redux/actions/bookingActions";
import moment from "moment";
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedOption, setSelectedOption] = useState('today');

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  // Function to process data for the chart
  const processDataForChart = (bookings, option) => {
    const data = {};
    if (option === 'today') {
      const today = moment().format('YYYY-MM-DD');
      for (let i = 0; i < 24; i++) {
        data[`${i}:00`] = 0;
      }
      bookings.forEach(booking => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.format('YYYY-MM-DD') === today) {
          const hour = createdAt.hour();
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
      bookings.forEach(booking => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.isBetween(startOfWeek, endOfWeek, null, '[]')) {
          const day = createdAt.format('dddd');
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
      bookings.forEach(booking => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.isBetween(startOfMonth, endOfMonth, null, '[]')) {
          const day = createdAt.format('DD');
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
      bookings.forEach(booking => {
        const createdAt = moment(booking.createdAt);
        if (createdAt.isBetween(startOfYear, endOfYear, null, '[]')) {
          const month = createdAt.format('MMMM');
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
      chartInstance.options.scales.x.title.text = selectedOption === 'today' ? 'Time (Today)' : selectedOption === 'currentWeek' ? 'Day (Current Week)' : selectedOption === 'currentMonth' ? 'Day (Current Month)' : 'Month (Current Year)';
      chartInstance.update(); // Update the chart
    } else {
      // If no chart instance exists, create a new one
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
              stepSize: 1 // Assuming we are counting bookings, step size of 1
            },
            x: {
              title: {
                display: true,
                text: selectedOption === 'today' ? 'Time (Today)' : selectedOption === 'currentWeek' ? 'Day (Current Week)' : selectedOption === 'currentMonth' ? 'Day (Current Month)' : 'Month (Current Year)'
              }
            }
          }
        }
      });
  
      // Set the new chart instance
      setChartInstance(newChartInstance);
    }
  };
  
  useEffect(() => {
    if (bookings.length > 0) {
      const data = processDataForChart(bookings, selectedOption);
      drawOrUpdateChart('bookingChart', data);
    }
  }, [bookings, chartInstance, selectedOption]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Function to generate CSV content for all bookings
  const generateCSVContentForAllBookings = () => {
    if (!bookings || bookings.length === 0) {
      return '';
    }

    // Generate CSV content
    let csvContent = '';
    const headers = Object.keys(bookings[0]);
    csvContent += headers.join(',') + '\n';
    bookings.forEach((booking) => {
      const row = headers.map((header) => booking[header]);
      csvContent += row.join(',') + '\n';
    });
    return csvContent;
  };

  // Function to initiate download of CSV file
  const handleDownloadClick = () => {
    const csvContent = generateCSVContentForAllBookings();
    if (csvContent) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'bookings_data.csv');
    } else {
      console.error('No data to download');
    }
  };

  return (
    <div style={{ width: '95%', margin: 'auto' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
    <div>
      <h2 style={{ marginRight: '10px' }}>User Bookings</h2>
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
    <canvas id="bookingChart" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></canvas>
  </div>
</div>

  );
}

export default UserBookings;
