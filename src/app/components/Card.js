import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      {children}
    </div>
  );
};

export default Card; 