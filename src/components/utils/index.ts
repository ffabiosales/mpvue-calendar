import {computedPrevYear, computedNextYear} from "../timetable/computed";

const noop = function() {};

function date2ymd(date: string): number[] {
  const [y, m, d] = date.split('-');
  return [Number(y), Number(m), Number(d)];
}

const offloadFn = function(fn: any) {
  setTimeout(fn || noop, 0);
};

const language = function(): string {
  return (navigator.language || (<any>navigator).browserLanguage).toLowerCase();
};

const isZh = function() {
  return language() === 'zh-cn';
};

const enWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const zhWeeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

function getWeeks() {
  return isZh() ? zhWeeks : enWeeks;
}

function computedNextMonth(month: string | number) {
  let value = month;
  if ((Number(month) + 1) > 12) {
    return 1;
  } else {
    return Number(month) + 1;
  }
}

function computedPrevMonth(month: string | number): number {
  if ((Number(month) - 1) === 0) {
    return 12;
  } else {
    return Number(month) - 1;
  }
}

function getDateByCount(date: string, count: number): string {
  const [y, m, d] = date2ymd(date);
  const timestamp = +new Date(y, m - 1, d);
  const dateObj = new Date(timestamp + count * 86400000);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  return `${year}-${month + 1}-${day}`;
}

function getPrevDate(year: string | number, month: string | number, day?: string | number): any[] {
  if (day) {
    return date2ymd(getDateByCount(`${year}-${month}-${day}`, -7));
  }
  return [computedPrevYear(year, month), computedPrevMonth(month)]
}

function getNextDate(year: string | number, month: string | number, day?: string | number): any[] {
  if (day) {
    return date2ymd(getDateByCount(`${year}-${month}-${day}`, 7));
  }
  return [computedNextYear(year, month), computedNextMonth(month)]
}

function delay(time?: number) {
  return new Promise(resolve => setTimeout(() => resolve(), time || 0))
}

function getToday(needArray?: boolean) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate()
  if (needArray) {
    return [year, month, day];
  }
  return [year, month, day].join('-');
}

export {
  noop,
  isZh,
  delay,
  language,
  offloadFn,
  zhWeeks,
  enWeeks,
  date2ymd,
  getDateByCount,
  computedNextMonth,
  computedPrevMonth,
  getPrevDate,
  getNextDate,
  getToday,
}