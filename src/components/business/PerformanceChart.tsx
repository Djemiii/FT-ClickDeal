import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PerformanceData {
  date: string;
  views: number;
  downloads: number;
  conversions: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  type?: 'line' | 'bar';
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  type = 'line' 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const dates = data.map(d => d.date);
    const views = data.map(d => d.views);
    const downloads = data.map(d => d.downloads);
    const conversions = data.map(d => d.conversions);

    chartInstance.current = new Chart(ctx, {
      type,
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Vues',
            data: views,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Téléchargements',
            data: downloads,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Conversions',
            data: conversions,
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PerformanceChart;