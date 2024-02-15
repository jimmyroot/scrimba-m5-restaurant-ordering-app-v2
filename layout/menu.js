import menuFilter from "./menufilter"

const menu = document.createElement('main')

menu.classList.add('main')
menu.id = 'main'
menu.appendChild(menuFilter)

export default menu