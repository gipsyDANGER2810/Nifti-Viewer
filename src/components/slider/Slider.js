import React from 'react';


const slider = ({ sliceCount, currentSlice, onChange }) => {
    return (
        <>
          <div className="my-3">
            <label >
              Slice: {currentSlice + 1} / {sliceCount}
            </label>
            <input
              type="range"
              min="0"
              max={sliceCount - 1}
              value={currentSlice}
              onChange={(e) => onChange(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      );
};

export default slider;
