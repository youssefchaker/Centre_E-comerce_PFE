import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Users from Africa', 'Users from Asia', 'Users from Europe', 'Users from North America', 'Users from South America', 'Users from Australia'],
  datasets: [
    {
      label: 'Number of Users per continent',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => (
  <>
    <Doughnut data={data} />
  </>
);

export default DoughnutChart;