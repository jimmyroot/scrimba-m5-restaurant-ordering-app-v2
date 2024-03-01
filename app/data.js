import cafeLatte from '../images/cafe-latte.png'

const menuArray = [
    {
        name: "Café Latte",
        ingredients: ["Milk", "Espresso"],
        id: 0,
        price: 4.25,
        imageURL: "cafeLatte",
        category: "coffee"
    },
    {
        name: "Flat White",
        ingredients: ["Milk", "Double Espresso"],
        price: 3.75,
        imageURL: "/images/flat-white.png",
        id: 1,
        category: "coffee"
    },
    {
        name: "Black Americano",
        ingredients: ["Espresso", "H20"],
        price: 3.00,
        imageURL: "/images/black-americano.png",
        id: 2,
        category: "coffee"
    },
    {
        name: "Ham & Cheese Croissant",
        ingredients: ["Ham", "Cheese", "Wheat", "Butter"],
        price: 3.75,
        imageURL: "/images/ham-cheese.png",
        id: 3,
        category: "breakfast"
    },
    {
        name: "Bircher Muesli Bowl",
        ingredients: ["Oats", "Yoghurt", "Honey", "Apple", "Berries"],
        price: 4.65,
        imageURL: "/images/bircher.png",
        id: 4,
        category: "breakfast"
    },
    {
        name: "Egg, Bacon, Avocado Roll",
        ingredients: ["Wheat", "Eggs", "Bacon", "Avocado"],
        price: 6.75,
        imageURL: "/images/egg-avocado.png",
        id: 5,
        category: "breakfast"
    },
    {
        name: "Blueberry Muffin",
        ingredients: ["Wheat", "Sugar", "Blueberries", "Butter"],
        price: 2.95,
        imageURL: "/images/blueberry.png",
        id: 6,
        category: "cakes"
    },
    {
        name: "Almond Croissant",
        ingredients: ["Wheat", "Butter", "Almond Paste", "Sugar"],
        price: 2.35,
        imageURL: "/images/croissant.png",
        id: 7,
        category: "cakes"
    },
    {
        name: "Pastel De Nata",
        ingredients: ["Wheat", "Custard", "Sugar", "Eggs"],
        price: 2.95,
        imageURL: "/images/pastel-de-nata.png",
        id: 8,
        category: "cakes"
    },
    {
        name: "Ice Tea",
        ingredients: ["Tea", "Water", "Natural Flavourings", "Sugar"],
        price: 4.95,
        imageURL: "/images/ice-tea.png",
        id: 9,
        category: "other"
    },
    {
        name: "Green Tea",
        ingredients: ["Green Tea", "Water"],
        price: 2.45,
        imageURL: "/images/green-tea.png",
        id: 10,
        category: "other"
    },
    {
        name: "Sparkling Water",
        ingredients: ["Water", "Bubbles"],
        price: 1.95,
        imageURL: "/images/sparkling.png",
        id: 11,
        category: "other"
    }
]

export default menuArray

