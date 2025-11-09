import React from 'react';

const Header: React.FC = () => (
  <header className="text-center mb-8">
    <div className="flex justify-center items-center gap-3">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">
        BNI 全鑫分會
      </h1>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full bg-red-500"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
      </div>
    </div>
    <p className="text-xl md:text-2xl text-yellow-400 mt-2">
      紅綠燈檢視表
    </p>
  </header>
);

export default Header;