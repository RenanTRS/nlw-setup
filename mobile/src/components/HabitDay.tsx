import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

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
  return (
    <TouchableOpacity 
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{width: daySize, height: daySize}}
      activeOpacity={0.7}
      {...rest}
    />
  );
}