import { app } from "../data/app"
import { renderDiscountStatus } from "../helpers/helpers"
import { btnViewBasket } from "../components/btnviewbasket"

const ModalOrderConfirmation = () => {
    
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            const handleClick = {
                close: () => {
                    app.archiveOrder()
                    app.handleReset()
                    btnViewBasket.refreshBtnViewBasket()
                    hide()
                },
                star: () => {
                    app.setCurrentStarRating(e.target.dataset.starId)
                    refreshContent()
                }
            }
            const type = e.target.dataset.type
            if (type) handleClick[type]()
        }
    )}

    const renderContent = () => {
        const basket = app.getBasket()
        const discountMultiplier = app.getDiscountMultiplier()
        const orderTotal = app.getOrderTotal()
        const currentStarRating = app.getCurrentStarRating()

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
                        <p>Total: ${renderDiscountStatus(discountMultiplier)}</p>
                        <p>£${orderTotal}</p>
                    </div>
                </li>

                </ul>
                <div class="div-star-rating">
                    <h4 class="h4-modal">Rate your experience</h4>
                    <ul class="ul-star-rating" id="ul-star-rating">
                    ${renderStars(currentStarRating)}
                    </ul>
                </div>
                <footer>
                    <button class="btn-modal-main" data-type="close">Back to menu</button>
                </footer>
            </div>
        `

        return html
    }

    // Render the stars 
    const renderStars = (numStars) => {
        let starArr = []
        for (let star = 1; star <= 5; star++) {
            star <= numStars ? 
                starArr.push(`
                    <li class="li-star solid" data-type="star" data-star-id="${star}">
                        <i class="bx bxs-star"></i>
                    </li>
                `) : 
                starArr.push(`
                    <li class="li-star" data-type="star" data-star-id="${star}">
                        <i class="bx bxs-star" ></i>
                    </li>
                `)
        }
        return starArr.map(star => star).join('')
    }
        
    const get = () => {
        return node
    }

    const refreshContent = () => {
        node.innerHTML = renderContent()
    }

    const show = () => {
        refreshContent()
        document.querySelector('#modal-order-confirmation').showModal()
    }

    const hide = () => {
        document.querySelector('#modal-order-confirmation').close()
    }

    // Scaffold the modal
    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-order-confirmation'

    // Flesh it out
    refreshContent()

    return {
        get,
        addEventListeners,
        show,
        hide
    }
}

export const modalOrderConfirmation = ModalOrderConfirmation()

