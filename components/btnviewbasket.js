import { app } from '../data/app'
import * as helpers from '../helpers/helpers'
import { modalViewBasket } from '../modals/modalviewbasket'

const BtnViewBasket = () => {

    const renderBtnViewBasket = () => {
        const basket = app.getBasket()
        const discountMultiplier = app.getDiscountMultiplier()
        const itemCount = basket.length
        const orderTotal = app.getOrderTotal()
        return `
                <i class="bx bx-basket bx-lg"></i>
                <span class="span-item-count">${itemCount}</span>
                <span>View basket</span>
                <span class="span-basket-total">£${orderTotal}</span>
        `
    }

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            const type = e.target.dataset.type
            if (type === 'basket') modalViewBasket.show()
            //helpers.showModal(document.getElementById('modal-basket'), true)
        })
    }

    const refreshBtnViewBasket = () => {
        button.innerHTML = renderBtnViewBasket()
        document
            .getElementById('sec-btn-basket')
            .replaceChildren(
                button
            )
    }

    const getElement = () => {
        return node
    }

    const button = document.createElement('button')
    button.classList.add('btn', 'btn-view-basket')
    button.dataset.type = 'basket'
    button.innerHTML = renderBtnViewBasket()

    const node = document.createElement('section')
    node.id = 'sec-btn-basket'
    node.append(button)

    return {
        getElement,
        addEventListeners,
        refreshBtnViewBasket
    }
}

export const btnViewBasket = BtnViewBasket()