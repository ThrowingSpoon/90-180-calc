/* eslint-disable no-console */

'use client';

import {
  differenceInDays,
  isAfter,
  isBefore,
  subDays,
} from 'date-fns';
import { PlusCircleIcon, XIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import useLocalStorageState from 'use-local-storage-state';
import { v4 } from 'uuid';
import { Stays } from '@/lib/types';
import { Button } from '@/components/ui/button';
import StayItem from '@/components/StayItem';

export default function Calculator() {
  const [stays, setStays] = useLocalStorageState<Stays>('stays');

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

  const deleteAllStays = () => {
    setStays({});
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

    const stayValues = Object.values(stays ?? {});

    Object.values(tempStays).forEach((currStay) => {
      if (currStay.end == null || currStay.start == null) {
        console.log('NULL START OR END');
        return;
      }

      let fullOverlaps: Stays = {};
      const partialOverlaps: Stays = {};

      const date180Ago = subDays(currStay.start, 7);

      stayValues.forEach((otherStay) => {
        if (
          otherStay.end == null
          || otherStay.start == null
          || currStay.start == null
          || currStay.end == null
        ) return;
        if (otherStay.stayId === currStay.stayId) {
          fullOverlaps = { ...fullOverlaps, [currStay.stayId]: currStay };
        }
      });

      const filteredStays = stayValues.filter((otherStay) => {
        if (
          otherStay.end == null
          || otherStay.start == null
          || currStay.start == null
          || currStay.end == null
        ) return false;
        if (otherStay.stayId === currStay.stayId) return true;
        return (
          isBefore(otherStay.start, currStay.start)
          && isAfter(otherStay.end, date180Ago)
        );
      });
      const reduced = filteredStays.reduce((pre, cur) => pre + cur.days, 0);
      tempStays[currStay.stayId].daysInLast180 = reduced;
    });

    setStays({ ...tempStays });
  };

  return (
    <div className="w-full mx-2">
      <div>
        <div className="flex flex-1 flex-row">
          <Button onClick={addAStay} className="mr-6">
            Add a stay
            <PlusCircleIcon className="ml-2" />
          </Button>
          <Button
            className="ml-auto"
            variant="destructive"
            onClick={deleteAllStays}
          >
            Delete all stays
            <XIcon className="ml-2" />
          </Button>
        </div>
      </div>
      <div>
        <StayItem onDateRangeSelected={dateRangeSelected} stays={stays ?? {}} />
      </div>
    </div>
  );
}
