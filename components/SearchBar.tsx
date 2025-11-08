
import React from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  availableMonths: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedMonth,
  setSelectedMonth,
  availableMonths
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 sticky top-4 z-10 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="依會員編號或姓名搜尋..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex-shrink-0">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full md:w-auto h-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
        >
          {availableMonths.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
