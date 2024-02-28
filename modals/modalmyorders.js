import { cafe } from "../app/cafe"
import { footer } from "../layout/footer"
import styles from './modal.module.css'
import myOrdersStyles from './modalmyorders.module.css'

const ModalMyOrders = () => {

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target.dataset.type)
        })
    
        node.addEventListener('cancel', e => {
            e.preventDefault()
            hide()
        })
    }

    const handleClick = ( type ) => {
        const execute = {
            hide: () => {
                hide()
            }
        }

        if (type) execute[type]()
    }

    const render = () => {
        const html = `
            <div class="${styles.inner}">
                <header class="${styles.header}">
                    <h3 class="${styles.title}">Order history</h3>
                    <div class="${styles.divider}"></div>
                </header>
                    ${renderOrderHistory()}
                </ul>
                <footer class="${styles.footer}">
                    <button class="${styles.btnMain}" data-type="hide">Close</button>
                </footer>
            </div>
        `

        return html
    }

    const renderOrderHistory = () => {
        const orderHistory = cafe.getOrderHistory()

        let html = `<ul class="${myOrdersStyles.ul}" id="ul-order-history">`

        html += orderHistory.map((order, index, arr) => {
            const isLastIter = ((index + 1) === arr.length)
            const starRating = []
            while (starRating.length < order.starRating) {
                starRating.push(`<i class="bx bxs-star"></i>`)
            }
            
            return `
                <li class="${myOrdersStyles.li}">
                    <div class="${styles.total}">
                            <p>${order.date}</p>
                            <p>£${order.total}</p>
                    </div>
                    <p>${order.items.map(item => item).join(', ')}</p>
                    <p>You thought this order was: ${starRating.map(star => star).join('')}</p>
                </li>
                ${isLastIter ? '' : `<div class="${styles.divider}"></div>`}
            `
        })
        .join('')
        .concat('</ul>') 

        return html
    }

    const refresh = () => {
        node.innerHTML = render()
    }

    const show = () => {
        refresh()
        node.showModal() //Modify this with id of the modal
    }

    const hide = () => {
        node.close() //Modify this with id of the modal
        footer.handleSelectNav()
    }

    const get = () => {
        refresh()
        return node
    }

    // Modal scaffold
    const node = document.createElement('dialog')
    node.className += styles.modal
    node.id = 'modal-my-orders'

    return {
        get,
        show,
        hide,
        addEventListeners
    }
}

export const modalMyOrders = ModalMyOrders() 
