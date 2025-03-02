import {buildStarSelector, getStarSet, stars} from '../stars.js';
import {createBasicTable} from '../table.js';
import {getEffectSet} from '../effects.js';

const headerSelector = 'tr[data-si="-1"]';
let setCounter = 0;

const buildEffects = (selectedStar) => {
    const effectSet = getEffectSet(selectedStar);
    const counter = (setCounter++).toString();

    const rowZero = document.createElement('td');
    rowZero.dataset.set = counter;

    const button = document.createElement('button');
    button.onclick = () => {
        document.querySelectorAll(`td[data-set="${counter}"]`).forEach(td => td.remove());
    };
    button.innerHTML = 'X';
    rowZero.appendChild(button);
    rowZero.appendChild(document.createTextNode(` ${selectedStar}`));

    const rows = [rowZero].concat(effectSet.map((effect) => {
        const td = document.createElement('td');
        td.innerHTML = effect;
        td.dataset.set = counter;
        td.dataset.eff = effect;
        return td;
    }));

    for (let i = -1; i < 27; ++i) {
        const tr = document.querySelector(`tr[data-si="${i}"]`);
        const ss = tr.querySelector('td[data-ss="y"]');

        if (ss) {
            tr.insertBefore(rows[i + 1], ss);
        } else {
            tr.appendChild(rows[i + 1]);
        }
    }
};

const createBlankRows = (table) => {
    for (let i = -1; i < 27; ++i) {
        const tr = document.createElement('tr');

        tr.dataset.si = i.toString(); // star index
        table.appendChild(tr);
    }
};

const createStarHeaders = () => {
    stars.forEach((star, index) => {
        const th = document.createElement('th');
        const tr = document.querySelector(`tr[data-si="${index}"]`);

        th.innerHTML = star;
        tr.appendChild(th);
    });
};

const createHeaderSpacer = () => {
    const tr = document.querySelector(headerSelector);
    const td = document.createElement('td');
    tr.appendChild(td);
};

const createStarSelector = () => {
    const tr = document.querySelector(headerSelector);
    const td = document.createElement('td');
    const select = buildStarSelector((event, selectedStar) => {
        event.target.value = undefined;
        buildEffects(selectedStar);
    });

    td.appendChild(select);
    td.dataset.ss = 'y'; // star selector
    tr.appendChild(td);

    Array.from({length: 3}).forEach((_, index) => {
        const td = document.createElement('td');
        const tr = document.querySelector(`tr[data-si="${index * 9}"]`);

        td.setAttribute('rowspan', '9');
        td.dataset.ss = 'y'; // star selector
        tr.appendChild(td);
    });
};

const buildTable = () => {
    createBlankRows(createBasicTable());
    createStarHeaders();
    createHeaderSpacer();
    createStarSelector();
};

buildTable();
