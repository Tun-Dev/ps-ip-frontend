import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

const bgColors = ['#CCAB45', '#077D00', '#6AB166'];

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: '#CEA766',
      borderWidth: 3,
      fill: false,
      data: [90, 92, 94, 90],
      pointBorderColor: '#CEA766',
      backgroundColor: '#CEA766',
      borderRadius: { topLeft: 8, topRight: 8 },
    },
    {
      type: 'line' as const,
      label: 'Dataset 2',
      data: [35, 23, 67, 69],
      borderColor: '#E7D3B3',
      borderWidth: 3,
      pointBorderColor: '#E7D3B3',
      backgroundColor: '#E7D3B3',
      fill: false,
      borderRadius: { topLeft: 8, topRight: 8 },
    },
    {
      type: 'line' as const,
      label: 'Dataset 3',
      backgroundColor: '#175F2F',
      data: [20, 30, 40, 50],
      borderColor: '#175F2F',
      borderWidth: 3,
      pointBorderColor: '#175F2F',
      fill: false,
      borderRadius: { topLeft: 8, topRight: 8 },
    },
    {
      type: 'line' as const,
      label: 'Dataset 2',
      backgroundColor: '#8BAF97',
      data: [25, 44, 74, 28],
      borderColor: '#8BAF97',
      borderWidth: 3,
      pointBorderColor: '#8BAF97',
      fill: false,
    },
  ],
};

const LineGraphCard = () => {
  const datasets = data.datasets.map((dataset: (typeof data)['datasets'][number], index: number) => ({
    type: 'line' as const,
    label: dataset.label,
    backgroundColor: dataset?.backgroundColor || bgColors[index], // Use modulo to cycle through colors array

    data: dataset.data,
    borderColor: dataset.borderColor || bgColors[index],
    borderWidth: dataset.borderWidth || 2,
    borderRadius: dataset.borderRadius || {
      topLeft: 8,
      topRight: 8,
    },
    fill: dataset.fill || false,
    pointBorderColor: dataset.pointBorderColor || bgColors[index],
    // pointBorderColor: "#CEA766",
    // backgroundColor: "#CEA766",
  }));

  const chartData = {
    labels: data?.labels || [],
    datasets: datasets || [],
  };

  return (
    <Chart
      type="line"
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              align: 'center',
              text: 'Price (₦)',
              color: '#A7A7A7',
            },
            border: { dash: [4, 4] }, // for the grid lines
            grid: {
              color: '#D9D9D9', // for the grid lines
              tickWidth: 0,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
};

export { LineGraphCard };
