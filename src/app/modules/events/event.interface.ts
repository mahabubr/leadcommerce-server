import { Model } from 'mongoose';

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
  image?: { avatar?: string; avatar_public_url?: string };
  eventTitle: string;
  eventDate: string;
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
  eventTopic: IEventTopic[];
};

export type EventModel = Model<IEvent, Record<string, unknown>>;
