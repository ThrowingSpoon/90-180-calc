/* eslint-disable no-console */

'use client';

import { ReactElement } from 'react';
import { DateRange } from 'react-day-picker';
import { TrashIcon } from 'lucide-react';
import { Stay } from '@/lib/types';
import { DatePickerWithRange } from './DatePicker';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

type StayTableProps = {
  stay: Stay | undefined;
  onDateRangeSelected: (dateRange: DateRange | undefined, id: string) => void;
  onDeleteStay: (id: string) => void;
};

export default function StayItem({
  stay,
  onDateRangeSelected,
  onDeleteStay,
}: StayTableProps): ReactElement {
  if (stay == null) {
    return <div />;
  }

  return (
    <Card draggable="true" className="cursor-grab active:cursor-grabbing">
      <CardContent className="py-2 px-2 md:px-4">
        <div className="flex flex-col">
          <div>
            <div className="flex">
              <DatePickerWithRange
                id={stay.stayId}
                dateRangeSelected={(dateRange) => onDateRangeSelected(dateRange, stay.stayId)}
                prompt="in/out dates"
                numberOfMonths={1}
                start={stay?.start}
                end={stay?.end}
                promptClassName="min-w-[250px] w-fit"
                className="mr-2"
                calendarClassName="mx-auto w-11/12 sm:w-fit"
              />
              <div className="my-auto">
                {stay.days}
                {' '}
                days
              </div>
            </div>
            <div>
              {stay?.overlap != null && stay.overlap === true && (
                <div className="flex flex-shrink text-orange-500 text-xs">
                  This stay overlaps with another one
                </div>
              )}
              {stay?.error != null && (
                <div className="flex flex-shrink text-red-500 text-xs">
                  {stay.error}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-2">
          <div
            className={cn(
              'flex flex-grow my-auto',
              stay.daysInLast180 > 90
                ? 'text-3xl text-red-500'
                : '',
            )}
          >
            Total:
            <span className="ml-1">
              {stay.daysInLast180}
            </span>
          </div>
          <div className="flex flex-shrink my-auto">
            <Button
              variant="ghost"
              onClick={() => {
                onDeleteStay(stay.stayId);
              }}
            >
              <TrashIcon aria-label="delete stay" size={15} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
