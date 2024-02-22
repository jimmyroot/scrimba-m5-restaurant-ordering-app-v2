const Inner = () => {

    const node = document.createElement('div')
    node.classList.add('div-app-inner')
    node.id = 'div-app-inner'
    
    const get = () => {
        return node
    }

    return {
        get
    }

}

export const inner = Inner()