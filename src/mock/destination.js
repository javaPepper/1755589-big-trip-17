import { getRandomValue } from './utils.js';

const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget. 
Fusce tristique felis at fermentum pharetra. 
Aliquam id orci ut lectus varius viverra. 
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
Sed sed nisi sed augue convallis suscipit in sed felis. 
Aliquam erat volutpat. 
Nunc fermentum tortor ac porta dapibus. 
In rutrum ac purus sit amet tempus.`;

const NAMES = 'Вена, Барселона, Майами, Лос-Анжелес, Пукет';

export const generateDestination = () => (
  {
    description: getRandomValue(DESCRIPTIONS.split('.')),
    name: getRandomValue(NAMES.split(',')),
    /*pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        //description: 'Chamonix parliament building' Не могу понять что за описание и где в разметке оно находится.
      }
    ]*/
  });
