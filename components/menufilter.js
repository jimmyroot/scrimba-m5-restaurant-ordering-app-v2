import menuArray from "../data/menu"
import * as menuList from './menulist'

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

const menuFilter = document.createElement('section')

menuFilter.classList.add('sec-menu-controls')

menuFilter.innerHTML = `
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
        <ul class="ul-menu-filter" id="ul-menu-filter">
            ${renderFilterBtns('coffee')}
        </ul>
`

menuFilter.addEventListener('click', e => {
    if (e.target.dataset.type) handleClick(e.target)
})


const handleSelectOrderType = (target) => {
    document.querySelectorAll('.btn-order-type.selected').forEach(el => el.classList.remove('selected'))
    target.classList.add('selected')
}

const handleSelectFilter = (el, filter) => {
    document.querySelectorAll('.btn-filter-category.selected').forEach(el => el.classList.remove('selected'))
    el.classList.add('selected')
    document.getElementById('sec-menu-list').replaceWith(menuList.renderMenu(filter))
    // Can we somehow signify to the importing module that it should re-render the menu? Without having to import render menu?
}

export default menuFilter