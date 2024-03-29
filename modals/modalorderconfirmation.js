// modalorderconfirmation.js
// -------------------------------------------------//
// Modal to show the order conrirmation and present //
// the interface for the star rating                //
// -------------------------------------------------//

import { cafe } from '../app/cafe'
import { stars } from '../components/stars'
import styles from './modal.module.css'
import orderStyles from './modalorderconfirmation.module.css'

const ModalOrderConfirmation = () => {
    
    // Use this function to add the event listeners. Use 'get()' first to append
    // this module's node to the DOM
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target, e.target.dataset.type)
        }
    )}

    const handleClick = (target, type) => {
        const execute = {
            hide: () => {
                cafe.archiveOrder()
                cafe.handleReset()
                hide()
            },
            star: () => {
                cafe.setCurrentStarRating(target.dataset.starId)
                refresh()
            }
        }

        if (type) execute[type]()
    }

    const render = () => {
        const basket = cafe.getBasket()
        const orderTotal = cafe.getOrderTotal()
        const numStars = cafe.getCurrentStarRating()

        // const html = document.createElement('div')
        let html = `
            <div class="${styles.inner}">
                <header class="${styles.header}">
                    <h3 class="${styles.title}">Thank you</h3>
                    <div class="${styles.divider}"></div>
                </header>
                <p class="${orderStyles.darker}">Your order is on it's way! Thank you for visiting. We hope to see you again.</p>
                <h4 class="${styles.subTitle}">Your order</h4>
                <ul class="${orderStyles.itemList} ${styles.overflow}" id="u-modal-order-complete-details">
        `

        // This needs to be changed to li
        html += basket.map(item => {
            
            const { name, price, count } = item 
            return `
                    <li class="${styles.rowSpaceBetween}">
                        <p>${count}x ${name}</p><p>£${(price * count).toFixed(2)}</p>
                    </li>
            `
        }).join('')

        html += `
                    <li>
                        <div class="${styles.divider}"></div>
                        <div class="${styles.total}">
                            <p>Total: ${cafe.renderDiscountStatus()}</p>
                            <p>£${orderTotal}</p>
                        </div>
                    </li>
                </ul>
                ${stars.get(numStars)}
                <footer class="${styles.footer}">
                    <button class="${styles.btnMain}" data-type="hide">Back to menu</button>
                </footer>
            </div>
        `

        return html
    }

    const get = () => {
        refresh()
        return node
    }

    const refresh = () => {
        node.innerHTML = render()
    }

    const show = () => {
        refresh()
        node.showModal()
    }

    const hide = () => {
        node.close()
    }

    // Init base node
    const node = document.createElement('dialog')
    node.className += styles.modal
    node.id = 'modal-order-confirmation'

    // Expose functions
    return {
        get,
        show,
        hide,
        addEventListeners
    }
}

export const modalOrderConfirmation = ModalOrderConfirmation()

