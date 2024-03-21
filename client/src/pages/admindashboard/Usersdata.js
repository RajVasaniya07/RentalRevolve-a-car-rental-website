import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import useUser from '../getUser';
import useSeller from '../getSeller';

function UsersData() {
  const users = useUser();
  const sellers = useSeller();

  useEffect(() => {
    if (users && sellers && users.length > 0 && sellers.length > 0) {
      drawChart('distributionChart', users, sellers);
    }
  }, [users, sellers]);

  const drawChart = (canvasId, users, sellers) => {
    if (!users || !sellers) return;

    const totalUsers = users.length;
    const totalSellers = sellers.length;

    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['Users', 'Sellers'],
        datasets: [{
          label: 'Distribution',
          data: [totalUsers, totalSellers],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: Math.max(totalUsers, totalSellers)
          }
        }
      }
    });
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <center>User and Seller Distribution</center>
      <canvas id="distributionChart" width="100" height="50"></canvas>
    </div>
  );
}

export default UsersData;
