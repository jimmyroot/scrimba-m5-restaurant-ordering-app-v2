import { modalViewBasket } from '../modals/modalviewbasket'
import styles from './btnviewbasket.module.css'

const BtnViewBasket = () => {

    const addEventListeners = () => {
        node.addEventListener('click', e => {
            handleClick(e)
        })
    }

    const handleClick = e => {
        const execute = {
            basket: () => {
                modalViewBasket.show()
            }
        }
        
        const type = e.target.dataset.type
        if (type) execute[type]()
    }

    const render = (basket = [], total = "0.00") => {
        const itemCount = basket.length
        
        const html = `
            <button class="${styles['button']} data-type="basket">
                <i class="bx bx-basket bx-lg"></i>
                <span class="${styles['count']}">${itemCount}</span>
                <span>View basket</span>
                <span class="${styles['total']}">£${total}</span>
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