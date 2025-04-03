import React from "react";

export const CustomToolbar = ({ label, onNavigate, onView, view, views, date }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(date);
    newDate.setMonth(newMonth);
    onNavigate("DATE", newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(date);
    newDate.setFullYear(newYear);
    onNavigate("DATE", newDate);
  };

  return (
    <div className="calendar-toolbar flex flex-wrap items-center justify-between gap-4 mb-4">
      {/* Navigation Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => onNavigate("PREV")} className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded">
          Prev
        </button>
        <button onClick={() => onNavigate("TODAY")} className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded">
          Today
        </button>
        <button onClick={() => onNavigate("NEXT")} className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded">
          Next
        </button>
      </div>

      {/* Month/Year Picker */}
      <div className="flex gap-2 items-center flex-wrap">
        <select
          value={date.getMonth()}
          onChange={handleMonthChange}
          className="bg-gray-900 text-white border border-purple-500 rounded px-2 py-1"
        >
          {months.map((month, idx) => (
            <option key={month} value={idx}>{month}</option>
          ))}
        </select>

        <select
          value={date.getFullYear()}
          onChange={handleYearChange}
          className="bg-gray-900 text-white border border-purple-500 rounded px-2 py-1"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* View Switch Buttons */}
      <div className="flex gap-2 flex-wrap">
        {views.map((viewOption) => (
          <button
            key={viewOption}
            onClick={() => onView(viewOption)}
            className={`px-3 py-1 rounded border ${
              view === viewOption
                ? "bg-purple-700 text-white"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
