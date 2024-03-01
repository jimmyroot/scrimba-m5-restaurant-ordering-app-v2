// inner.js
// -----------------------------------------------------------//
// Small module that renders the inner container of the app   //
// -----------------------------------------------------------//

import styles from './inner.module.css'

const Inner = () => {

    const node = document.createElement('div')
    node.className += styles.inner
    node.id = 'div-app-inner'
    
    const get = () => {
        return node
    }

    return {
        get
    }

}

export const inner = Inner()