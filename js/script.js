document.querySelector('form').addEventListener('submit', (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (document.querySelector('form').querySelector('input').value) {
        const newChara = document.createElement('div');
        const newCharaName = document.createElement('p');
        const newCharaModif = document.createElement('input');
        const removeNewChara = document.createElement('img');

        newChara.classList.add('character');
        newCharaModif.type = 'number';
        newCharaModif.ariaLabel = 'number';
        newCharaName.textContent = document.querySelector('form').querySelector('input').value;
        removeNewChara.src = '../assets/close.png';
        newCharaModif.classList.add('modifier');
        removeNewChara.classList.add('close');
        newChara.appendChild(newCharaName);
        newChara.appendChild(newCharaModif);
        newChara.appendChild(removeNewChara);
        document.querySelector('.character-table').appendChild(newChara);

        document.querySelector('form').querySelector('input').value = '';
    } else {
        return;
    }
})

document.querySelector('#roll').addEventListener('click', (event) => {
    event.stopPropagation();

    const rolls = [];
    let declare = "Declare action: ";
    let act = "Act: ";

    for (let chara of document.querySelectorAll('.character')) {
        rolls.push({
            name: chara.querySelector('p').textContent,
            roll: (Math.floor(Math.random() * 11) + Number(chara.querySelector('input').value))
        })
    }
    rolls.sort((a, b) => {
        return a.roll - b.roll;
    })

    for (let declaringRoll of rolls) {
        declare += declaringRoll.name + `(${declaringRoll.roll})`;
        if (rolls.indexOf(declaringRoll) < (rolls.length - 1)) {
            declare += ", "
        } else {
            declare += "."
        }
    }
    rolls.reverse();
    for (let actingRoll of rolls) {
        act += actingRoll.name + `(${actingRoll.roll})`;
        if (rolls.indexOf(actingRoll) < (rolls.length - 1)) {
            act += ", "
        } else {
            act += "."
        }
    }

    console.log(`
    ${declare}
    ${act}
    `);
})