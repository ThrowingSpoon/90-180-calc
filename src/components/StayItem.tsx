/* eslint-disable no-console */

'use client';

import { Reorder, useDragControls } from 'framer-motion';
import { Grip, TrashIcon } from 'lucide-react';
import { ReactElement } from 'react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Stay } from '@/lib/types';
import { DatePickerWithRange } from './DatePicker';
import { Button } from './ui/button';
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
  const dragControls = useDragControls();

  if (stay == null) {
    return <div />;
  }

  return (
    <Reorder.Item
      value={stay.stayId}
      id={stay.stayId}
      dragListener={false}
      dragControls={dragControls}
    >
      <Card>
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
                <Grip
                  className="ml-3 hover:scale-125 active:scale-150"
                  onPointerDown={(e) => dragControls.start(e)}
                  style={{ touchAction: 'none' }}
                />
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
            <div className="flex flex-grow my-auto">
              <div className="mx-auto">
                {stay.days}
                {' '}
                days
              </div>
            </div>
            <div
              className={cn(
                'flex flex-shrink my-auto',
                stay.daysInLast180 > 90 ? 'text-3xl text-red-500' : '',
              )}
            >
              Total:
              <span className="ml-1">{stay.daysInLast180}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reorder.Item>
  );
}
