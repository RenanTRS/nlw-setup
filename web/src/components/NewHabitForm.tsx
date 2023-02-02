import { FormEvent, useState } from "react";
import { Check } from "phosphor-react";
import { Checkbox } from "./Checkbox";
import { api } from "../lib/axios";

export function NewHabitForm () {
  const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const [title, setTitle] = useState<string>("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();

    if(!title || weekDays.length === 0){
      return
    }

    try {
      await api.post('/habits', {
        title,
        weekDays
      })

      setTitle('');
      setWeekDays([]);
      
      alert('Hábito criado com sucesso!');
    } catch(err){
      console.log(err)
    }
  }

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter( weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual o seu comprometimento?
      </label>

      <input 
        type="text" 
        id="title"
        value={title}
        placeholder="ex.: Exercícios, dormir bem, etc ..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
        onChange={(event) => setTitle(event?.target.value)}
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox 
            key={weekDay} 
            title={weekDay} 
            form 
            change={() => handleToggleWeekDay(index)}
            check={weekDays.includes(index)}
          />
        ))
        }
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-background">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}