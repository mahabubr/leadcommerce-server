"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Event = (0, mongoose_1.model)('Event', EventSchema);
