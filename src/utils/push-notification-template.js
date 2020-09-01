const { TYPE } = require('../consts');

const createNotificationForNewOrder = async (content) => {
  const notification = {
    title: 'New order received',
    message: `New order received from ${content.customer.first_name} ${content.customer.last_name}.\n Ordered items:\n`,
  };

  content.orderItems.forEach((eachItem) => {
    notification.message += `${eachItem.product.name}`;
  });

  return notification;
};

const createNotificationForOrderUpdate = async () => {

};

const createNotificationForOrderDelivered = async () => {

};

/**
 *
 * @param {Number} titleType
 * @param {Number} contentType
 * @param {[JSON]} content
 */
const create = (titleType, contentType, content) => {
  let notification;
  switch (titleType) {
    case TYPE.NOTIFICATIONS.TITLE.NEW_ORDER:
      notification = createNotificationForNewOrder(content);
      break;
    case TYPE.NOTIFICATIONS.TITLE.ORDER_UPDATE:
      notification = createNotificationForOrderUpdate(content);
      break;
    default:
      break;
  }

  return notification;
};

module.exports = {
  create,
};
