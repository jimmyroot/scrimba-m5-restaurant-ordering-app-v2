// btnviewbasket.js
// -----------------------------------------------------------------//
// This module handles the 'View Basket' button on the main page    //
// -----------------------------------------------------------------//

import { modalViewBasket } from '../modals/modalviewbasket'
import styles from './btnviewbasket.module.css'

const BtnViewBasket = () => {

    // Use this function to add the event listeners. Use 'get()' first to append
    // this module's node to the DOM
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e.target.dataset.type)
        })
    }

    const handleClick = type => {
        const execute = {
            basket: () => {
                modalViewBasket.show()
            }
        }
        
        if (type) execute[type]()
    }

    // Render the button html; init with some defaults if
    // no arguments provided
    const render = (basket = [], total = "0.00") => {

        // Use the count property of each object in the basket to 
        // get the total count
        const itemCount = basket.length > 0 ? 
            basket.reduce((total, item) => {
                return total + item.count
            }, 0) :
            0
        
        const html = `
            <button class="${styles.button}" data-type="basket">
                <i class="bx bx-basket bx-lg"></i>
                <span class="${styles.count}">${itemCount}</span>
                <span>View basket</span>
                <span class="${styles.total}">£${total}</span>
            <button>
        `

        return html
    }

    const refresh = (basket, total) => {
        node.innerHTML = render(basket, total)
    }

    const get = () => {
        refresh()
        return node
    }

    const node = document.createElement('section')
    node.id = 'sec-btn-basket'

    return {
        get,
        addEventListeners,
        refresh
    }
}

export const btnViewBasket = BtnViewBasket()