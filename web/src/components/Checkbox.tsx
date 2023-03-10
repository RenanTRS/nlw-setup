import * as CheckboxUi from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { Check } from "phosphor-react";

interface Props {
  title: string;
  form?: boolean;
  change?: () => void;
  check?: boolean;
  disable?: boolean;
}

export function Checkbox({disable = false, check, title, change, form = false}: Props) {
  return (
    <CheckboxUi.Root 
      className="flex items-center gap-3 group disabled:cursor-not-allowed focus:outline-none"
      onCheckedChange={change} 
      checked={check} 
      disabled={disable}
    >
      <div 
        className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background"
      >
        <CheckboxUi.Indicator>
          <Check size={20} className="text-white" />
        </CheckboxUi.Indicator>
      </div>

      <span 
        className={clsx("text-white leading-tight", {
          "font-semibold text-xl group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400": !form
        })}>
        {title}
      </span>
    </CheckboxUi.Root>
  );
}