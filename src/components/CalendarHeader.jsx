import React from 'react';

function CalendarHeader({ styles, styling, handleFuncs, dateInfo }) {
  return (
    <div className={styles.calendarHeader}>
      <button
        className={styling.arrowBtnContainerClass}
        onClick={handleFuncs.yearBack}
      >
        {styling.yearBackArrow.type === 'svg' ? (
          styling.yearBackArrow
        ) : (
          <img src={styling.yearBackArrow} alt="Year back" />
        )}
      </button>
      <button
        className={styling.arrowBtnContainerClass}
        onClick={handleFuncs.monthBack}
      >
        {styling.monthBackArrow.type === 'svg' ? (
          styling.monthBackArrow
        ) : (
          <img src={styling.monthBackArrow} alt="Month back" />
        )}
      </button>
      <div className={styles.headerMonthYear}>
        <p
          className={`${styles.headerYear}`}
          style={{ color: styling.yearFontColor }}
        >
          {dateInfo.year}
        </p>
        <p style={{ color: styling.monthFontColor }}>
          {dateInfo.monthNames[dateInfo.month][dateInfo.monthLocale] ||
            dateInfo.monthNames[dateInfo.month].en}
        </p>
      </div>
      <button
        className={styling.arrowBtnContainerClass}
        onClick={handleFuncs.monthNext}
      >
        {styling.monthNextArrow.type === 'svg' ? (
          styling.monthNextArrow
        ) : (
          <img src={styling.monthNextArrow} alt="Month forward" />
        )}
      </button>
      <button
        className={styling.arrowBtnContainerClass}
        onClick={handleFuncs.yearNext}
      >
        {styling.yearNextArrow.type === 'svg' ? (
          styling.yearNextArrow
        ) : (
          <img src={styling.yearNextArrow} alt="Year forward" />
        )}
      </button>
    </div>
  );
}

export default CalendarHeader;
