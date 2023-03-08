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

document.querySelector('input').addEventListener('keypress', (event) => {
    event.stopPropagation();

    if (event.key == 'Enter' && document.querySelector('input').value) {
        const newChara = document.createElement('div');
        const newCharaName = document.createElement('p');
        const newCharaModif = document.createElement('input');
        const removeNewChara = document.createElement('img');
        const modifRemoveDiv = document.createElement('div');

        if (document.querySelector('.character-list').style.display = 'none') {
            document.querySelector('.character-list').style.display = 'flex';
        }

        newChara.classList.add('character');
        newCharaModif.type = 'number';
        newCharaModif.ariaLabel = 'number';
        newCharaName.textContent = document.querySelector('input').value;
        removeNewChara.src = '../assets/close.png';
        newCharaModif.classList.add('modifier');
        removeNewChara.classList.add('close');
        removeNewChara.addEventListener('click', (event) => {
            removeNewChara.closest('.character').remove();

            if (document.querySelectorAll('.character').length < 1) {
                document.querySelector('.character-list').style.display = 'none';
                document.querySelector('.roll-column').style.display = 'none';
            }
        })
        modifRemoveDiv.style.display = 'flex';
        newChara.appendChild(newCharaName);
        modifRemoveDiv.appendChild(newCharaModif);
        modifRemoveDiv.appendChild(removeNewChara);
        newChara.appendChild(modifRemoveDiv);
        document.querySelector('.character-list').appendChild(newChara);

        document.querySelector('input').value = '';
    } else {
        return;
    }
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (document.getElementsByClassName('character').length > 0) {
        const rolls = [];
        const title = document.createElement('h4');
        const actingDiv = document.createElement('div');
        const actingOrder = document.createElement('ol');

        if (document.querySelector('.roll-column').style.display == 'flex') {
            document.querySelector('.roll-column').innerHTML = '';
        }


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
        });

        actingDiv.classList.add('acting-order');
        title.textContent = 'Action order';
        document.querySelector('.roll-column').appendChild(title);

        if (document.querySelector('#dice').value == 'd20') {
            document.querySelector('.roll-column').style.flexDirection = "column";
        } else {
            const declareDiv = document.createElement('div');
            const declareOrder = document.createElement('ol');
            const declareSubtitle = document.createElement('h5');
            const actingSubtitle = document.createElement('h5');

            declareDiv.classList.add('declare-order');
            actingSubtitle.textContent = 'Acting';
            declareSubtitle.textContent = 'Declaring';
            for (const declaringRoll of rolls) {
                const newEntry = document.createElement('li');
                newEntry.textContent = declaringRoll.name + `(${declaringRoll.roll})`;
                declareOrder.appendChild(newEntry);
            }

            declareDiv.appendChild(declareSubtitle);
            declareDiv.appendChild(declareOrder);
            document.querySelector('.roll-column').appendChild(declareDiv);
            actingDiv.appendChild(actingSubtitle);
            document.querySelector('.roll-column').style.flexDirection = "row";
        }

        rolls.reverse();
        for (let actingRoll of rolls) {
            const newEntry = document.createElement('li');
            newEntry.textContent = actingRoll.name + `(${actingRoll.roll})`;
            actingOrder.appendChild(newEntry);
        }

        actingDiv.appendChild(actingOrder);
        document.querySelector('.roll-column').appendChild(actingDiv);
        document.querySelector('.roll-column').style.display = 'flex';

    } else {
        alert('No characters!');
    }
})
