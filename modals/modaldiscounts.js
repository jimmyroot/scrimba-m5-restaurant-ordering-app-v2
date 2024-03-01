// modaldiscounts.js
// ---------------------------------------------------//
// Simple modal that shows available discount codes   //
// ---------------------------------------------------//

import { cafe } from '../app/cafe'
import { footer } from '../layout/footer'
import styles from './modal.module.css'
import discountStyles from './modaldiscounts.module.css'


const ModalDiscounts = () => { 

    // Use this function to add the event listeners. Use 'get()' first to append
    // this module's node to the DOM
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target.dataset.type)
        })
    
        node.addEventListener('cancel', e => {
            e.preventDefault()
            hide()
        })
    }

    const handleClick = type => {
        const execute = {
            hide: () => {
                hide()
            }
        }

        if (type) execute[type]()
    }

    const render = () => {
        let html = `
            <div class="${styles.inner}">
                <header class="${styles.header}">
                    <h3 class="${styles.title}">For you <i class='bx bxs-donate-heart bx-lg'></i></h3>
                    <div class="${styles.divider}"></div>
                </header>
                ${renderDiscounts()}
                <footer class="${styles.footer}">
                    <button class="${styles.btnMain}" data-type="hide">Close</button>
                </footer>
            </div>
        `

        return html
    }

    const renderDiscounts = () => {
        const discountCodes = cafe.getDiscountCodes()

        let html = `
            <ul class="${discountStyles.discountsList}" id="ul-discounts">
        `

        html += Object.entries(discountCodes).map((obj, index, arr) => {
            const isLastIter = ((index + 1) === arr.length)
            const percentage = (100-(obj[1] / 1 * 100))
            return `
                <li>
                    <p>Enjoy ${percentage}% off with code <span class="${discountStyles.discount}">${obj[0]}</span></p>
                </li>
                ${isLastIter ? '' : `<div class="${styles.divider}"></div>`}
            `
        }).join('').concat('</ul>')

        return html
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
        footer.handleSelectNav()
    }

    const get = () => {
        refresh()
        return node
    }

    // Init base node
    const node = document.createElement('dialog')
    node.className += styles.modal
    node.id = 'modal-discounts'

    // Expose functions
    return {
        get,
        show,
        hide,
        addEventListeners
    }
}

export const modalDiscounts = ModalDiscounts() 
