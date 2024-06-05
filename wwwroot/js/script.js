var currentCardNumber = 1;
let newCardHTML = `
                                                                    <div class="card mt-4">
                                                                        <h4 class="card-counter ps-3 pt-2">${currentCardNumber}</h4>
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
                                                                    </div>
                                                            `;

function updateCounter() {
    var count = document.getElementsByClassName('card').length;
    document.getElementById('card-counter').textContent = 'Количество карт: ' + count;
}

function saveCardsHTML() {
    let cardsContainer = document.querySelector('.cards');
    let cardsHTML = cardsContainer.innerHTML;

    sessionStorage.setItem('cardsHTML', cardsHTML);
}

function restoreCardsHTML() {
    let cardsHTML = sessionStorage.getItem('cardsHTML');
    if (cardsHTML) {
        let cardsContainer = document.querySelector('.cards');
        cardsContainer.innerHTML = cardsHTML;
    }
}

function addCard() {
    currentCardNumber++;
    let newCardHTML = `
               <div class="card mt-3" id="card">
                    <div class="header d-flex justify-content-between p-3">
                        <h4 class="card-counter">${currentCardNumber}</h4>
                        <img src="~/img/trash.svg" class="remove-card  img-fluid" height="40px" width="35px" alt="удалить карточку">
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

    let addNewCard = document.querySelector('.cards');
    let referenceNode = document.getElementById('create-cards');
    addNewCard.insertBefore(newCard, referenceNode);

    /*let addNewCard = document.querySelector('.cards');
    addNewCard.appendChild(newCard);*/

    updateCounter();
    localStorage.setItem('newCard', newCardHTML);

}

document.querySelector(".delete-card").click(ajax_request);

window.onload = updateCounter;
window.onload = restoreCardsHTML;
window.onbeforeunload = saveCardsHTML;

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('.new-card');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addCard();
    });
});
                           