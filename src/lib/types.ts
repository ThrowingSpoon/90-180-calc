export type Stay = {
  stayId: string;
  start: Date | undefined;
  end: Date | undefined;
  days: number;
  daysInLast180: number;
  error?: string;
  overlap?: boolean;
};

export type Stays = {
  [key: string]: Stay
};
