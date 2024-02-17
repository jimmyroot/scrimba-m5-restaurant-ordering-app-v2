import menuArray from "../data/menu"
import { menuList } from './menulist' 
const MenuFilter = () => {

    const node = document.createElement('section')
    node.classList.add('sec-menu-controls')

    const ul = document.createElement('ul')
    ul.classList.add('ul-menu-filter')
    ul.id = 'ul-menu-filter' // needed?

    // Renders the filter buttons according to existing categories from menuArray
    const renderFilterBtns = (defaultCategory) => {
        // Use spread along with new Set() to get an array of unique category values from which
        // we can build the list
        const filterCategories = [...new Set(menuArray.map(item => item.category))]
        // Render the buttons
        return filterCategories.map(category => {
            // Convert first letter to uppercase for the cateogry text
            const btnTxt = category.charAt(0).toUpperCase() + category.slice(1)
            const isSelected = category === defaultCategory ? 'selected' : ''
            return `
                <li class="li-menu-filter">
                    <button class="btn-filter-category ${isSelected}" data-type="selectFilterType" data-filter="${category}">${btnTxt}</button>
                </li>
            `
        }).join('')
    }

    // const refreshFilterBtns = () => {
    //     document
    //         .querySelector('#ul-menu-filter')
    //         .replaceChildren(
    //             renderFilterBtns()
    //         )
    // }

    // ---- TO REFACTOR ---- //
    const handleClick = (target) => {
        const handleOperation = {
            selectOrderType: () => {
                const id = target.dataset.id
                if (id) handleSelectOrderType(target)
            },
            selectFilterType: () => {
                const filter = target.dataset.filter
                if (filter) handleSelectFilter(target, filter)
            }
        }
    
        const type = target.dataset.type
        if (type) handleOperation[type]()
    }
    
    node.addEventListener('click', e => {
        if (e.target.dataset.type) handleClick(e.target)
    })
    
    const handleSelectOrderType = (target) => {
        document.querySelectorAll('.btn-order-type.selected').forEach(el => el.classList.remove('selected'))
        target.classList.add('selected')
    }
    
    const handleSelectFilter = (el, filter) => {
        document.querySelectorAll('.btn-filter-category.selected').forEach(el => el.classList.remove('selected'))
        el.classList.add('selected')
       menuList.refreshMenuList(filter)
        
    }
    // ---- END REFACTOR ---- //
    
    

    node.innerHTML = `
        <div class="div-order-type" id="div-order-type">
            <button class="btn-order-type" data-type="selectOrderType" data-id="togo">
                <i class="bx bx-coffee-togo bx-md"></i>
                Order to go
            </button>
            <button class="btn-order-type selected" data-type="selectOrderType" data-id="table">
                <i class="bx bx-qr-scan bx-md" ></i>
                Order to table
            </button>
        </div>
        
    `

    ul.innerHTML = renderFilterBtns('coffee')
    node.appendChild(ul)

    const getElement = () => {
        return node
    }

    return {
        getElement
    }
}

export const menuFilter = MenuFilter()