import { Schema, Types, model } from 'mongoose';
import { ShipmentStatus } from '../order/order.constant';
import { IShipment, ShipmentModel } from './shipment.interface';

const ShipmentSchema = new Schema<IShipment>(
  {
    total_amount: { type: Number, required: true },
    order_id: { type: Types.ObjectId, required: true },
    shipment_status: {
      type: String,
      enum: ShipmentStatus,
      required: true,
    },
    shipment_code: {
      type: String,
      required: true,
    },
    courier: {
      type: String,
      required: true,
    },
    delivery_name: {
      type: String,
      required: true,
    },
    buyer_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Shipment = model<IShipment, ShipmentModel>('Shipment', ShipmentSchema);

export default Shipment;
