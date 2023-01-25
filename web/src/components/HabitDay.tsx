import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import { Checkbox } from "./Checkbox";

interface HabitDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

export function HabitDay({completed = 0, amount = 0}: HabitDayProps) {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  return (
    <Popover.Root>
      <Popover.Trigger 
        className={clsx("w-10 h-10 border-2 rounded-lg", {
          "bg-zinc-900 border-zinc-800": completedPercentage === 0,
          "bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
          "bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
          "bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
          "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
          "bg-violet-500 border-violet-400": completedPercentage >= 80
        })}
      />

      <Popover.Portal>
        <Popover.Content className="text-white min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">terça-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">21/01</span>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox title="Beber 2L de água" />
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}