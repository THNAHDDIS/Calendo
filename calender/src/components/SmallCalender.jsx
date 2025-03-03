import dayjs from "dayjs";
import { useState, useEffect, useContext } from "react";
import getMonth from "./GetMonth";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";
import React from "react";

function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex,setSmallCalenderMonth,setDaySelected,daySelected } = useContext(GlobalContext);

  //other useeffect
  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format)
    if (nowDay === currDay) {
    return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
    return "bg-blue-100 rounded-full text-blue font-bold"
    } else {
    return "";
    }
    }

  return (
    <div className="mt-9">
      <header className="flex justify-between ">
        <div className="flex items-center" >
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        </div>
       
        <div >
          <button onClick={handlePrevMonth}>
            <span className="cursor-pointer text-gray-600 mx-2">
              <FaChevronLeft />
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className=" cursor-pointer text-gray-600 mx-2">
              <FaChevronRight />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button key={idx} 
              onClick={()=>{setSmallCalenderMonth(currentMonthIdx);
                setDaySelected(day);
              }}
             
              className={`py-1 w-full ${getDayClass(day)}`}>
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;
