import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

interface Props {
  date: Date;
  handleChange: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    create_at: string;
  }[];
  completedHabits: string[];
}

export function HabitsList({date, handleChange}: Props) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  
  useEffect(() => {
    api.get("/day", {
      params: {
        date: date.toISOString()
      }
    }).then(response => setHabitsInfo(response.data));
  }, []);
  
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date); //Checa se a data atual é antes ou depois que a data passada

 const handleToggleHabit = async (habitId: string) => {
  await api.patch(`/habits/${habitId}/toggle`);

  const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId);

  let completedHabits: string[] = [];

  if(isHabitAlreadyCompleted){
    completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
  } else {
    completedHabits = [...habitsInfo!.completedHabits, habitId];
  }

  setHabitsInfo({
    possibleHabits: habitsInfo!.possibleHabits,
    completedHabits,
  });

  handleChange(completedHabits.length);
 }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox 
            key={habit.id} 
            title={habit.title} 
            check={habitsInfo.completedHabits.includes(habit.id)}
            disable={isDateInPast}
            change={() => handleToggleHabit(habit.id)}
          />
        );
      })}
    </div>
  );
}