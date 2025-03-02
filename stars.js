export const stars = [
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

export const buildStarSelector = (onChange) => {
    const select = document.createElement('select');

    const optionZero = document.createElement('option');
    optionZero.value = undefined;
    optionZero.innerHTML = 'Select a star';
    optionZero.disabled = true;
    optionZero.selected = true;
    select.appendChild(optionZero);

    stars.forEach(star => {
        const option = document.createElement('option');
        option.value = star;
        option.dataset.index = stars.indexOf(star).toString();
        option.innerHTML = star;
        select.appendChild(option);
    });

    select.onchange = (event) => {
        onChange(select.value, event.target.selectedOptions[0].dataset.index);
        select.value = undefined;
    };

    return select;
}
