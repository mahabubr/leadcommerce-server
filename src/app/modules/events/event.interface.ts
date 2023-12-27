export type IEventGust = {
  image: string;
  name: string;
  designation: string;
  post: string;
};

export type IEventTopic = {
  title: string;
};

export type IEvent = {
  eventTitle: string;
  eventDate: Date;
  organizer: string;
  status: boolean;
  like: number;
  startTime: string;
  endTime: string;
  location: string;
  ticketPrice: number;
  seat: number;
  description: string;
  eventGust: IEventGust[];
  event: IEventTopic[];
};
