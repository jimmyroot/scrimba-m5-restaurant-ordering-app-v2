import { modalDiscounts } from "../modals/modaldiscounts"
import { modalMyOrders } from "../modals/modalmyorders"
import styles from './footer.module.css'

const Footer = () => {

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            
            handleClick(e)
            
            // A little visual flair when we click on each nav button
            if (e.target.tagName === 'BUTTON') handleSelectNav(e.target)
        })
    }

    const handleClick = (e) => {
        const execute = {
            orders: () => {
                modalMyOrders.show()
            },
            discounts: () => {
                modalDiscounts.show()
            }
        }

        const type = e.target.dataset.type
        if (type) execute[type]()
    }

    const render = () => {
        const html = `
            <ul class="${styles.nav}" id="ul-footer-nav">
                <li class="li-footer-nav">
                    <button class="btn-footer-nav">
                        <img class="${styles['avatar']}" src="/assets/jimmy.png" alt="User avatar">
                        <span>Account</span>
                    </button>
                </li>
                <li class="li-footer-nav">
                    <button class="btn-footer-nav" data-type="orders">
                        <i class='bx bx-receipt bx-lg'></i>
                        <span>My Orders</span>
                    </button>
                </li>
                <li class="li-footer-nav">
                    <button class="btn-footer-nav" data-type="discounts">
                        <i class='bx bx-gift bx-lg'></i>
                        <span>Discounts</span>
                    </button>
                </li>
                <li class="li-footer-nav">
                    <button class="btn-footer-nav">
                        <i class='bx bx-cog bx-lg'></i>
                        <span>Settings</span>
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

    // This function is private to the module...does it work? 
    const handleSelectNav = target => {
        const styleSelected = styles['selected']
        const targetAlreadySelected = target ? target.classList.contains(styleSelected) : false
        node.querySelectorAll(`.${styleSelected}`).forEach(btn => btn.classList.remove(styleSelected))
        if (target && !targetAlreadySelected) target.classList.add(styleSelected)
    }

    const node = document.createElement('footer')

    return {
        get,
        addEventListeners,
        handleSelectNav
    }
}

export const footer = Footer()

