import styles from './stars.module.css'

const Stars = () => {

    // Init
    let starsToRender = null
    
    const render = () => {
        let html = `
            <div class="${styles.stars}">
                <h4 class="${styles.subTitle}">Rate your experience</h4>
                <ul class="${styles.ul}" id="ul-star-rating">
        `

        html += renderStars()

        html += `
                </ul>
            </div>
        `

        return html
    }

    const renderStars = () => {
        let starArr = []

        for (let star = 1; star <= 5; star++) {
            star <= starsToRender ?
                starArr.push(`
                    <li class="${styles.fullStar}" data-type="star" data-star-id="${star}">
                        <i class="bx bxs-star"></i>
                    </li>
                `) : 
                starArr.push(`
                    <li class="${styles.hollowStar}" data-type="star" data-star-id="${star}">
                        <i class="bx bxs-star" ></i>
                    </li>
                `)
            }

         // Return the list of <li> stars
        return starArr.map(star => star).join('')
    }


    // This works a little differently to the other modules, it returns only html, not a node
    const get = ( numStars ) => {
        starsToRender = numStars
        return render()
    }

    return {
        get
    }
}

export const stars = Stars()