const select = document.querySelector('#star-selector');
const singleStars = [
  'Ashwini',
  'Bharani',
  'Kritthika',
  'Rohini',
  'Mrgashirsha',
  'Ardhra',
  'Punarvasu',
  'Pushya',
  'Ashlesha',
  'Magha',
  'Poorva Phalguni',
  'Uthara Phalguni',
  'Hastham',
  'Chithra',
  'Swathi',
  'Vaishaka',
  'Anuradha',
  'Jyeshta',
  'Moola',
  'Poorva Ashada',
  'Uthara Ashada',
  'Shravana',
  'Dhanishta',
  'Shathabisha',
  'Poorva Bhadrapada',
  'Uthara Bhadrapada',
  'Revathi'
];
const stars = singleStars.concat(singleStars);

singleStars.forEach((star, index) => select.appendChild(new Option(star, index)));

const cleanGrid = () => document.querySelectorAll('.star').forEach(starElement => starElement.remove());

const setStar = event => {
  const {index} = event.target.dataset;

  select.value = index;

  redraw(index);
};

const redraw = value => {
  cleanGrid();

  for (let j = 0; j < 9; ++j) {
    for (let i = 0; i < 3; ++i) {
      const starIndex = i * 9 + j + parseInt(value);
      const td = document.createElement('td');
      const tr = document.querySelectorAll('tr')[j + 1];

      td.innerHTML = stars[starIndex];
      td.classList.add('star');
      td.setAttribute('data-index', `${starIndex % 27}`);
      td.onclick = setStar;

      tr.appendChild(td);
    }
  }
};

select.onchange = event => redraw(event.target.value);
