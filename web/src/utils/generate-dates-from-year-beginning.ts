import dayjs from "dayjs";

export function generateDateFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf('year'); //Pega o primeiro dia do ano
  const today = new Date(); //Pega a data de hoje

  const dates = [];
  let compareDate = firstDayOfTheYear

  while(compareDate.isBefore(today)){ //Enquanto o primeiro dia do ano for anterior ao dia de hoje
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day')
  }

  return dates;
}