
import React from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentMonth: string;
  totalMembers: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  currentMonth,
  totalMembers
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-4 z-10 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
      <div className="relative flex-grow w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="請輸入姓名查詢"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex-shrink-0 text-center md:text-right">
        <p className="text-sm text-gray-400">本紅綠燈表預測表的資料取樣範圍</p>
        <div className="flex items-baseline justify-center md:justify-end gap-4 mt-1">
            <p className="text-lg font-semibold text-yellow-400">{currentMonth}</p>
            <p className="text-sm text-gray-300">
                總人數: <span className="font-bold text-white text-lg">{totalMembers}</span> 人
            </p>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;