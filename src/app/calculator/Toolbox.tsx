'use client';

import { Settings, SortAscIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export type ToolboxProps = {
  onDeleteAllStays: () => void;
  onSortStays: () => void;
};

export function Toolbox(props: ToolboxProps) {
  const { onDeleteAllStays, onSortStays } = props;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="absolute size-5" />
            <span className="sr-only">Toolbox</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onSortStays} className="cursor-pointer">
            Sort stays by start date
            <SortAscIcon className="ml-2" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild className="w-full">
            <div className="flex text-red-500 w-full">
              <DropdownMenuItem className="cursor-pointer w-full">
                <div className="flex flex-grow my-auto">
                  Delete all stays
                </div>
                <div className="flex flex-shrink my-auto">
                  <XIcon />
                </div>
              </DropdownMenuItem>
            </div>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete all of your stays on this site.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDeleteAllStays}>Delete all stays</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
