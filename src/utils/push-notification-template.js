const { TYPE } = require('../consts');

const createNotificationForNewOrder = (content) => {
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

const createNotificationForCriticalStorage = (content) => {
  return {
    title: TYPE.NOTIFICATIONS.TITLE.CRITICAL_PRODUCT_STORAGE,
    message: `${content.product.name} has less than 10% quantity left.\nQuantity left: ${content.product.quantity}`,
  };
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
    case 'NEW_ORDER':
      notification = createNotificationForNewOrder(content);
      break;
    case 'ORDER_UPDATE':
      notification = createNotificationForOrderUpdate(content);
      break;
    case 'CRITICAL_PRODUCT_STORAGE':
      notification = createNotificationForCriticalStorage(content);
      break;
    default:
      break;
  }

  return notification;
};

module.exports = {
  create,
};
