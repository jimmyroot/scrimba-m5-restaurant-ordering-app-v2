import styles from './header.module.css'

const Header = () => {

    const render = () => {
        const html = `
            <img src="assets/logo.png" alt="The Cool Beans coffee shop logo, a circle with the leaves of a coffee plant in the middle">
            <h1 class="${styles.title}">Cool Beans</h1>
            <p class="${styles.tagline}">Coffee. Code. Hang</p>
            <p class="${styles.asides}">
            <a class="${styles.link}" href="#">
                <i class='bx bxs-star' ></i>
                4.8 (1,847)
            </a> • 
            No min. order • 
            <a class="${styles.link}" href="#">
                Allergen info
            </a>
            </p>
        `
        
        return html
    }

    const refresh = () => {
        node.innerHTML = render()
    }

    const get =  () => {
        refresh()
        return node
    }

    const node = document.createElement('header')
    node.className += styles.header

    return {
        get
    }

}

export const header = Header()