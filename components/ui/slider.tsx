"use client";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
};

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    { className, value, onValueChange, min = 0, max = 100, step = 1, ...props },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center h-6",
        className
      )}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <SliderPrimitive.Range className="absolute h-full bg-[#111827]" />
      </SliderPrimitive.Track>
      {value?.map((_, i: number) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block size-5 rounded-full border-2 border-[#111827] bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#111827] disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
);
Slider.displayName = "Slider";

export { Slider }; 