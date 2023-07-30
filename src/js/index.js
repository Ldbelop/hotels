import { getHotels } from "./getHotels.js";

let arrayToRender;
let arrayOfHotels;
const cardGrid = document.querySelector(".card-grid");
console.log(cardGrid)

let countriesSelect = document.getElementById("countries");
let fromInput = document.getElementById("from");
let toInput = document.getElementById("to");
let pricesSelect = document.getElementById("prices");
let sizesSelect = document.getElementById("sizes");

let filterArray = []

const getHotelsWithAwait = async () => {
    arrayToRender = (await getHotels()).json()
    arrayToRender = await arrayToRender;
    arrayOfHotels = await arrayToRender;
}

await getHotelsWithAwait()

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
    if(arrayOfHotelsToModify.length < 1){
        document.getElementById("grid-message").style.display = 'block';
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
        console.log("event.target.value == 'ALL'")
        console.log(event.target.value == 'ALL')
        console.log("event.target.value")
        console.log(event.target.value)
        console.log("---------")
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
                console.log("hotel.availabilityFrom")
                console.log(hotel.availabilityFrom)
                console.log("Date.parse(filter)")
                console.log(Date.parse(filter)/1000.0)
                console.log(hotel.availabilityFrom <= (Date.parse(filter)/1000.0))
                return hotel.availabilityFrom <= (Date.parse(filter)/1000.0)
            })
            break
        case 'toDate':
            startingArray = startingArray.filter(hotel => {
                console.log("hotel.availabilityTo")
                console.log(hotel.availabilityTo)
                console.log("Date.parse(filter)")
                console.log(Date.parse(filter)/1000.0)
                console.log(hotel.availabilityTo <= (Date.parse(filter)/1000.0))
                return hotel.availabilityTo >= (Date.parse(filter)/1000.0)
            })
            break
        case 'price':
            startingArray = startingArray.filter(hotel => {
                console.log(filter)
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
