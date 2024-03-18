/* eslint-disable no-nested-ternary */

'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Dialog, DialogContent, DialogTrigger,
} from './ui/dialog';

export function DatePickerWithRange({
  className,
  prompt,
  dateRangeSelected,
  numberOfMonths = 1,
  promptClassName,
  start,
  end,
}: {
  className?: string;
  prompt: string,
  dateRangeSelected: (dateRange: DateRange | undefined) => void,
  numberOfMonths?: number
  promptClassName?: string,
  start?: Date,
  end?: Date,
}) {
  const [date, setDate] = useState<DateRange>({ from: start, to: end });

  useEffect(() => {
    dateRangeSelected(date);
  }, [date, dateRangeSelected]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Dialog>
        <DialogTrigger asChild className={promptClassName}>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd LLL, y')}
                  {' '}
                  -
                  {' '}
                  {format(date.to, 'dd LLL, y')}
                </>
              ) : (
                format(date.from, 'dd LLL, y')
              )
            ) : (
              <span>{prompt}</span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto h-[22rem]">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => setDate({ to: range?.to, from: range?.from })}
            numberOfMonths={numberOfMonths}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
