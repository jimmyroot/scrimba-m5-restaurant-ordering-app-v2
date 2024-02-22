import { cafe } from "../app/cafe"
import { footer } from "../layout/footer"

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
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">Order history</h3>
                    <div class="div-divider div-divider-accent"></div>
                </header>
                    ${renderOrderHistory()}
                </ul>
                <footer>
                    <button class="btn-modal-main" data-type="hide">Close</button>
                </footer>
            </div>
        `

        return html
    }

    const renderOrderHistory = () => {
        const orderHistory = cafe.getOrderHistory()

        let html = `<ul class="ul-order-history" id="ul-order-history">`

        html += orderHistory.map((order, index, arr) => {
            const isLastIter = ((index + 1) === arr.length)
            const starRating = []
            while (starRating.length < order.starRating) {
                starRating.push(`<i class="bx bxs-star"></i>`)
            }
            
            return `
                <li class="li-order-history">
                    <div class="div-space-between">
                            <p>${order.date}</p>
                            <p>£${order.total}</p>
                    </div>
                    <p>${order.items.map(item => item).join(', ')}</p>
                    <p>You thought this order was: ${starRating.map(star => star).join('')}</p>
                </li>
                ${isLastIter ? '' : '<div class="div-divider div-divider-accent"></div>'}
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
    node.classList.add('modal')
    node.id = 'modal-my-orders'

    return {
        get,
        show,
        hide,
        addEventListeners
    }
}

export const modalMyOrders = ModalMyOrders() 
