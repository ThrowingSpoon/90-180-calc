export type Stay = {
  stayId: string;
  start: Date | undefined;
  end: Date | undefined;
  days: number;
  daysInLast180: number;
  error: string;
};

export type Stays = {
  [key: string]: Stay
};
