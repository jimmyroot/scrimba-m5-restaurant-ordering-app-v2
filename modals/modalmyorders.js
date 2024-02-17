import { app } from "../data/app"

const ModalMyOrders = () => { // Change this to your modal name

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            // Do something with 'e'
        }
    )}

    const renderContent = () => {
        const html = `
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">Order history</h3>
                    <div class="div-divider div-divider-accent"></div>
                </header>
                <ul class="ul-order-history" id="ul-order-history">
                    ${renderOrderHistory()}
                </ul>
                <footer>
                    <button class="btn-modal-main" data-type="close">Close</button>
                </footer>
            </div>
        `
        return html
    }

    const renderOrderHistory = () => {
        const orderHistory = app.getOrderHistory()

        const html = orderHistory.map((order, index, arr) => {
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
        }).join('')

        return html
    }

    const refreshContent = () => {
        node.innerHTML = renderContent()
    }

    const show = () => {
        refreshContent()
        document.querySelector('#modal-my-orders').showModal() //Modify this with id of the modal
    }

    const hide = () => {
        document.querySelector('#modal-my-orders').close() //Modify this with id of the modal
    }

    // Call this function to add your modal to the DOM, like...
    // document.querySelector('element-you'll-append-modal-to).appendChild(modal.getElement())
    const getElement = () => {
        refreshContent()
        return node
    }

    // Scaffold the modal
    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-my-orders'

    // Fill it with anything if it exists, although this is kinda pointless
    // as we'll call refreshContent when we 'show' the modal anyway...so guess
    // we dont' actually need this...it just seems 'complete' haha. I'm weird.
    refreshContent()

    return {
        getElement,
        addEventListeners,
        show,
        hide
    }
}

// Modify this with the name of the modal
// Export the modal as an instance of the main function, 
// basically it's a class just without the 'class' keyword
export const modalMyOrders = ModalMyOrders() 
