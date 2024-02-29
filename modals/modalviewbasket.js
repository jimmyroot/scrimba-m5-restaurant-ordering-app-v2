import { cafe } from '../app/cafe'
import { btnViewBasket } from '../components/btnviewbasket'
import { modalCheckout } from './modalcheckout'
import styles from './modal.module.css'
import basketStyles from './modalviewbasket.module.css' // Styles unique to this modal

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
            clear: () => {
                cafe.clearBasket()
                refresh()
            },
            add: () => {
                const idToAdd = +target.dataset.id
                cafe.addToBasket(idToAdd)
                refresh()
            },
            remove: () => {
                const idToRemove = +target.dataset.id
                cafe.removeFromBasket(idToRemove)
                refresh()
            }
        }
        
        if (type) execute[type]()
    }

    const render = () => {

        const basket = cafe.getBasket()
        const orderTotal = cafe.getOrderTotal()

        let modalHtml = `
            <div class="${styles.inner}">
                <header class="${styles.header}">
                    <h3 class="${styles.title}">Your basket</h3>
                    <div class="${styles.divider}"></div>
                    <button class="${styles.btnTopLeft}" id="btn-close-view-basket" data-type="clear"
                        ${basket.length > 0 ? '' : 'disabled'}>
                        <i class='bx bx-trash bx-md'></i>
                    </button>
                    <button class="${styles.btnTopRight}" id="btn-close-view-basket" data-type="hide">
                        <i class='bx bx-x bx-md'></i>
                    </button>
                </header>
                <ul class="${styles.overflow} ${basketStyles.itemList}" id="ul-basket-items">
        `
            
        modalHtml += basket.map((item, index, arr) => {

            const {name, ingredients, price, imageURL, id, count} = item
            const isLastIter = ((index + 1) === arr.length)

            return `
                <li class="${basketStyles.item}">
                    <img class="${basketStyles.img}" src="${imageURL}">
                    <div class="${basketStyles.details}">
                        <span class="${basketStyles.emphasis}">${count}x ${name}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           </span>
                        <span class="${basketStyles.aside}">
                            ${ingredients.map(ingredient => ingredient).join(', ')}
                        </span>
                        <span class="${basketStyles.emphasis}">£${price.toFixed(2)}</span>
                    </div>
                    <div class="${basketStyles.editItem}">
                        <button class="${basketStyles.btnSmall}" data-id="${id}" data-type="remove">
                            <i class='bx bx-minus'></i>
                        </button>
                        ${count}
                        <button class="${basketStyles.btnSmall}" data-id="${id}" data-type="add">
                            <i class='bx bx-plus'></i>
                        </button>
                    </div>
                </li>
                ${isLastIter ? '' : `<div class="${styles.divider}"></div>`}
            `
        })
        .join('')
        .concat(`
            </ul>
            <footer class="${styles.footer}">
                <div class="${styles.total}" id="div-basket-total">
                    <p>Total ${cafe.renderDiscountStatus()}:</p>
                    <p>£${orderTotal}</p>
                </div>
                <button class="${styles.btnMain}" id="btn-checkout" data-type="checkout"
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
    node.className += styles.modal
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