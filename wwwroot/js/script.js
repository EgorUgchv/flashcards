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

    let termInput = document.querySelector('.term input');
    let definitionInput = document.querySelector('.definition input');

    const cardData = {
        term: termInput.value,
        definition: definitionInput.value,
    };
    currentCardNumber++;
    let newCardHTML = `
                    <div class="header d-flex justify-content-between p-3">
                        <h4 class="card-counter">${currentCardNumber}</h4>
                        <!--<img src="~/img/trash.svg" class="remove-card  img-fluid" height="40px" width="35px" alt="удалить карточку">-->
                    </div>
                    <div class="card-body row">
                        <div class="term col">
                            <h3>Термин</h3>
                            <input class="form-control w-100" asp-for="Cards[${currentCardNumber-1}].Term" placeholder="Введите термин">
                        </div>
                        <div class="definition col">
                            <h3>Определение</h3>
                            <input class="form-control w-100" asp-for="Cards[${currentCardNumber-1}].Definition" placeholder="Введите определение">
                        </div>
                    </div>
            </div> `;
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.classList.add('mt-3');
    newCard.innerHTML = newCardHTML;

    const binUrl = "/img/trash.svg";
    var img = new Image();
    img.classList.add("bin");
    img.classList.add("img-fluid");
    img.src = binUrl;

    let addImg = newCard.querySelector('.header');
    addImg.appendChild(img);

    let addNewCard = document.querySelector('.cards');
    let referenceNode = document.getElementById('create-cards');
    addNewCard.insertBefore(newCard, referenceNode);
    saveCardsHTML();
    saveCardDataToServer(cardData);
    updateCounter();
    
}

/*function saveCardDataToServer(cardData) {
    fetch('/Cards/Create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    })
        .then(Response => Response.json())
        .then((data => {
            console.log("Данные успешно сохранены: ", data);
        }))
        .then((error) => {
            console.error('Ошибка при отправке данных на сервере: ', error)
        })
}*/

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('.card');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addCard();
    });
});


window.onload = updateCounter;
localStorage.clear();

