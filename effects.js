import {stars} from './stars.js';

export const effects = [
    'No Effect',
    'Sambath',
    'Vibath',
    'Sugam',
    'Karianasam',
    'Deivanugoolam',
    'Vadhai',
    'Maithram',
    'Parama Maithram'
];

export const effectGroups = [
    'Jenmam',
    'Anujenmam',
    'Thrijenmam'
];

export const getEffectSet = (selectedStar) => {
    const starIndex = stars.indexOf(selectedStar);
    const selectEffectIndex = 9 - starIndex % effects.length;

    console.log(selectEffectIndex);

    return effects.concat(effects, effects, effects).slice(selectEffectIndex, selectEffectIndex + 27);
}
