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

function addBin() {
    const binUrl = "/img/trash.svg";
    var img = new Image();
    img.classList.add("bin");
    img.classList.add("img-fluid");
    img.src = binUrl;
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
                            <input class="form-control w-100" asp-for="Term" placeholder="Введите термин">
                        </div>
                        <div class="definition col">
                            <h3>Определение</h3>
                            <input class="form-control w-100" asp-for="Definition" placeholder="Введите определение">
                        </div>
                    </div>
            </div> `;
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.classList.add('mt-3');
    newCard.innerHTML = newCardHTML;

    addBin();

    let addImg = newCard.querySelector('.header');
    addImg.appendChild(img);

    let addNewCard = document.querySelector('.cards');
    let referenceNode = document.getElementById('create-cards');
    addNewCard.insertBefore(newCard, referenceNode);

    saveCardDataToServer(cardData);
    updateCounter();
    saveCardsHTML();
}

function saveCardDataToServer(cardData) {

}

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('.new-card');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        addCard();
    });
});


window.onload = updateCounter;

localStorage.clear();

