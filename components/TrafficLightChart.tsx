import React from 'react';

interface TrafficLightChartProps {
  stats: {
    green: number;
    yellow: number;
    red: number;
    black: number;
  };
}

const TrafficLightChart: React.FC<TrafficLightChartProps> = ({ stats }) => {
  const total = stats.green + stats.yellow + stats.red + stats.black;
  
  const chartData = [
    { label: '綠燈', count: stats.green, color: 'bg-green-500', textColor: 'text-green-400' },
    { label: '黃燈', count: stats.yellow, color: 'bg-yellow-500', textColor: 'text-yellow-400' },
    { label: '紅燈', count: stats.red, color: 'bg-red-500', textColor: 'text-red-400' },
    { label: '黑燈', count: stats.black, color: 'bg-gray-600', textColor: 'text-gray-400' },
  ];

  if (total === 0) {
    return null; // Don't render chart if there is no data
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">燈號分佈圖</h3>
      <div className="flex items-end justify-around h-48 gap-4">
        {chartData.map(item => (
          <div key={item.label} className="flex flex-col items-center justify-end h-full w-full">
            <div className="text-sm font-bold text-white">{item.count}</div>
            <div 
              className={`w-3/4 rounded-t-md ${item.color} transition-all duration-500 ease-out`}
              style={{ height: `${(item.count / total) * 100}%` }}
              title={`${item.label}: ${item.count} 人`}
            ></div>
            <div className={`mt-2 text-xs font-medium ${item.textColor}`}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficLightChart;
