import { Orders } from './order.model';

export const findOrderCode = async (): Promise<string | undefined> => {
  const lastRoute = await Orders.findOne({}, { order_code: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean(); // operation make faster
  return lastRoute?.order_code
    ? lastRoute?.order_code?.substring(3)
    : undefined;
};

export const generatedOrderCode = async (): Promise<string> => {
  const currentId = (await findOrderCode()) || (0).toString().padStart(2, '0'); // 00000
  // increment by one
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(2, '0');
  incrementedId = `TC-${incrementedId}`; //TC-0001
  return incrementedId;
};
