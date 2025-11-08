import React from 'react';

interface StatsSummaryProps {
  stats: {
    green: number;
    yellow: number;
    red: number;
    black: number;
  };
}

const StatCard: React.FC<{ label: string; count: number; colorClass: string }> = ({ label, count, colorClass }) => (
    <div className={`flex-1 p-4 rounded-lg bg-gray-800 border-l-4 ${colorClass}`}>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-white">{count}</p>
    </div>
);

const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="綠燈" count={stats.green} colorClass="border-green-500" />
      <StatCard label="黃燈" count={stats.yellow} colorClass="border-yellow-500" />
      <StatCard label="紅燈" count={stats.red} colorClass="border-red-500" />
      <StatCard label="黑燈" count={stats.black} colorClass="border-gray-600" />
    </div>
  );
};

export default StatsSummary;
