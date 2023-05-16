import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Receitas criadas',
    },
  },
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Receitas Criadas',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 150 })),
      backgroundColor: '#5884C5',
    },
    {
      label: 'Receitas salvas como modelo',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 150 })),
      backgroundColor: '#53CB63',
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}