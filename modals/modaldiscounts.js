import { app } from "../data/app"
import { footer } from "../layout/footer"

const ModalDiscounts = () => { // Change this to your modal name

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            const handleClick = {
                close: () => {
                    hide()
                }
            }

            const type = e.target.dataset.type
            if (type) handleClick[type]()
        })
    
        node.addEventListener('cancel', e => {
            e.preventDefault()
            hide()
        })
    }

    const renderContent = () => {
        let html = `
            <div class="modal-inner">
                <header>
                    <h3 class="modal-title">For you <i class='bx bxs-donate-heart bx-lg' ></i></h3>
                    <div class="div-divider div-divider-accent"></div>
                </header>
                ${renderDiscounts()}
                <footer>
                    <button class="btn-modal-main" data-type="close">Close</button>
                </footer>
            </div>
        `
        return html
    }

    const renderDiscounts = () => {
        const discountCodes = app.getDiscountCodes()

        let html = `
            <ul class="ul-discounts" id="ul-discounts">
        `

        html += Object.entries(discountCodes).map((obj, index, arr) => {
            const isLastIter = ((index + 1) === arr.length)
            const percentage = (100-(obj[1] / 1 * 100))
            return `
                <li class="li-discount-code">
                    <p>Enjoy ${percentage}% off with code <span class="spn-code">${obj[0]}</span></p>
                </li>
                ${isLastIter ? '' : '<div class="div-divider div-divider-accent"></div>'}
            `
        }).join('').concat('</ul>')

        return html
    }

    const refreshContent = () => {
        node.innerHTML = renderContent()
    }

    const show = () => {
        refreshContent()
        document.querySelector('#modal-discounts').showModal() //Modify this with id of the modal
    }

    const hide = () => {
        document.querySelector('#modal-discounts').close() //Modify this with id of the modal
        footer.handleSelectNav()
    }

    // Call this function to add your modal to the DOM, like...
    // document.querySelector('element-you'll-append-modal-to).appendChild(modal.getElement())
    const get = () => {
        refreshContent()
        return node
    }

    // Scaffold the modal
    const node = document.createElement('dialog')
    node.classList.add('modal')
    node.id = 'modal-discounts'

    return {
        get,
        show,
        hide,
        addEventListeners
    }
}

export const modalDiscounts = ModalDiscounts() 
