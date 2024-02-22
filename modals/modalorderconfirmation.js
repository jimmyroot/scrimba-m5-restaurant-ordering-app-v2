import { cafe } from "../app/cafe"
import { stars } from "../components/stars"

const ModalOrderConfirmation = () => {
    
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target, e.target.dataset.type)
        }
    )}

    const handleClick = ( target, type ) => {
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
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">Thank you</i></h3>
                    <div class="div-divider div-divider-accent"></div>
                </header>
                <p class="p-modal">Your order is on it's way! Thank you for visiting. We hope to see you again.</p>
                <h4 class="h4-modal">Your order</h4>
                <ul class="ul-order-confirmation overflow-thin-scrollbar" id="u-modal-order-complete-details">
        `

        // This needs to be changed to li
        html += basket.map(item => {
            return `
                    <div class="div-ordered-item">
                        <p>${item.name}</p><p>£${item.price.toFixed(2)}</p>
                    </div>
            `
        }).join('')

        html += `
                    <li>
                        <div class="div-divider div-divider-accent"></div>
                        <div class="div-space-between">
                            <p>Total: ${cafe.renderDiscountStatus()}</p>
                            <p>£${orderTotal}</p>
                        </div>
                    </li>
                </ul>
                ${stars.get(numStars)}
                <footer>
                    <button class="btn-modal-main" data-type="hide">Back to menu</button>
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

    // Modal scaffold
    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-order-confirmation'

    return {
        get,
        show,
        hide,
        addEventListeners
    }
}

export const modalOrderConfirmation = ModalOrderConfirmation()

