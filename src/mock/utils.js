import dayjs from 'dayjs';

 const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];

 const tripDate = (date) => dayjs(date).format('D.MMMM');

export{getRandomValue, tripDate};
