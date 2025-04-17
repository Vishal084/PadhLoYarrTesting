// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto';

// const RevenueChart = ({ data }) => {
//   const chartData = {
//     labels: data.map(item => item.month),
//     datasets: [
//       {
//         label: 'Revenue',
//         data: data.map(item => item.revenue),
//         borderColor: 'rgb(59, 130, 246)',
//         backgroundColor: 'rgba(59, 130, 246, 0.1)',
//         tension: 0.1
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Revenue',
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// };

// export default RevenueChart;



"use client"

import { useEffect, useRef } from "react"
// We'll use Chart.js directly instead of react-chartjs-2
import Chart from "chart.js/auto"

const RevenueChart = ({ data }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Prepare data
      const labels = data.map((item) => item.month || item.period)
      const values = data.map((item) => item.revenue)

      // Create new chart
      const ctx = chartRef.current.getContext("2d")
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Revenue",
              data: values,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => `Revenue: ₹${context.parsed.y}`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `₹${value}`,
              },
            },
          },
        },
      })
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="h-full w-full">
      <canvas ref={chartRef} />
    </div>
  )
}

export default RevenueChart
