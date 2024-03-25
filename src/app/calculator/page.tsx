/* eslint-disable no-console */

'use client';

import { differenceInDays } from 'date-fns';
import { Reorder } from 'framer-motion';
import { PlusCircleIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import useLocalStorageState from 'use-local-storage-state';
import { v4 } from 'uuid';
import { Stay, Stays } from '@/lib/types';
import { Button } from '@/components/ui/button';
import StayItem from '@/components/StayItem';
import { calculateStays, sortStays } from '../../lib/helpers';
import { Toolbox } from './Toolbox';

export default function Calculator() {
  const [stays, setStays] = useLocalStorageState<Stays>('stays');
  const keys = Object.keys(stays ?? {});

  const addAStay = () => {
    const id = v4();
    setStays({
      ...stays,
      [id]: {
        days: 0,
        daysInLast180: 0,
        end: undefined,
        start: undefined,
        error: '',
        stayId: id,
      },
    });
  };

  const onDeleteAllStays = () => {
    setStays({});
  };

  const onSortStays = () => {
    setStays({ ...calculateStays(sortStays(stays ?? {})) });
  };

  const onDeleteStay = (id: string) => {
    const tempStays = { ...stays };
    delete tempStays[id];
    setStays({ ...calculateStays(tempStays) });
  };

  const dateRangeSelected = (dateRange: DateRange | undefined, id: string) => {
    const tempStays = stays ?? {};
    const tempStay = stays?.[id];

    if (tempStay == null) {
      console.error('Could not find the stay with id: ', id);
      return;
    }

    if (dateRange?.from == null || dateRange?.to == null) {
      tempStay.error = 'Please select a valid date range';
      return;
    }

    tempStay.start = dateRange.from;
    tempStay.end = dateRange.to;
    tempStay.days = differenceInDays(dateRange.to, dateRange.from) + 1;
    tempStay.error = '';
    tempStay.daysInLast180 = 0;

    tempStays[id] = tempStay;

    setStays({ ...calculateStays(tempStays) });
  };

  return (
    <div>
      <div className="flex flex-1 flex-row mb-3 mx-2">
        <Button onClick={addAStay} className="mr-6" variant="outline">
          Add a stay
          <PlusCircleIcon aria-label="add a stay" className="ml-2" />
        </Button>
        <div className="ml-auto">
          <Toolbox
            onDeleteAllStays={onDeleteAllStays}
            onSortStays={onSortStays}
          />
        </div>
      </div>
      <div className="w-full">
        <Reorder.Group
          axis="y"
          values={keys}
          onReorder={(newOrder: string[]) => {
            const reorderedStays: Stays = {};
            for (let index = 0; index < newOrder.length; index += 1) {
              const element = newOrder[index];
              const currStay: Stay | undefined = stays?.[element] ?? undefined;
              if (currStay != null) reorderedStays[element] = currStay;
            }
            setStays({ ...reorderedStays });
          }}
        >
          <div className="w-fit mx-auto flex flex-col *:my-1.5 first:*:mt-0 last:*:mb-0">
            {keys.map((key: string) => (
              <StayItem
                key={key}
                onDateRangeSelected={dateRangeSelected}
                stay={stays?.[key] ?? undefined}
                onDeleteStay={onDeleteStay}
              />
            ))}
          </div>
        </Reorder.Group>
      </div>
    </div>
  );
}
