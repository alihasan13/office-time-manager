import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { styled } from "@mui/material/styles";

// Custom styled slider that hides the track when disabled
const CustomSlider = styled(Slider)(({ theme }) => ({
  '&.Mui-disabled': {
    '& .MuiSlider-track': {
      display: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.3,
    },
    '& .MuiSlider-thumb': {
      display: 'none',
    }
  }
}));

const DaySlider = ({ day }) => {
  const [ranges, setRanges] = useState([{ id: 1, value: [540, 1080] }]); // Default range: 9:00 AM - 6:00 PM
  const [isOffline, setIsOffline] = useState(false);

  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const handleRangeChange = (id, newValue) => {
    setRanges((prevRanges) =>
      prevRanges.map((range) =>
        range.id === id ? { ...range, value: newValue } : range
      )
    );
  };

  const addRange = () => {
    const newId = ranges.length ? ranges[ranges.length - 1].id + 1 : 1;
    setRanges([...ranges, { id: newId, value: [540, 1080] }]); // Default range: 9:00 AM - 6:00 PM
  };

  const deleteRange = (id) => {
    setRanges(ranges.filter((range) => range.id !== id));
    if (ranges.length === 1) setIsOffline(true); // If last range is deleted
  };

  return (
    <div className="my-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{day}</h3>
        {ranges.length === 0 && isOffline && (
          <span className="text-gray-500 italic">
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => addRange()}
            >
              I'm offline (hover to add operating hours)
            </span>
          </span>
        )}
      </div>
      <div>
        {ranges.length === 0 && isOffline ? (
          <div className="relative">
            <CustomSlider
              disabled
              value={[540, 1080]}
              min={0}
              max={1440}
              step={15}
              valueLabelDisplay="off"
              className="w-full"
            />
          </div>
        ) : (
          <div>
            {/* Single slider rail container */}
            <div className="relative my-4">
              {/* Time labels for all ranges */}
              {ranges.map((range) => (
                <React.Fragment key={range.id}>
                  <span className="absolute left-0 -top-6 text-sm text-gray-700">
                    {formatTime(range.value[0])}
                  </span>{"-"}
                  <span className="absolute right-0 -top-6 text-sm text-gray-700">
                    {formatTime(range.value[1])}
                  </span>
                </React.Fragment>
              ))}
              
              {/* Multiple sliders stacked on the same rail */}
              <div className="relative">
                {ranges.map((range, index) => (
                  <div
                    key={range.id}
                    className={`absolute w-full ${index > 0 ? 'top-0' : ''}`}
                  >
                    <Slider
                      value={range.value}
                      onChange={(e, newValue) => handleRangeChange(range.id, newValue)}
                      min={0}
                      max={1440}
                      step={15}
                      valueLabelDisplay="off"
                      className="text-green-500"
                    />
                  </div>
                ))}
              </div>

              {/* Delete buttons aligned below */}
              <div className="flex justify-end mt-4 space-x-2">
                {ranges.map((range) => (
                  <button
                    key={range.id}
                    className="p-2 text-red-500 hover:text-red-700"
                    onClick={() => deleteRange(range.id)}
                  >
                    <AiFillDelete size={20} />
                  </button>
                ))}
              </div>
            </div>

            {/* Add Button */}
            <button
              className="mt-4 text-green-500 flex items-center"
              onClick={addRange}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaySlider;
