import appState from "../data/appState"
import * as helpers from '../helpers/helpers'
// import { refreshViewBasketBtn } from "../components/btnviewbasket"

const modalViewBasket = document.createElement('dialog')
modalViewBasket.classList.add('modal')
modalViewBasket.id = 'modal-basket'

modalViewBasket.innerHTML = `
    <div class="modal-inner">
        <header>
            <h3 class="modal-title">Your basket</h3>
            <div class="div-divider div-divider-accent"></div>
            <button class="btn-modal-close" id="btn-close-view-basket" data-type="close">
                <i class='bx bx-x bx-md'></i>
            </button>
        </header>
        <ul class="ul-order overflow-thin-scrollbar" id="ul-basket-items">
            
        </ul>
        <footer>
            <div class="div-space-between" id="div-basket-total">
                
            </div>
            <button class="btn-modal-main" id="btn-checkout" data-type="checkout">Checkout</button>
        </footer>
    </div>
`

const refreshBasket = (basket) => {

    console.log('fired')

    // Generate html for items in basket
    const htmlBasket = basket.map((item, index, arr) => {
        const {name, ingredients, price, imageURL, instanceId} = item
        const isLastIter = ((index + 1) === arr.length)
        return `
            <li class="li-menu-item">
                <img class="img-item" src="${imageURL}">
                <div>
                    <span class="spn-item-name">${name}</span>
                    <span class="spn-item-dets">
                        ${ingredients.map(ingredient => ingredient).join(', ')}
                    </span>
                    <span class="spn-item-dets">£${price.toFixed(2)}</span>
                </div>
                <button class="btn-remove" data-instance-id="${instanceId}" data-type="remove">
                    <i class='bx bx-minus bx-sm'></i>
                </button>
            </li>
            ${isLastIter ? '' : '<div class="div-divider div-divider-accent"></div>'}
        `
    }).join('')

    // Create the html for the basket total. Use our renderDiscountStatus to show
    // if the user has used a discount code 
    //     <p>Total ${renderDiscountStatus(appState.discountMultiplier)}:</p>
    //     <p id="p-basket-total">£${getOrderTotal(basket)}</p>
    // `

    // Render the basket contents and total amount in respective elements

    // document.getElementById('ul-basket-items').innerHTML = htmlBasket
    // document.getElementById('div-basket-total').innerHTML = htmlTotal
    
    // Set the checkout button to disabled if the basket is empty, or vice versa
    
    // When the basket is rendered we need to update the button on the main page, so we
    // may as well do that here
    // refreshViewBasketBtn()
}

export default modalViewBasket
export { refreshBasket }

//    helpers.enableButtons([document.getElementById('btn-checkout')], basket.length > 0)
