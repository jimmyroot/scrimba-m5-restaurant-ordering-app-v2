import { cafe } from "../app/cafe"
import { btnViewBasket } from "../components/btnviewbasket"
import { modalCheckout } from "./modalcheckout"

const ModalViewBasket = () => {

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target, e.target.dataset.type)
        })
    }

    const handleClick = ( target, type ) => {
        const execute = {
            checkout: () => {
                hide()
                modalCheckout.show()
            },
            hide: () => {
                hide()
            },
            remove: () => {
                cafe.removeFromBasket(target.dataset.instanceId)
                refresh()
                btnViewBasket.refresh()
            }
        }

        if (type) execute[type]()
    }

    const render = () => {

        const basket = cafe.getBasket()
        const discountMultiplier = cafe.getDiscountMultiplier()
        const orderTotal = cafe.getOrderTotal()

        let modalHtml = `
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">Your basket</h3>
                    <div class="div-divider div-divider-accent"></div>
                    <button class="btn-modal-close" id="btn-close-view-basket" data-type="hide">
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
                    <p>Total ${cafe.renderDiscountStatus()}:</p>
                    <p id="p-basket-total">£${orderTotal}</p>
                </div>
                <button class="btn-modal-main" id="btn-checkout" data-type="checkout"
                    ${basket.length > 0 ? '' : 'disabled'}
                >Checkout</button>
            </footer>
        </div>
        `)

        return modalHtml
    }

    const refresh = () => {
        node.innerHTML = render()
    }

    const get = () => {
        return node
    }

    const show = () => {
        refresh()
        node.showModal()
    }

    const hide = () => {
        node.close()
    }

    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-basket'

    return {
        get,
        show,
        hide,
        refresh,
        addEventListeners
    }
}

export const modalViewBasket = ModalViewBasket()