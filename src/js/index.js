import { getHotels } from "./getHotels.js";

let arrayToRender;
const cardGrid = document.querySelector(".card-grid");
console.log(cardGrid)

const getHotelsWithAwait = async () => {
    arrayToRender = (await getHotels()).json()
    arrayToRender = await arrayToRender;
}

await getHotelsWithAwait()

const checkPrice = (price) => {
    switch (price){
        case 1:
            return ' $';
            break;
        case 2:
            return ' $$';
            break;
        case 3:
            return ' $$$';
            break;
        case 4:
            return ' $$$$';
            break;
    }
}

console.log(checkPrice(3))

const fillCard = (hotel) => {
    const createdHotel = document.createElement('div');
    createdHotel.classList.add("hotelCard")
    cardGrid.appendChild(createdHotel)

    const imageContainer = document.createElement('div');
    imageContainer.classList.add("hotelCard__ImageContainer")
    imageContainer.setAttribute('style', `background-image: url(${hotel.photo})`)
    createdHotel.appendChild(imageContainer)

    // const hotelImage = document.createElement('img')
    // hotelImage.classList.add("imageContainer__Image")
    // hotelImage.setAttribute('src', hotel.photo)
    // imageContainer.appendChild(hotelImage)

    const countryDiv = document.createElement('div')
    countryDiv.classList.add("imageContainer__CountryContainer")
    imageContainer.appendChild(countryDiv)

    const countryFlag = document.createElement('img')
    countryFlag.classList.add("countryContainer__Flag")
    countryFlag.setAttribute("src", "placeholder")
    countryDiv.appendChild(countryFlag)

    const countryName = document.createElement('p')
    countryName.classList.add("countryContainer__CountryName")
    countryName.innerText = hotel.country;
    countryDiv.appendChild(countryName)

    const hotelDescription = document.createElement("p")
    hotelDescription.classList.add("imageContainer__HotelDescription")
    hotelDescription.innerText = hotel.description;
    imageContainer.appendChild(hotelDescription)

    const hotelName = document.createElement("h2")
    hotelName.classList.add("hotelCard__HotelName")
    hotelName.innerText = hotel.name;
    createdHotel.appendChild(hotelName)

    const hotelData = document.createElement("div")
    hotelData.classList.add("hotelCard__HotelData")
    createdHotel.appendChild(hotelData)

    const hotelRoomInfo = document.createElement("p")
    hotelRoomInfo.classList.add("hotelData__HotelRoomInfo")
    hotelData.appendChild(hotelRoomInfo)

    const hotelRooms = document.createElement("span")
    hotelRooms.classList.add("hotelRoomInfo_HotelRooms")
    hotelRooms.innerText = `${hotel.rooms} habitaciones -`;
    hotelRoomInfo.appendChild(hotelRooms)

    const hotelPrice = document.createElement("span")
    hotelPrice.classList.add("hotelRoomInfo__HotelPrice")
    hotelPrice.innerText = checkPrice(hotel.price);
    hotelRoomInfo.appendChild(hotelPrice)

    const bookItButton = document.createElement("button")
    bookItButton.classList.add("hotelRoomInfo__HotelButton")
    bookItButton.innerText = "Book It!"
    hotelData.appendChild(bookItButton)
}

const populateHotels = () => {
    arrayToRender.forEach(hotel => {
        fillCard(hotel)
    });
}

populateHotels()


const createImageContainer = (imgSrc, countryName, country) => {

}

