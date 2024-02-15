import app from '../data/appState'
import * as helpers from '../helpers/helpers'

// Render function, only gets the html, doesn't actually put anything in the DOM, we do this 
// separately 
const getViewBasketBtnHtml = () => {
    return `
        <button class="btn btn-view-basket" id="btn-view-basket" data-type="basket">
            <i class="bx bx-basket bx-lg"></i>
            <span class="span-item-count">${app.basket.length}</span>
            <span>View basket</span>
            <span class="span-basket-total">£${helpers.getOrderTotal(app.basket, app.discountMultiplier)}</span>
        </button>
    `
}

// Updates already existing element in the DOM
const refreshViewBasketBtn = () => {
    document
        .getElementById('sec-btn-basket')
        .replaceWith(
            getViewBasketBtnHtml()
        )
}

// Create element and set id etc 
const btnViewBasket = document.createElement('section')
btnViewBasket.id = 'sec-btn-basket'
btnViewBasket.innerHTML = getViewBasketBtnHtml()

btnViewBasket.addEventListener('click', e => {
    const type = e.target.dataset.type
    if (type === 'basket') helpers.showModal(document.getElementById('modal-basket'), true)
})

export default btnViewBasket
export { refreshViewBasketBtn }