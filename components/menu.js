import { menuFilter } from './menufilter'
import { menuList } from './menulist'

const menu = document.createElement('main')

menu.classList.add('main')
menu.id = 'main'

menu.appendChild(menuFilter.getElement())
menu.appendChild(menuList.getElement())

menuList.addEventListeners()

export default menu