/**
 * Returns days from the previous month that should be displayed
 * @param {Date} date Date object of the currently selected month
 * @param {boolean} startSunday Defines whether the week should start
 *                              with Sunday (`true`) or Monday (`false`)
 * @returns {object[]} Return an array of previous month day objects
 * @example
 * // return example
 * [{ day: 30, month: 'prev' } , { day: 31, month: 'prev }]
 */
const daysFromPrevMonth = (date, startSunday) => {
  const monthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  if (!(monthFirstDay instanceof Date) || !monthFirstDay.valueOf()) {
    throw new Error(
      `Invalid date value '${date}' provided for extracting days of previous month`
    );
  }

  const weekday = monthFirstDay.getDay();
  let numOfPrevMonthDays = weekday;
  let prevMonthDays = [];

  if (!startSunday) {
    switch (weekday) {
      case 0:
        numOfPrevMonthDays = 6;
        break;

      default:
        numOfPrevMonthDays = weekday - 1;
        break;
    }
  }

  if (numOfPrevMonthDays) {
    for (
      let lastMonthDays = daysInMonth(
        monthFirstDay.getFullYear(),
        date.getMonth() - 1
      );
      numOfPrevMonthDays > 0;
      numOfPrevMonthDays--, lastMonthDays--
    ) {
      prevMonthDays.unshift({ day: lastMonthDays, month: 'prev' });
    }
  }
  return prevMonthDays;
};

/**
 * Returns days from the next month that should be displayed
 * @param {Date} date Date object of the currently selected month
 * @param {boolean} startSunday Defines whether the week should start
 *                              with Sunday (`true`) or Monday (`false`)
 * @returns {object[]} Return an array of previous month day objects
 * @example
 * // return example
 * [{ day: 1, month: 'next' } , { day: 2, month: 'next }]
 */
const daysFromNextMonth = (date, startSunday) => {
  const nextMonthFirstDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );
  if (!(nextMonthFirstDay instanceof Date) || !nextMonthFirstDay.valueOf()) {
    throw new Error(
      `Invalid date value '${date}' provided for extracting days of previous month`
    );
  }
  const weekday = nextMonthFirstDay.getDay();
  let numOfNextMonthDays;
  let nextMonthDays = [];

  if (startSunday) {
    switch (weekday) {
      case 0:
        numOfNextMonthDays = 0;
        break;

      default:
        numOfNextMonthDays = 7 - weekday;
        break;
    }
  } else {
    switch (weekday) {
      case 0:
        numOfNextMonthDays = 1;
        break;

      case 1:
        numOfNextMonthDays = 0;
        break;

      default:
        numOfNextMonthDays = 7 - (weekday - 1);
        break;
    }
  }

  for (let i = 1; i <= numOfNextMonthDays; i++) {
    nextMonthDays.push({ day: i, month: 'next' });
  }

  return nextMonthDays;
};

/**
 * Checks whether date format input is correct and returns its' splitted version
 * @param {string} format Date format. Example: `'dd.mm.yyyy'`

 * @returns {string[]} Format parts in the array splitted by the separator
 * @throws {Error} An error `Invalid date format` when the format doesn't include year, month and day
 * @example
 * checkFormat('dd/mm/yyyy')
 * // returns
 * ['dd', 'mm', 'yyyy']
 */
const checkFormat = format => {
  const regex = /-|\.|\//;
  const formatSet = new Set(format.split(regex));

  if (formatSet.size !== 3) {
    throw new Error(`Invalid date format '${format}'`);
  }

  const splittedFormat = Array.from(formatSet);
  return splittedFormat;
};

/**
 * Checks that separators in the date format string are the same
 * and returns the separator value
 * @param {string} format Date format. Example: `'dd.mm.yyyy'`
 * @param {string[]} splitted Splitted values of date format
 *                            returned by `checkFormat` function
 * @see checkFormat
 * @returns {string} Date separator
 * @throws {Error} An error `Different separators` when separators are not the same
 * @example
 * getDateSeparator('dd.mm.yyyy', ['dd', 'mm', 'yyyy'])
 * // returns
 * '.'
 */
const getDateSeparator = (format, splitted) => {
  const sep = format[splitted[0].length];
  const secondSep = format[splitted[0].length + splitted[1].length + 1];
  if (sep !== secondSep) {
    throw new Error(
      `Different separators used in the date format: '${sep}' and '${secondSep}'`
    );
  }
  return sep;
};

/**
 * Months names in different locales
 * @property {string} en - English
 * @property {string} ru - Russian
 * @property {string} de - German
 * @property {string} fr - French
 * @property {string} es - Spanish
 * @property {string} pt - Portuguese
 * @property {string} it - Italian
 */
