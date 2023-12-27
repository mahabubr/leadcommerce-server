import { Schema, model } from 'mongoose';
import { EventModel, IEvent } from './event.interface';

const EventSchema = new Schema<IEvent>(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    like: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventGust: [
      {
        image: { type: String, required: true },
        name: { type: String, required: true },
        designation: { type: String, required: true },
        post: { type: String, required: true },
      },
    ],
    eventTopic: [
      {
        title: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Event = model<IEvent, EventModel>('Event', EventSchema);
