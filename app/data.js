import urlCafeLatte from '../assets/cafe-latte.png'
import urlFlatWhite from '../assets/flat-white.png'
import urlBlackAmericano from '../assets/black-americano.png'   
import urlHamCheese from '../assets/ham-cheese.png'
import urlBircher from '../assets/bircher.png'
import urlEggAvocado from '../assets/egg-avocado.png'
import urlBlueberry from '../assets/blueberry.png'
import urlCroissant from '../assets/croissant.png'
import urlPastelDeNata from '../assets/pastel-de-nata.png'
import urlIceTea from '../assets/ice-tea.png'
import urlGreenTea from '../assets/green-tea.png'
import urlSparkling from '../assets/sparkling.png'

const menuArray = [
    {
        name: "Café Latte",
        ingredients: ["Milk", "Espresso"],
        id: 0,
        price: 4.25,
        imageURL: urlCafeLatte,
        category: "coffee"
    },
    {
        name: "Flat White",
        ingredients: ["Milk", "Double Espresso"],
        price: 3.75,
        imageURL: urlFlatWhite,
        id: 1,
        category: "coffee"
    },
    {
        name: "Black Americano",
        ingredients: ["Espresso", "H20"],
        price: 3.00,
        imageURL: urlBlackAmericano,
        id: 2,
        category: "coffee"
    },
    {
        name: "Ham & Cheese Croissant",
        ingredients: ["Ham", "Cheese", "Wheat", "Butter"],
        price: 3.75,
        imageURL: urlHamCheese,
        id: 3,
        category: "breakfast"
    },
    {
        name: "Bircher Muesli Bowl",
        ingredients: ["Oats", "Yoghurt", "Honey", "Apple", "Berries"],
        price: 4.65,
        imageURL: urlBircher,
        id: 4,
        category: "breakfast"
    },
    {
        name: "Egg, Bacon, Avocado Roll",
        ingredients: ["Wheat", "Eggs", "Bacon", "Avocado"],
        price: 6.75,
        imageURL: urlEggAvocado,
        id: 5,
        category: "breakfast"
    },
    {
        name: "Blueberry Muffin",
        ingredients: ["Wheat", "Sugar", "Blueberries", "Butter"],
        price: 2.95,
        imageURL: urlBlueberry,
        id: 6,
        category: "cakes"
    },
    {
        name: "Almond Croissant",
        ingredients: ["Wheat", "Butter", "Almond Paste", "Sugar"],
        price: 2.35,
        imageURL: urlCroissant,
        id: 7,
        category: "cakes"
    },
    {
        name: "Pastel De Nata",
        ingredients: ["Wheat", "Custard", "Sugar", "Eggs"],
        price: 2.95,
        imageURL: urlPastelDeNata,
        id: 8,
        category: "cakes"
    },
    {
        name: "Ice Tea",
        ingredients: ["Tea", "Water", "Natural Flavourings", "Sugar"],
        price: 4.95,
        imageURL: urlIceTea,
        id: 9,
        category: "other"
    },
    {
        name: "Green Tea",
        ingredients: ["Green Tea", "Water"],
        price: 2.45,
        imageURL: urlGreenTea,
        id: 10,
        category: "other"
    },
    {
        name: "Sparkling Water",
        ingredients: ["Water", "Bubbles"],
        price: 1.95,
        imageURL: urlSparkling,
        id: 11,
        category: "other"
    }
]

export default menuArray