export const monthNames = {
  0: {
    en: 'January',
    ru: 'Январь',
    de: 'Januar',
    fr: 'Janvier',
    es: 'Enero',
    pt: 'Janeiro',
    it: 'Gennaio'
  },
  1: {
    en: 'February',
    ru: 'Февраль',
    de: 'Februar',
    fr: 'Février',
    es: 'Febrero',
    pt: 'Fevereiro',
    it: 'Febbraio'
  },
  2: {
    en: 'March',
    ru: 'Март',
    de: 'März',
    fr: 'Mars',
    es: 'Marzo',
    pt: 'Março',
    it: 'Marzo'
  },
  3: {
    en: 'April',
    ru: 'Апрель',
    de: 'April',
    fr: 'Avril',
    es: 'Abril',
    pt: 'Abril',
    it: 'Aprile'
  },
  4: {
    en: 'May',
    ru: 'Май',
    de: 'Mai',
    fr: 'Mai',
    es: 'Mayo',
    pt: 'Maio',
    it: 'Maggio'
  },
  5: {
    en: 'June',
    ru: 'Июнь',
    de: 'Juni',
    fr: 'Juin',
    es: 'Junio',
    pt: 'Junho',
    it: 'Giugno'
  },
  6: {
    en: 'July',
    ru: 'Июль',
    de: 'Juli',
    fr: 'Juillet',
    es: 'Julio',
    pt: 'Julho',
    it: 'Luglio'
  },
  7: {
    en: 'August',
    ru: 'Август',
    de: 'August',
    fr: 'Août',
    es: 'Agosto',
    pt: 'Agosto',
    it: 'Agosto'
  },
  8: {
    en: 'September',
    ru: 'Сентябрь',
    de: 'September',
    fr: 'Septembre',
    es: 'Septiembre',
    pt: 'Setembro',
    it: 'Settembre'
  },
  9: {
    en: 'October',
    ru: 'Октябрь',
    de: 'Oktober',
    fr: 'Octobre',
    es: 'Octubre',
    pt: 'Outubro',
    it: 'Ottobre'
  },
  10: {
    en: 'November',
    ru: 'Ноябрь',
    de: 'November',
    fr: 'Novembre',
    es: 'Noviembre',
    pt: 'Novembro',
    it: 'Novembre'
  },
  11: {
    en: 'December',
    ru: 'Декабрь',
    de: 'Dezember',
    fr: 'Décembre',
    es: 'Diciembre',
    pt: 'Dezembro',
    it: 'Dicembre'
  }
};

/**
 * Week days abbreviations for different locales.
 * @see getWeekDays
 */
export const weekDays = {
  // en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
  es: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  pt: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  it: ['D', 'L', 'M', 'M', 'G', 'V', 'S']
  // it: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab']
};

/**
 * Returns an array with week days abbreviations
 * @param {string} locale Week day locale
 * @param {boolean} startSunday Defines whether the week should start
 *                              with Sunday (`true`) or Monday (`false`)
 * @param {string} months Months locale
 * @returns {Array}
 */
export const getWeekDays = (locale, startSunday, months, weekDaysRef) => {
  let days;
  if (weekDaysRef[locale]) {
    days = Array.from(weekDaysRef[locale]);
  } else if (weekDaysRef[months]) {
    days = Array.from(weekDaysRef[months]);
  } else {
    days = Array.from(weekDaysRef.en);
  }

  if (!startSunday) {
    const sunday = days.shift();
    days.push(sunday);
  }

  return days;
};

/**
 * Adds new month locale
 * @param {object} newLocale Contains new locale and it's months names
 * @param {string[]} newLocale.any Array of 12 months names
 * @example
 * // newLocale object for German
 * {de: [
 * 'Januar',
 * 'Februar',
 * 'März',
 * 'April',
 * 'Mai',
 * 'Juni',
 * 'Juli',
 * 'August',
 * 'September',
 * 'Oktober',
 * 'November',
 * 'Dezember'
 * ]}
 * @param {object} locales Default locales object from `monthNames`
 * @see monthNames
 * @returns {object} Updated locales object
 * @example
 * // returns
 * {0: {en: 'January', de: 'Januar'}, 1: {en: 'February', de: 'Februar'}} // etc.
 */
export const addLocale = (newLocale, locales) => {
  for (const [key, value] of Object.entries(newLocale)) {
    value.map((month, index) => (locales[index][key] = month));
  }
  return locales;
};

/**
 * Adds new week days abbreviations
 * @param {object} newLocale Contains new locale name and an array of week days
 * @param {string[]} newLocale.any Array of 7 week days. Starts with Sunday.
 * @example
 * // newLocale object for German
 * { de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'] }
 * @param {object} days Default week days
 * @see weekDays
 * @returns {object} All locales for week days
 * @example
 * // returns
 * {
 *   en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
 *   de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
 * }
 */
export const addWeekDaysLocale = (newLocale, days) => {
  for (const [key, value] of Object.entries(newLocale)) {
    const strDays = value.map(val => val.toString());
    days[key] = strDays;
  }

  return days;
};

/**
 * Returns the number of days in a month
 * @param {number} year Year of the target month
 * @param {number} month Target month
 * @returns {number} Number of days
 * @example
 * daysInMonth(2021, 9)
 * // returns
 * 31
 */
