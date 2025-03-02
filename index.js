import {buildStarSelector, stars} from './stars.js';

const select = buildStarSelector((_, value) => redraw(value));
const starSet = stars.concat(stars);

const cleanGrid = () => document.querySelectorAll('.star').forEach(starElement => starElement.remove());

const redraw = value => {
  cleanGrid();

  for (let j = 0; j < 9; ++j) {
    for (let i = 0; i < 3; ++i) {
      const starIndex = i * 9 + j + parseInt(value);
      const td = document.createElement('td');
      const tr = document.querySelectorAll('tr')[j + 1];

      td.innerHTML = starSet[starIndex];
      td.classList.add('star');
      td.setAttribute('data-index', `${starIndex % 27}`);
      td.onclick = () => {
          select.value = starSet[starIndex];
          redraw(starIndex % 27);
      };

      tr.appendChild(td);
    }
  }
};

document.getElementById('star-selector').appendChild(select);
