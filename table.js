import {buildStarSelector} from './stars.js';

export const createBasicTable = () => {
    const table = document.createElement('table');
    document.body.appendChild(table);

    return table;
}

export const createColumnClearHeader = (counter, label) => {
    const td = document.createElement('td');
    td.dataset.set = counter;

    const button = document.createElement('button');
    button.onclick = () => {
        document.querySelectorAll(`td[data-set="${counter}"]`).forEach(td => td.remove());
    };
    button.innerHTML = 'X';
    td.appendChild(button);
    td.appendChild(document.createTextNode(` ${label}`));

    return td;
}

export const createStarSelectorHeader = (buildEffects) => {
    const tr = document.querySelector('tr[data-row="-1"]');
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
        const tr = document.querySelector(`tr[data-row="${index * 9}"]`);

        td.rowSpan = 9;
        td.dataset.ss = 'y'; // star selector
        tr.appendChild(td);
    });
};

export const insertColumn = (rows) => {
    for (let i = -1; i < 27; ++i) {
        const tr = document.querySelector(`tr[data-row="${i}"]`);
        const ss = tr.querySelector('td[data-ss="y"]');

        if (ss) {
            tr.insertBefore(rows[i + 1], ss);
        } else {
            tr.appendChild(rows[i + 1]);
        }
    }
}