export const daysInMonth = (year, month) => {
  const dayInMs = 1000 * 60 * 60 * 24;
  const nextMonthFirstDay = new Date(year, month + 1, 1);
  return new Date(nextMonthFirstDay - dayInMs).getDate();
};

/**
 * Check's user's input and in case of creating a valid date object returns it
 * @param {string} value User's input value from default input's `event.target.value`
 * @param {Date} [date] Selected date from the `DatePicker`'s state
 * @param {string} [format] Date format. Example: `'dd.mm.yyyy'`
 * @returns {Date} New `Date` object created of user's input
 */
export const handleUserInput = (value, date, format) => {
  if (!format) format = 'dd/mm/yyyy';
  if (!date) date = new Date();
  const splittedFormat = checkFormat(format);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  const valuesArr = value.split(/-|\.|\//);

  if (valuesArr.length !== splittedFormat.length) return;

  for (let i = 0; i < valuesArr.length; i++) {
    switch (splittedFormat[i]) {
      case 'dd':
        const newDayNum = +valuesArr[i];
        if (newDayNum > 0 && newDayNum < 32) {
          day = newDayNum;
        }
        break;

      case 'mm':
        const newMonthNum = +valuesArr[i] - 1;
        if (newMonthNum >= 0 && newMonthNum < 12) {
          month = newMonthNum;
        }
        break;

      case 'yyyy':
        const newYearNum = +valuesArr[i];
        if (
          valuesArr[i].length === splittedFormat[i].length &&
          newYearNum > 0 &&
          newYearNum < 4000
        ) {
          year = newYearNum;
        }
        break;

      default:
        break;
    }
  }
  return new Date(year, month, day);
};

/**
 * Presents a `Date` objects as a `string` according to the stated `format`
 * @param {Date} date Target date
 * @param {string} format Date format. Example: `'dd.mm.yyyy'`
 * @returns {string} String representation of the date.
 * @example
 * dateStringFormatter(new Date(), 'yyyy/mm/dd') // current date is October 4th, 2021
 * // returns
 * '2021/10/04'
 * @throws {Error} An error `Invalid date` if `date` parameter is not a valid `Date` object
 * @throws {Error} An error `Invalid date format` if `format` doesn't consist of
 *                 `'dd'`, `'mm'` and `'yyyy'` parts
 */
export const dateStringFormatter = (date, format) => {
  if (date === null) return '';

  if (!(date instanceof Date)) {
    throw new Error(
      `Invalid date '${date}' was provided for string formatting`
    );
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (!year || !month || !day) {
    throw new Error(
      `Invalid date '${date}' was provided for string formatting`
    );
  }

  month = `${month}`.padStart(2, '0');
  day = `${day}`.padStart(2, '0');

  if (!format) format = 'dd/mm/yyyy';
  const splittedFormat = checkFormat(format);

  let sep = getDateSeparator(format, splittedFormat);

  let formattedDateString = '';
  for (let i = 0; i < splittedFormat.length; i++) {
    if (i === 2) sep = '';
    switch (splittedFormat[i]) {
      case 'dd':
        formattedDateString += `${day}${sep}`;
        break;

      case 'mm':
        formattedDateString += `${month}${sep}`;
        break;

      case 'yyyy':
        formattedDateString += `${year}${sep}`;
        break;

      default:
        throw new Error(
          `Invalid date format '${format}' was provided for string formatting`
        );
    }
  }
  return formattedDateString;
};

/**
 * Creates an object that contains target `date`, it's `month` and `year` numbers
 * and a sorted array of month's days
 * @param {Date} [date] Target date from `DatePicker`'s state. If not specified, current date is used.
 * @param {boolean} startSunday Defines whether the week should start
 *                              with Sunday (`true`) or Monday (`false`)
 * @returns {object} Calendar info for a target month
 * @example
 * // returns
 * {
 *   date: 2021-10-05T08:14:54.962Z, // `Date` object,
 *   year: 2021,
 *   month: 9,
 *   days: [{ day: 30, month: 'prev' }, { day: 1, month: 'current' }] // etc.
 * }
 */
export const createCalendar = (startSunday, date) => {
  if (!date) date = new Date();
  const numOfDaysInMonth = daysInMonth(date.getFullYear(), date.getMonth());
  if (!numOfDaysInMonth) {
    throw new Error(
      `Invalid date value '${date}' provided for creating a calendar`
    );
  }

  let days = daysFromPrevMonth(date, startSunday);

  for (let day = 1; day <= numOfDaysInMonth; day++) {
    days.push({ day: day, month: 'current' });
  }

  const nextMonthDays = daysFromNextMonth(date, startSunday);
  if (nextMonthDays.length > 0) {
    days = [...days, ...nextMonthDays];
  }

  const calendar = {
    date: date,
    year: date.getFullYear(),
    month: date.getMonth(),
    days: days
  };

  return calendar;
};

export default createCalendar;
