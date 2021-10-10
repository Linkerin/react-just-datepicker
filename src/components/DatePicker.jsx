import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import DaysContainer from './DaysContainer';
import CalendarHeader from './CalendarHeader';
import WeekDays from './WeekDays';
import createCalendar, {
  addLocale,
  addWeekDaysLocale,
  dateStringFormatter,
  getWeekDays,
  handleUserInput,
  monthNames,
  weekDays
} from '../utils';
import styles from '../DatePicker.module.css';

function DatePicker({
  name = null,
  value,
  handleDateChange,
  handleBlur,
  placeholder = 'dd/mm/yyyy',
  locale,
  styleChanges
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(null);
  const [inputValue, setInputValue] = useState(value || '');
  const calendarContainerRef = useRef();

  const localeProps = {
    dateFormat: 'dd/mm/yyyy',
    startSunday: false,
    months: 'en',
    addMonths: null,
    showWeekDays: true,
    weekDays: 'en',
    addWeekDays: null,
    ...locale
  };

  const calendar = useMemo(
    () => createCalendar(localeProps.startSunday, date),
    [date, localeProps.startSunday]
  );
  let year = calendar.year;
  let month = calendar.month;

  const format = useMemo(() => {
    let lowerFormat = localeProps.dateFormat.toLowerCase();
    return lowerFormat;
  }, [localeProps.dateFormat]);

  const weekDaysAbr = useMemo(() => {
    if (localeProps.addWeekDays) {
      addWeekDaysLocale(localeProps.addWeekDays, weekDays);
    }
    let days = getWeekDays(
      localeProps.weekDays,
      localeProps.startSunday,
      localeProps.months,
      weekDays
    );

    return days;
  }, [
    localeProps.weekDays,
    localeProps.startSunday,
    localeProps.months,
    localeProps.addWeekDays
  ]);

  useMemo(() => {
    if (localeProps.addMonths) addLocale(localeProps.addMonths, monthNames);
  }, [localeProps.addMonths]);

  const styling = {
    pickerContainerClass: styles.picker,
    inputClass: styles.pickerInput,
    calendarContainerClass: styles.calendarContainer,
    mainColor: null,
    inputBgColor: null,
    inputBorderColor: null,
    inputBorderFocusColor: null,
    inputPlaceholderColor: null,
    inputFontColor: null,
    calendarContainerBgColor: null,
    calendarContainerShadow: true,
    arrowBtnContainerClass: styles.calendarNavBtn,
    arrowBtnBgColor: {
      main: null,
      clicked: null
    },
    arrowColor: {
      main: null,
      clicked: null
    },
    yearFontColor: null,
    monthFontColor: null,
    weekDaysFontColor: null,
    dateBgColor: {
      hover: null,
      clicked: null
    },
    clickedDateFontColor: null,
    selectedDateFontColor: null,
    selectedDateBgColor: null,
    currMonthDateFontColor: null,
    prevNextMonthsDateFontColor: null,
    yearBackArrow: (
      <svg
        className={styles.calendarNavBtnArrow}
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 121.944 120"
      >
        <path
          d="M13.472+107.5L108.472+107.5L108.472+12.5L13.472+12.5L13.472+107.5Z"
          opacity="0"
          fill="#ffffff"
        />
        <g opacity="1">
          <path
            stroke="#000000"
            strokeWidth="15"
            d="M97.3294+93.4976L67.8746+61.6882C67.1477+60.9032+67.1477+59.092+67.8746+58.307L97.3294+26.4976"
            fill="none"
            strokeLinecap="round"
            opacity="1"
            strokeLinejoin="round"
          />
          <path
            stroke="#000000"
            strokeWidth="15"
            d="M54.6145+93.5024L36.4298+73.8641L25.1596+61.693C24.4328+60.908+24.4328+59.0968+25.1596+58.3118L54.6145+26.5024"
            fill="none"
            strokeLinecap="round"
            opacity="1"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    yearNextArrow: (
      <svg
        className={styles.calendarNavBtnArrow}
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 121.944 120"
      >
        <path
          d="M108.472+107.5L13.472+107.5L13.472+12.5L108.472+12.5L108.472+107.5Z"
          opacity="0"
          fill="#ffffff"
        />
        <g opacity="1">
          <path
            stroke="#000000"
            strokeWidth="15"
            d="M24.6145+93.4976L54.0693+61.6882C54.7962+60.9032+54.7962+59.092+54.0693+58.307L24.6145+26.4976"
            fill="none"
            strokeLinecap="round"
            opacity="1"
            strokeLinejoin="round"
          />
          <path
            stroke="#000000"
            strokeWidth="15"
            d="M67.3294+93.5024L85.5141+73.8641L96.7843+61.693C97.5112+60.908+97.5112+59.0968+96.7843+58.3118L67.3294+26.5024"
            fill="none"
            strokeLinecap="round"
            opacity="1"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    ),
    monthBackArrow: (
      <svg
        className={styles.calendarNavBtnArrow}
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 121.944 120"
      >
        <path
          d="M13.472+107.5L108.472+107.5L108.472+12.5L13.472+12.5L13.472+107.5Z"
          opacity="0"
          fill="#ffffff"
        />
        <path
          stroke="#000000"
          strokeWidth="15"
          d="M86.6003+93.5L36.275+61.6906C35.0331+60.9056+35.0331+59.0944+36.275+58.3094L86.6003+26.5"
          fill="none"
          strokeLinecap="round"
          opacity="1"
          strokeLinejoin="round"
        />
      </svg>
    ),
    monthNextArrow: (
      <svg
        className={styles.calendarNavBtnArrow}
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 121.944 120"
      >
        <path
          d="M108.472+107.5L13.472+107.5L13.472+12.5L108.472+12.5L108.472+107.5Z"
          opacity="0"
          fill="#ffffff"
        />
        <path
          stroke="#000000"
          strokeWidth="15"
          d="M35.3436+93.5L85.6689+61.6906C86.9108+60.9056+86.9108+59.0944+85.6689+58.3094L35.3436+26.5"
          fill="none"
          strokeLinecap="round"
          opacity="1"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ...styleChanges
  };

  const colors = {
    '--main-color': styling.mainColor,
    '--input-bg-color': styling.inputBgColor,
    '--input-border-color': styling.inputBorderColor,
    '--input-border-focus-color': styling.inputBorderFocusColor,
    '--input-placeholder-color': styling.inputPlaceholderColor,
    '--input-font-color': styling.inputFontColor,
    '--selected-color': styling.selectedDateBgColor,
    '--active-date-color': styling.dateBgColor?.clicked,
    '--date-main-color': styling.currMonthDateFontColor,
    '--other-date-color': styling.prevNextMonthsDateFontColor,
    '--hover-date-color': styling.dateBgColor?.hover,
    '--clicked-date-color': styling.clickedDateFontColor,
    '--selected-date-color': styling.selectedDateFontColor,
    '--btn-main-color': styling.arrowBtnBgColor?.main,
    '--btn-active-color': styling.arrowBtnBgColor?.clicked,
    '--arrow-color': styling.arrowColor?.main,
    '--arrow-color-clicked': styling.arrowColor?.clicked,
    '--weekdays-color': styling.weekDaysFontColor
  };

  /**
   * Handles click on the input field to expand a calendar
   * @param {object} e `'click'` event
   */
  const handleClick = e => {
    e.preventDefault();
    if (!showPicker) setShowPicker(true);
  };

  const handleChange = e => {
    try {
      e.preventDefault();
      let value = e.target.value;
      const newDate = handleUserInput(value, date, format);
      if (newDate) {
        setDate(newDate);
      }

      if (!value) setDate(null);

      setInputValue(value);
    } catch (err) {
      console.error(
        `Error occured in handling input change.
         DatePicker component name: ${name}. Error message: ${err}`
      );
    }
  };

  const handleYearBackClick = e => {
    try {
      e.preventDefault();
      let prevDate = date || calendar.date;
      const newDate = new Date(
        prevDate.getFullYear() - 1,
        prevDate.getMonth(),
        prevDate.getDate()
      );
      setDate(newDate);
      setInputValue(dateStringFormatter(newDate, format));
    } catch (err) {
      console.error(
        `Error occured in handling year back button.
         DatePicker component name: ${name}. Error message: ${err}`
      );
    }
  };

  const handleYearNextClick = e => {
    try {
      e.preventDefault();
      let prevDate = date || calendar.date;
      const newDate = new Date(
        prevDate.getFullYear() + 1,
        prevDate.getMonth(),
        prevDate.getDate()
      );
      setDate(newDate);
      setInputValue(dateStringFormatter(newDate, format));
    } catch (err) {
      console.error(
        `Error occured in handling next year button.
         DatePicker component name: ${name}. Error message: ${err}`
      );
    }
  };

  const handleMonthBackClick = e => {
    try {
      e.preventDefault();
      let prevDate = date || calendar.date;
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        prevDate.getDate()
      );
      setDate(newDate);
      setInputValue(dateStringFormatter(newDate, format));
    } catch (err) {
      console.error(
        `Error occured in handling month back button.
         DatePicker component name: ${name}. Error message: ${err}`
      );
    }
  };

  const handleMonthNextClick = e => {
    try {
      e.preventDefault();
      let prevDate = date || calendar.date;
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        prevDate.getDate()
      );
      setDate(newDate);
      setInputValue(dateStringFormatter(newDate, format));
    } catch (err) {
      console.error(
        `Error occured in handling next month button.
         DatePicker component name: ${name}. Error message: ${err}`
      );
    }
  };

  const handleDayClick = e => {
    try {
      e.preventDefault();
      let newDateMonth;
      switch (e.target.attributes.monthtype.value) {
        case 'prev':
          newDateMonth = month - 1;
          break;

        case 'next':
          newDateMonth = month + 1;
          break;

        default:
          newDateMonth = month;
          break;
      }
      const newDate = new Date(year, newDateMonth, +e.target.innerText);
      setDate(newDate);
      setInputValue(dateStringFormatter(newDate, format));
    } catch (err) {
      console.error(
        `Error occured in handling click on the date.
         DatePicker component name: ${name}. Error message: ${err}`
      );
    }
  };

  const handleOutClick = e => {
    if (calendarContainerRef.current?.contains(e.target)) return;
    setShowPicker(false);
  };

  /**
   * Event listener for calendar closing on outside click
   */
  useEffect(() => {
    if (showPicker) {
      document.addEventListener('mousedown', handleOutClick);
    } else {
      document.removeEventListener('mousedown', handleOutClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutClick);
    };
  }, [showPicker]);

  useEffect(() => {
    try {
      const newValue = dateStringFormatter(date, format);
      const change = {
        target: {
          name: name,
          placeholder: placeholder,
          type: 'DatePicker',
          value: newValue
        },
        type: 'DatePicker value change'
      };

      if (handleDateChange) handleDateChange(change);
    } catch (err) {
      console.error(
        `Error occured while updating date state.
         DatePicker component name: ${name}. Error message: ${err}`
      );
    }
  }, [date, format, name, placeholder, handleDateChange]);

  return (
    <div className={styles.pickerContainer} style={colors}>
      <div className={styling.pickerContainerClass}>
        <input
          className={styling.inputClass}
          name={name}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={e => {
            setInputValue(value || inputValue);
            if (handleBlur) handleBlur(e);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setInputValue(value || inputValue);
              setShowPicker(false);
            }
          }}
        />
        {showPicker && (
          <div
            className={styling.calendarContainerClass}
            ref={calendarContainerRef}
            style={{
              backgroundColor: styling.calendarContainerBgColor,
              boxShadow: styling.calendarContainerShadow ? null : 'none'
            }}
            onBlur={e => {
              e.preventDefault();
              if (
                !e.currentTarget.contains(e.relatedTarget) &&
                e.relatedTarget !== null
              ) {
                setInputValue(value || inputValue);
                setShowPicker(false);
              }
            }}
          >
            <CalendarHeader
              styles={styles}
              styling={styling}
              dateInfo={{
                monthNames: monthNames,
                month: month,
                year: year,
                monthLocale: localeProps.months
              }}
              handleFuncs={{
                yearBack: handleYearBackClick,
                monthBack: handleMonthBackClick,
                monthNext: handleMonthNextClick,
                yearNext: handleYearNextClick
              }}
            />
            {localeProps.showWeekDays ? (
              <WeekDays weekDays={weekDaysAbr} styles={styles.weekDays} />
            ) : null}
            <DaysContainer
              calendar={calendar}
              styles={styles}
              handleDayClick={handleDayClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  handleDateChange: PropTypes.func,
  handleBlur: PropTypes.func,
  placeholder: PropTypes.string,
  locale: PropTypes.exact({
    dateFormat: PropTypes.string,
    startSunday: PropTypes.bool,
    months: PropTypes.string,
    addMonths: PropTypes.object,
    showWeekDays: PropTypes.bool,
    weekDays: PropTypes.string,
    addWeekDays: PropTypes.object
  }),
  styleChanges: PropTypes.exact({
    pickerContainerClass: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    inputClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    calendarContainerClass: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    mainColor: PropTypes.string,
    inputBgColor: PropTypes.string,
    inputBorderColor: PropTypes.string,
    inputBorderFocusColor: PropTypes.string,
    inputPlaceholderColor: PropTypes.string,
    inputFontColor: PropTypes.string,
    calendarContainerBgColor: PropTypes.string,
    calendarContainerShadow: PropTypes.bool,
    arrowBtnContainerClass: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    arrowBtnBgColor: PropTypes.exact({
      main: PropTypes.string,
      clicked: PropTypes.string
    }),
    arrowColor: PropTypes.exact({
      main: PropTypes.string,
      clicked: PropTypes.string
    }),
    yearFontColor: PropTypes.string,
    monthFontColor: PropTypes.string,
    weekDaysFontColor: PropTypes.string,
    dateBgColor: PropTypes.exact({
      hover: PropTypes.string,
      clicked: PropTypes.string
    }),
    clickedDateFontColor: PropTypes.string,
    selectedDateFontColor: PropTypes.string,
    selectedDateBgColor: PropTypes.string,
    currMonthDateFontColor: PropTypes.string,
    prevNextMonthsDateFontColor: PropTypes.string,
    yearBackArrow: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.element
    ]),
    yearNextArrow: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.element
    ]),
    monthBackArrow: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.element
    ]),
    monthNextArrow: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.element
    ])
  })
};

export default DatePicker;
