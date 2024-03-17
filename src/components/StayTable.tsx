/* eslint-disable no-console */

'use client';

import { DateRange } from 'react-day-picker';
import { TrashIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Stays } from '@/lib/types';
import { DatePickerWithRange } from './DatePicker';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

type StayTableProps = {
  stays: Stays;
  onDateRangeSelected: (dateRange: DateRange | undefined, id: string) => void;
  onDeleteStay: (id: string) => void;
};

export default function StayTable({
  stays,
  onDateRangeSelected,
  onDeleteStay,
}: StayTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="p-3">Dates</TableHead>
          <TableHead className="p-3">Days</TableHead>
          <TableHead className="p-3">Last 180</TableHead>
          <TableHead className="p-3">Delete</TableHead>
          {/* <TableHead className="p-3">Error</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(stays).map((key) => (
          <TableRow key={key}>
            <TableCell className="p-2">
              <DatePickerWithRange
                dateRangeSelected={(dateRange) => onDateRangeSelected(dateRange, key)}
                prompt="in/out dates"
                numberOfMonths={1}
                start={stays?.[key]?.start}
                end={stays?.[key]?.end}
                promptClassName="min-w-[250px] w-fit"
              />
            </TableCell>
            <TableCell className="p-2">
              {stays?.[key]?.days ?? 'Error'}
            </TableCell>
            <TableCell
              className={cn(
                'p-2',
                stays[key].daysInLast180 > 90
                  ? 'text-3xl text-red-500'
                  : '',
              )}
            >
              {stays?.[key]?.daysInLast180 ?? 'Error'}
            </TableCell>
            <TableCell className="p-2">
              <Button
                variant="ghost"
                onClick={() => {
                  onDeleteStay(key);
                }}
              >
                <TrashIcon size={20} />
              </Button>
            </TableCell>
            {stays?.[key]?.error && (
              <TableCell className="p-2 text-red-500">
                {stays?.[key]?.error ?? ''}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
