import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5); //pega um tamanho ideal de acordo com o tamanho da tela do dispositivo

interface Props extends TouchableOpacityProps {
  date: Date;
  amount?: number;
  completed?: number;
}

export function HabitDay({amount = 0, completed = 0, date,...rest}: Props) {
  const amountAccomplishedPercentage = amount > 0 ? generateProgressPercentage(completed, amount) : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity 
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPercentage === 0,
        ["bg-violet-900 border-violet-700"]: amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
        ["bg-violet-800 border-violet-600"]: amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40,
        ["bg-violet-700 border-violet-500"]: amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60,
        ["bg-violet-600 border-violet-500"]: amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80,
        ["bg-violet-500 border-violet-400"]: amountAccomplishedPercentage >= 80,
        ["border-white border-3"]: isCurrentDay
      })}
      style={{width: daySize, height: daySize}}
      activeOpacity={0.7}
      {...rest}
    />
  );
}