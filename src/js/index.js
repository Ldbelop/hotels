import { getHotels } from "./getHotels.js";

let arrayToRender;
let arrayOfHotels;
const cardGrid = document.querySelector(".card-grid");

let countriesSelect = document.getElementById("countries");
let fromInput = document.getElementById("from");
let toInput = document.getElementById("to");
let pricesSelect = document.getElementById("prices");
let sizesSelect = document.getElementById("sizes");
let clearButton = document.getElementById("clear-button");

let filterArray = [];

const getHotelsWithAwait = async () => {
    arrayToRender = (await getHotels()).json()
    arrayToRender = await arrayToRender;
    arrayOfHotels = await arrayToRender;
}

await getHotelsWithAwait()

const resetInputs = () => {
    countriesSelect.selectedIndex = 0;
    pricesSelect.selectedIndex = 0;
    sizesSelect.selectedIndex = 0;
    fromInput.value = ""
    fromInput.valueAsDate = null
    fromInput.valueAsNumber = NaN
    toInput.value = ""
    toInput.valueAsDate = null
    toInput.valueAsNumber = NaN
    filterArray = [];
    runFilters()
}

const changeText = (hotelsArray) => {
    const location = document.getElementById("hotels-location")
    const number = document.getElementById("hotels-number")
    const noHotelsMessage = document.getElementById("no-hotels")
    const checkHotelsMessage = document.getElementById("check-hotels")
    let foundCountry = filterArray.find(filter => {
        return filter.filterType == 'country'
    });

    if(foundCountry == undefined){
        location.innerText = "Latin America";
    } else{
        location.innerText = foundCountry.value;
    }

    number.innerText = hotelsArray.length;
    if(hotelsArray.length < 1){
        noHotelsMessage.style.display = "flex"
        checkHotelsMessage.style.display = "none"
    } else{
        checkHotelsMessage.style.display = "flex"
        noHotelsMessage.style.display = "none"
    }
}

const runFilters = () => {
    let arrayOfHotelsToModify = arrayOfHotels;
    if(filterArray.length < 1){
        arrayToRender = arrayOfHotels;
        deleteHotels()
        populateHotels()
    }
    filterArray.forEach(filter => {
        arrayOfHotelsToModify = filterList(filter.value, filter.filterType, arrayOfHotelsToModify)
    })
    
    changeText(arrayOfHotelsToModify)

    if(arrayOfHotelsToModify.length < 1){
        document.getElementById("grid-message").style.display = 'flex';
    } else{
        document.getElementById("grid-message").style.display = 'none';
    }
}

const applyFilters = (value, type) => {
    let foundEqual = false;
    filterArray.forEach((filter, index) => {
        if(filter.filterType == type){
            filterArray[index] = {
                filterType : type,
                value: value
            }
            foundEqual = true;
        }
    })
    if(foundEqual == false){
        filterArray.push({
            filterType : type,
                value: value
        })
    }

    runFilters()
}

const addListeners = () => {
    countriesSelect.addEventListener('change', (event) => {
        if(event.target.value == 'ALL'){
            filterArray.forEach((filter, index) => {
                if(filter.filterType == "country"){
                    filterArray.splice(index,1)
                }
            })
            runFilters()
        }
        else{
            const selectedCountry = event.target.value;
            applyFilters(selectedCountry, "country")
        }
    })

    fromInput.addEventListener('change', (event) => {
        const selectedFromDate = event.target.value;
        applyFilters(selectedFromDate, "fromDate")
    })

    toInput.addEventListener('change', (event) => {
        const selectedToDate = event.target.value;
        applyFilters(selectedToDate, "toDate")
    })

    pricesSelect.addEventListener('change', (event) => {
        if(event.target.value == 'ALL'){
            filterArray.forEach((filter, index) => {
                if(filter.filterType == 'price'){
                    filterArray.splice(index,1)
                }
            })
            runFilters()
        }else{
            const selectedPrice = event.target.value;
            applyFilters(selectedPrice, "price")
        }
    })

    sizesSelect.addEventListener('change', (event) => {
        if(event.target.value == 'ALL'){
            filterArray.forEach((filter, index) => {
                if(filter.filterType == 'size'){
                    filterArray.splice(index,1)
                }
            })
            runFilters()
        }
        else{
            const selectedSize = event.target.value;
            applyFilters(selectedSize, "size")
        }
    })

    clearButton.addEventListener('click', (event) => {
        resetInputs()
    })
}


addListeners()

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
    if(hotel.country == "Argentina"){
        countryFlag.setAttribute("src", "./src/assets/argentina.svg")
    } else if(hotel.country == "Brasil"){
        countryFlag.setAttribute("src", "./src/assets/brasil.svg")
    } else if(hotel.country == "Chile"){
        countryFlag.setAttribute("src", "./src/assets/chile.svg")
    } else if(hotel.country == "Uruguay"){
        countryFlag.setAttribute("src", "./src/assets/uruguay.svg")
    }
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
    hotelRooms.innerHTML = `${hotel.rooms} rooms - &nbsp`;
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

const deleteHotels = () => {
    const cardCollection = document.getElementsByClassName("hotelCard");
    const cardGrid = document.querySelector(".card-grid")

    const cardCollectionLength = cardCollection.length;
    for(let i = 0; i < cardCollectionLength; i++){
        cardGrid.removeChild(cardCollection[0])
    }
}

const filterList = (filter, type, startingArray) => {
    switch(type){
        case 'country':
            startingArray = startingArray.filter(hotel => {
                return hotel.country == filter
            })
            break
        case 'fromDate':
            startingArray = startingArray.filter(hotel => {
                return hotel.availabilityFrom <= (Date.parse(filter)/1000.0)
            })
            break
        case 'toDate':
            startingArray = startingArray.filter(hotel => {
                return hotel.availabilityTo >= (Date.parse(filter)/1000.0)
            })
            break
        case 'price':
            startingArray = startingArray.filter(hotel => {
                return hotel.price == filter
            })
            break
        case 'size':
            switch(filter){
                case 'S':
                    startingArray = startingArray.filter(hotel => {
                        return hotel.rooms <= 10
                    })
                    break
                case 'M':
                    startingArray = startingArray.filter(hotel => {
                        return hotel.rooms > 10 && hotel.rooms <= 20
                    })
                    break
                case 'L':
                    startingArray = startingArray.filter(hotel => {
                        return hotel.rooms > 20
                    })
            }
            break
    }

    arrayToRender = startingArray;
    deleteHotels()
    populateHotels()
    return startingArray
}

populateHotels()
resetInputs()
changeText(arrayOfHotels)