// footer.js
// ----------------------------------------------------------------//
// Contains footer functionality, renders the footer nav list and  //
// handles footer interaction                                      //
// ----------------------------------------------------------------//

import { modalDiscounts } from "../modals/modaldiscounts"
import { modalMyOrders } from "../modals/modalmyorders"
import styles from './footer.module.css'

const Footer = () => {

    // Use this function to add the event listeners. Use 'get()' first to append
    // this module's node to the DOM
    const addEventListeners = () => {
        node.addEventListener('click', e => {
            
            handleClick(e.target.dataset.type)
            
            // A little visual flourish when we click on each nav button
            if (e.target.tagName === 'BUTTON') handleSelectNav(e.target)
        })
    }

    const handleClick = type => {
        const execute = {
            orders: () => {
                modalMyOrders.show()
            },
            discounts: () => {
                modalDiscounts.show()
            }
        }

        if (type) execute[type]()
    }

    const render = () => {
        const html = `
            <ul class="${styles.navList}" id="ul-footer-nav">
                <li class="${styles.navItem}">
                    <button class="${styles.btn}">
                        <img class="${styles.avatar}" src="/assets/jimmy.png" alt="User avatar">
                        <span class="${styles.navText}">Account</span>
                    </button>
                </li>
                <li class="${styles.navItem}">
                    <button class="${styles.btn}" data-type="orders">
                        <i class='bx bx-receipt bx-lg'></i>
                        <span class="${styles.navText}">My Orders</span>
                    </button>
                </li>
                <li class="${styles.navItem}">
                    <button class="${styles.btn}" data-type="discounts">
                        <i class='bx bx-gift bx-lg'></i>
                        <span class="${styles.navText}">Discounts</span>
                    </button>
                </li>
                <li class="${styles.navItem}">
                    <button class="${styles.btn}">
                        <i class='bx bx-cog bx-lg'></i>
                        <span class="${styles.navText}">Settings</span>
                    </button>
                </li>
            </ul>
        `

        return html
    }

    const refresh = () => {
        node.innerHTML = render()
    }

    const get = () => {
        refresh()
        return node
    }

    const handleSelectNav = target => {
        const styleSelected = styles.selected
        const targetAlreadySelected = target ? target.classList.contains(styleSelected) : false
        node.querySelectorAll(`.${styleSelected}`).forEach(btn => btn.classList.remove(styleSelected))
        if (target && !targetAlreadySelected) target.classList.add(styleSelected)
    }

    // Init the node that will be returned by this module
    const node = document.createElement('footer')

    return {
        get,
        addEventListeners,
        handleSelectNav
    }
}

export const footer = Footer()

