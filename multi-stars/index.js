import {effectGroups, effects} from '../effects.js';
import {getStarSet} from '../stars.js';
import {createBasicTable, createColumnClearHeader, createStarSelectorHeader, insertColumn} from '../table.js';

let setCounter = 0;

const buildEffects = (selectedStar) => {
    const starSet = getStarSet(selectedStar);
    const counter = (setCounter++).toString();

    const header = createColumnClearHeader(counter, '');
    const rows = [header].concat(starSet.map((star) => {
        const td = document.createElement('td');
        td.innerHTML = star;
        td.dataset.eff = effects[starSet.indexOf(star) % effects.length];
        td.dataset.set = counter;
        td.dataset.int = 'y'; // interactive
        td.onclick = () => buildEffects(star);
        return td;
    }));

    insertColumn(rows);
};

const createBlankRows = (table) => {
    for (let i = -1; i < 27; ++i) {
        const tr = document.createElement('tr');

        tr.dataset.row = i.toString(); // effect index
        table.appendChild(tr);
    }
};

const createEffectHeaders = () => {
    effectGroups.forEach((group, index) => {
        const th = document.createElement('th');
        const tr = document.querySelector(`tr[data-row="${index * 9}"]`);

        th.innerHTML = group;
        th.rowSpan = 9;
        th.dataset.or = 'v'; // orientation
        tr.appendChild(th);
    });

    effects.concat(effects, effects).forEach((effect, index) => {
        const th = document.createElement('th');
        const tr = document.querySelector(`tr[data-row="${index}"]`);

        th.innerHTML = effect;
        tr.appendChild(th);
    });
};

const createHeaderSpacer = () => {
    const tr = document.querySelector('tr[data-row="-1"]');
    const td = document.createElement('td');
    td.colSpan = 2;
    tr.appendChild(td);
};

const buildTable = () => {
    createBlankRows(createBasicTable());
    createEffectHeaders();
    createHeaderSpacer();
    createStarSelectorHeader(buildEffects);
};

buildTable();
