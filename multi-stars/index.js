import {effectGroups, effects} from '../effects.js';
import {buildStarSelector, getStarSet} from '../stars.js';
import {createBasicTable} from '../table.js';

const headerSelector = 'tr[data-ei="-1"]';
let setCounter = 0;

const buildEffects = (selectedStar) => {
    const starSet = getStarSet(selectedStar);
    const counter = (setCounter++).toString();

    const rowZero = document.createElement('td');
    rowZero.dataset.set = counter;

    const button = document.createElement('button');
    button.onclick = () => {
        document.querySelectorAll(`td[data-set="${counter}"]`).forEach(td => td.remove());
    };
    button.innerHTML = 'X';
    rowZero.appendChild(button);

    const rows = [rowZero].concat(starSet.map((star) => {
        const td = document.createElement('td');
        td.innerHTML = star;
        td.dataset.set = counter;
        td.onclick = () => buildEffects(star);
        return td;
    }));

    for (let i = -1; i < 27; ++i) {
        const tr = document.querySelector(`tr[data-ei="${i}"]`);
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

        tr.dataset.ei = i; // effect index
        table.appendChild(tr);
    }
};

const createEffectHeaders = () => {
    effectGroups.forEach((group, index) => {
        const th = document.createElement('th');
        const tr = document.querySelector(`tr[data-ei="${index * 9}"]`);

        th.innerHTML = group;
        th.setAttribute('rowspan', '9');
        th.dataset.or = 'v'; // orientation
        tr.appendChild(th);
    });

    effects.concat(effects, effects).forEach((effect, index) => {
        const th = document.createElement('th');
        const tr = document.querySelector(`tr[data-ei="${index}"]`);

        th.innerHTML = effect;
        tr.appendChild(th);
    });
};

const createHeaderSpacer = () => {
    const tr = document.querySelector(headerSelector);
    const td = document.createElement('td');
    td.colSpan = 2;
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
        const tr = document.querySelector(`tr[data-ei="${index * 9}"]`);

        td.setAttribute('rowspan', '9');
        td.dataset.ss = 'y'; // star selector
        tr.appendChild(td);
    });
};

const buildTable = () => {
    createBlankRows(createBasicTable());
    createEffectHeaders();
    createHeaderSpacer();
    createStarSelector();
};

buildTable();
