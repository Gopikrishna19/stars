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
        option.innerHTML = star;
        select.appendChild(option);
    });

    select.onchange = (event) => {
        onChange(event, event.target.value);
    };

    return select;
};

export const getStarSet = (selectedStar) => {
    const selectedStarIndex = stars.indexOf(selectedStar);

    return stars.concat(stars).slice(selectedStarIndex, selectedStarIndex + 27);
};
