import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from "../../redux/actions/bookingActions";
import moment from "moment";
import Chart from 'chart.js/auto';

function Revenue() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const processDataForChart = (bookings) => {
    const data = [0, 0, 0, 0]; // Initialize array for revenue for today, current week, current month, and current year

    bookings.forEach(booking => {
      const createdAt = moment(booking.createdAt);
      const amount = booking.totalAmount;
      if (createdAt.isSame(moment(), 'day')) {
        data[0] += amount;
      }
      if (createdAt.isSame(moment(), 'week')) {
        data[1] += amount;
      }
      if (createdAt.isSame(moment(), 'month')) {
        data[2] += amount;
      }
      if (createdAt.isSame(moment(), 'year')) {
        data[3] += amount;
      }
    });

    return data;
  };

  const drawOrUpdateChart = (canvasId, data) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
  
    if (chartInstance) {
      chartInstance.data.datasets[0].data = data;
      chartInstance.update();
    } else {
      const newChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Today', 'Current Week', 'Current Month', 'Current Year'],
          datasets: [{
            label: 'Revenue',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Revenue: ₹${context.parsed.toLocaleString()}`; // Format revenue as rupees
                }
              }
            }
          }
        }
      });
      setChartInstance(newChartInstance);
    }
  };
  
  useEffect(() => {
    if (bookings.length > 0) {
      const data = processDataForChart(bookings);
      drawOrUpdateChart('revenueChart', data);
    }
  }, [bookings, chartInstance]);

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <center>Revenue</center>
      <canvas id="revenueChart" width="100" height="50"></canvas>
    </div>
  );
}

export default Revenue;
