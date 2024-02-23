import React from 'react';
import './Skeleton.css';

const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className='box'>
        <div className='box-1'></div>
        <div className='box-2'></div>
        <div className='box-3'></div>
        <div className='box-4'></div>
      </div>
    </div>
  );
};

export default Skeleton;
