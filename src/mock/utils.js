import dayjs from 'dayjs';

const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];

const tripDate = (date) => dayjs(date).format('D.MMMM');

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export{getRandomValue, tripDate, updateItem};
