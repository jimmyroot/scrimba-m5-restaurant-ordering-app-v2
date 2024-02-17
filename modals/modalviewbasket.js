import { app } from "../data/app"
import { btnViewBasket } from "../components/btnviewbasket"
import { modalCheckout } from "./modalcheckout"
import { renderDiscountStatus, getOrderTotal } from "../helpers/helpers"

const ModalViewBasket = () => {

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            const handleClick = {
                checkout: () => {
                    hide()
                    modalCheckout.show()
                },
                close: () => {
                    hide()
                },
                remove: () => {
                    app.removeFromBasket(e.target.dataset.instanceId)
                    refreshBasket()
                    btnViewBasket.refreshBtnViewBasket()
                }
            }
            
            const type = e.target.dataset.type
            if (type) handleClick[type]()
        })
    }

    const renderContent = () => {

        const basket = app.getBasket()
        const discountMultiplier = app.getDiscountMultiplier()

        let modalHtml = `
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">Your basket</h3>
                    <div class="div-divider div-divider-accent"></div>
                    <button class="btn-modal-close" id="btn-close-view-basket" data-type="close">
                        <i class='bx bx-x bx-md'></i>
                    </button>
                </header>
                <ul class="ul-order overflow-thin-scrollbar" id="ul-basket-items">
        `
            
        modalHtml += basket.map((item, index, arr) => {
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
        })
        .join('')
        .concat(`
            </ul>
            <footer>
                <div class="div-space-between" id="div-basket-total">
                    <p>Total ${renderDiscountStatus(discountMultiplier)}:</p>
                    <p id="p-basket-total">£${getOrderTotal(basket, discountMultiplier)}</p>
                </div>
                <button class="btn-modal-main" id="btn-checkout" data-type="checkout"
                    ${basket.length > 0 ? '' : 'disabled'}
                >Checkout</button>
            </footer>
        </div>
        `)

        return modalHtml
    }

    // Whenever calling this you should also call refreshBtnViewBasket
    // from the relevant module
    const refreshBasket = () => {
        node.innerHTML = renderContent()
    }

    const getElement = () => {
        return node
    }

    const show = () => {
        refreshBasket()
        document.querySelector('#modal-basket').showModal()
    }

    const hide = () => {
        document.querySelector('#modal-basket').close()
    }

    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-basket'

    // const ul = document.createElement('ul')
    // ul.classList.add('ul-order', 'overflow-thin-scrollbar')
    // ul.id = 'ul-basket-items'

    refreshBasket()

    return {
        getElement,
        addEventListeners,
        show,
        hide,
        refreshBasket
    }
}

export const modalViewBasket = ModalViewBasket()