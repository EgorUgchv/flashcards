let currentCardNumber = 1;
function saveCardsHTML() {
  'use strict';
  let cardsContainer = getCardsContainer();
  if (cardsContainer) {
    let cards = getAllCards();
    if (cards) {
      handleOfCardValues(cards, 'save');
    }
    let cardsHTML = cardsContainer.innerHTML;
    localStorage.setItem('cardsHTML', cardsHTML);
  }
}
function handleOfCardValues(cards, action) {
  'use strict';
  cards.forEach((card, index) => {
    let term = getTerm(card);
    let definition = getDefinition(card);
   switch (action) {
     case 'save':
       setItemsInLocalStorage(definition,term,index);
       break;
   
    case 'load':
      getItemsFromLocalStorage(definition,term,index);
      break;
     default:
       throw new Error(`Unknown action: ${action}`);
  }
  });
}
function getAllCards() {
  'use strict';
  return document.querySelectorAll('.cards .card');
}
function getCardsContainer() {
  'use strict';
  return document.querySelector('.cards');
}
function getTerm(card) {
  'use strict';
  return card.querySelector('input[name="term"]');
}
function getDefinition(card) {
  'use strict';
  return card.querySelector('input[name="definition"]');
}
function setItemsInLocalStorage(definition, term, index) {
  'use strict';
  localStorage.setItem(`termValue${index}`, term.value);
  localStorage.setItem(`definitionValue${index}`, definition.value);
}
function getItemsFromLocalStorage(definition, term, index) {
  'use strict';
  term.value = localStorage.getItem(`termValue${index}`);
  definition.value = localStorage.getItem(`definitionValue${index}`);
}
function restoreCardsHTML() {
  'use strict';
  let cardsHTML = localStorage.getItem('cardsHTML');
  if (cardsHTML) {
    let cardsContainer = getCardsContainer();
    cardsContainer.innerHTML = cardsHTML;
  }
  let cards = getAllCards();
  if (cards) {
    handleOfCardValues(cards,'load');
  }
}
function addCard() {
  'use strict';
  currentCardNumber++;

  let newCardHTML = `
                    <div class="header d-flex justify-content-between p-3">
                        <h4 class="card-counter">${currentCardNumber}</h4>
                        <a class="button-bin btn"  id = "bin${currentCardNumber}"></a>
                    </div>
                    <div class="card-body row">
                        <div class="term col">
                            <h3>Термин</h3>
                            <input class="form-control w-100" name = "term" placeholder="Введите термин" required>
                        </div>
                        <div class="definition col">
                            <h3>Определение</h3>
                            <input class="form-control w-100" name="definition" placeholder="Введите определение" required>
                        </div>
                    </div>
            </div> `;
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.classList.add('mt-3');
  newCard.innerHTML = newCardHTML;

  let addNewCard = document.querySelector('.cards');
  let referenceNode = document.getElementById('create-cards');
  addNewCard.insertBefore(newCard, referenceNode);
  saveCardsHTML();
}
function saveCardDataToServer() {
  'use strict';
  let cards = [];
  document.querySelectorAll('.cards > .card   ').forEach((card) => {
    let termInput = card.querySelector('input[name="term"]');
    let definitionInput = card.querySelector('input[name="definition"]');

    if (termInput && definitionInput) {
      let term = termInput.value.trim();
      let definition = definitionInput.value.trim();
      cards.push({
        Term: term,
        Definition: definition,
      });
    }
  });

  fetch('/Cards/Create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Cards: cards }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = '/Cards/Learning';
        return false;
      }
    });
}

function removeCard(event) {
  'use strict';
  let card = event.target.closest('.card');
  let removeCardIndex = card.querySelector('.card-counter').textContent;
  let cards = document.querySelectorAll('.cards > .card');
  cards = Array.from(cards);
  if (removeCardIndex !== '1' && cards.length !== 1) {
    card.remove();
    let updateCards = document.querySelectorAll('.cards > .card');
    let newCards = Array.from(updateCards);
    updateCardNumbers(removeCardIndex, newCards);
    saveCardsHTML();
  }
}

function updateCardNumbers(startIndex, cards) {
  'use strict';
  currentCardNumber = startIndex - 1;
  cards.slice(currentCardNumber).forEach((card, index) => {
    let cardCounter = card.querySelector('.card-counter');
    if (cardCounter) {
      cardCounter.textContent = parseInt(startIndex, 10) + index;
      currentCardNumber = parseInt(startIndex, 10) + index;
    }
  });
}

let deckForm = document.getElementById('deckForm');
deckForm.addEventListener('submit', function (event) {
  'use strict';
  event.preventDefault();
  saveCardDataToServer();
});

let newCard = document.querySelector('.new-card');
newCard.addEventListener('click', function () {
  'use strict';
  addCard();
});

document.querySelector('.cards').onclick = function (e) {
  'use strict';
  if (!e.target.classList.contains('button-bin')) {
    return;
  }
  removeCard(e);
};

window.onload = function () {
  'use strict';
  restoreCardsHTML();
};
window.onbeforeunload = function () {
  'use strict';
  saveCardsHTML();
};

/*localStorage.clear();*/
