export async function getHotels(){
    const API_URL = 'https://6256097e8646add390e01d99.mockapi.io/hotels/reservation/hotels';
    return fetch(API_URL, { method: 'GET'})
}