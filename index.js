import {buildStarSelector, getStarSet} from './stars.js';
import {createBasicTable} from './table.js';
import {effectGroups, effects} from './effects.js';

const headerSelector = 'tr[data-ei="-1"]';

const buildCell = (star, effect, select, rerender) => {
    const td = document.createElement('td');

    td.innerHTML = star;
    td.dataset.eff = effect;
    td.dataset.set = 'y'; // star set
    td.dataset.int = 'y'; // interactive
    td.onclick = () => {
        select.value = star;
        rerender(star, select);
    };

    return td;
};

const buildEffects = (selectedStar, select) => {
    const starSet = getStarSet(selectedStar);

    document.querySelectorAll(`td[data-set="y"]`).forEach(td => td.remove());

    for (let i = 0; i < 9; ++i) {
        const tr = document.querySelector(`tr[data-ei="${i}"]`);

        tr.appendChild(buildCell(starSet[i], effects[i], select, buildEffects));
        tr.appendChild(buildCell(starSet[i + 9], effects[i], select, buildEffects));
        tr.appendChild(buildCell(starSet[i + 18], effects[i], select, buildEffects));
    }
};

const createBlankRows = (table) => {
    for (let i = -1; i < 9; ++i) {
        const tr = document.createElement('tr');

        tr.dataset.ei = i.toString(); // effect index
        table.appendChild(tr);
    }
};

const createEffectHeaders = () => {
    const tr = document.querySelector(headerSelector);

    effectGroups.forEach((group) => {
        const th = document.createElement('th');

        th.innerHTML = group;
        tr.appendChild(th);
    });

    effects.forEach((effect, index) => {
        const th = document.createElement('th');
        const tr = document.querySelector(`tr[data-ei="${index % 9}"]`);

        th.innerHTML = effect;
        tr.appendChild(th);
    });
};

const createHeaderSpacer = () => {
    const tr = document.querySelector(headerSelector);
    const td = document.createElement('td');
    tr.prepend(td);
};

const createStarSelector = () => {
    const select = buildStarSelector((event, selectedStar) => {
        buildEffects(selectedStar, event.target);
    });
    document.getElementById('star-selector').appendChild(select);
};

const buildTable = () => {
    createBlankRows(createBasicTable());
    createEffectHeaders();
    createHeaderSpacer();
    createStarSelector();
};

buildTable();
