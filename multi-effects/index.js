import {stars} from '../stars.js';
import {createBasicTable, createColumnClearHeader, createStarSelectorHeader, insertColumn} from '../table.js';
import {getEffectSet} from '../effects.js';

let setCounter = 0;

const buildEffects = (selectedStar) => {
    const effectSet = getEffectSet(selectedStar);
    const counter = (setCounter++).toString();

    const header = createColumnClearHeader(counter, selectedStar);
    const rows = [header].concat(effectSet.map((effect) => {
        const td = document.createElement('td');
        td.innerHTML = effect;
        td.dataset.set = counter;
        td.dataset.eff = effect;
        return td;
    }));

    insertColumn(rows);
};

const createBlankRows = (table) => {
    for (let i = -1; i < 27; ++i) {
        const tr = document.createElement('tr');

        tr.dataset.row = i.toString(); // star index
        table.appendChild(tr);
    }
};

const createStarHeaders = () => {
    stars.forEach((star, index) => {
        const th = document.createElement('th');
        const tr = document.querySelector(`tr[data-row="${index}"]`);

        th.innerHTML = star;
        tr.appendChild(th);
    });
};

const createHeaderSpacer = () => {
    const tr = document.querySelector('tr[data-row="-1"]');
    const td = document.createElement('td');
    tr.appendChild(td);
};

const buildTable = () => {
    createBlankRows(createBasicTable());
    createStarHeaders();
    createHeaderSpacer();
    createStarSelectorHeader(buildEffects);
};

buildTable();
