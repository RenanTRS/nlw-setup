import { generateDateFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDateFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 semanas
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((item, key) => {
          return (
            <div className="text-zinc-400 text-xl h-10 w-10 flex font-bold items-center justify-center"
            key={key}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
            return <HabitDay key={date.toString()} />;
        })}

        {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
          return (
            <div 
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40" />
          );
        })}
      </div>

    </div>
  );
}