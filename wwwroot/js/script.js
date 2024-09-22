var currentCardNumber = 1;

function updateCounter() {
    var count = document.getElementsByClassName('card').length;
    document.getElementById('card-counter').textContent = 'Количество карт: ' + count;
}

function saveCardsHTML() {
    let cardsContainer = document.querySelector('.cards');
    let cardsHTML = cardsContainer.innerHTML;
    localStorage.setItem('cardsHTML', cardsHTML);
}

function restoreCardsHTML() {
    let cardsHTML = localStorage.getItem('cardsHTML');
    if (cardsHTML) {
        let cardsContainer = document.querySelector('.cards');
        cardsContainer.innerHTML = cardsHTML;
    }
}

function addCard() {
    currentCardNumber++;

    let baseUrl = document.getElementById("firstCard").getAttribute("href");
    let deleteCardUrl = baseUrl.replace('0',(currentCardNumber-1).toString());
    let newCardHTML = `
                    <div class="header d-flex justify-content-between p-3">
                        <h4 class="card-counter">${currentCardNumber}</h4>
                        <a class="button-bin btn"  id = "bin${currentCardNumber}"></a>
                    </div>
                    <div class="card-body row">
                        <div class="term col">
                            <h3>Термин</h3>
                            <input class="form-control w-100" name = "term" placeholder="Введите термин">
                        </div>
                        <div class="definition col">
                            <h3>Определение</h3>
                            <input class="form-control w-100" name="definition" placeholder="Введите определение">
                        </div>
                    </div>
            </div> `;
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.classList.add('mt-3');
    //TODO: Remove innerhtml and rewrite using WebApi
    newCard.innerHTML = newCardHTML;
/*
    const binUrl = "/img/trash.svg";
    var img = new Image();
    img.classList.add("bin");
    img.classList.add("img-fluid");
    img.src = binUrl;

    let addImg = newCard.querySelector('.header');
    addImg.appendChild(img);*/

    let addNewCard = document.querySelector('.cards');
    let referenceNode = document.getElementById('create-cards');
    addNewCard.insertBefore(newCard, referenceNode);
    saveCardsHTML();
    updateCounter();

}

function saveCardDataToServer() {
    let cards = [];
    document.querySelectorAll('.cards > .card   ').forEach((card) => {

        let termInput = card.querySelector('input[name="term"]');
        let definitionInput = card.querySelector('input[name="definition"]');

        if (termInput && definitionInput) {
            let term = termInput.value.trim();
            let definition = definitionInput.value.trim();
            cards.push({
                Term: term,
                Definition: definition
            });
        } else {
            console.error("Input elements not found in card:", card);
        }
    })

    fetch('/Cards/Create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Cards: cards})
    })
        .then(response => response.json())
        .then((data => {
            if (data.success) {
                console.log("Data successfully saved: ", data);
                window.location.href = "/Cards/Learning";
                return false;
            } else {
                console.error("Error saving card: ", data.message);
            }
        }))
}

function removeCard(){
    let removeCard = this.parentElement.parentElement;
    removeCard.remove();
}


document.addEventListener('DOMContentLoaded', function () {
    let newCard = document.querySelector('.new-card');
    newCard.addEventListener('click', function () {
        addCard();
    });
    
    document.getElementById('deckForm').addEventListener('submit', function (event) {
        event.preventDefault();
        saveCardDataToServer();
    });
    document.querySelector('.cards').onclick = function(e){
        if(!e.target.classList.contains('button-bin')) return;
        let card = e.target.closest('.card');
        card.remove();
    }
});
/*    let remove = document.querySelectorAll('.button-bin');
    remove.forEach(card => {
        card.addEventListener('click', removeCard);
    })  */
/*
    let remove = document.getElementById(`bin${currentCardNumber}`);
*/






/*window.onload = function (){restoreCardsHTML();};*/
window.onbeforeunload = function (){ saveCardsHTML();};

/*localStorage.clear();*/
