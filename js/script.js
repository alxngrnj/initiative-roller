function dieRoll(die) {
    if (die == 'd10') {
        min = Math.ceil(1);
        max = Math.floor(10);
    } else {
        min = Math.ceil(1);
        max = Math.floor(20);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
        document.querySelector('.character-container').appendChild(newChara);

        document.querySelector('form').querySelector('input').value = '';
    } else {
        return;
    }
})

document.querySelector('#roll').addEventListener('click', (event) => {
    event.stopPropagation();

    if (document.getElementsByClassName('character').length < 1) {
        alert('No characters!');
    } else {

        const rolls = [];
        let declare = "Declare action: ";
        let act = "Act: ";

        for (let chara of document.querySelectorAll('.character')) {
            let initiativeRoll = (dieRoll(document.querySelector('#dice').value) + Number(chara.querySelector('input').value));

            if (initiativeRoll < 0) {
                initiativeRoll = 0;
            }

            rolls.push({
                name: chara.querySelector('p').textContent,
                roll: initiativeRoll
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
    }
})
