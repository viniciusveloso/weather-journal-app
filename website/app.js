/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=c168a9bf4a13260edff5c654ea047d0e&units=imperial';

// {zip code},{country code}&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/*****
 *  Gets current weather at given zip location using external API
 *****/

async function getWeather(zip) {
    const url = baseURL + zip + ',US' + apiKey; // works only for US ZIP Codes
    const res = await fetch(url);

    if (res.status != 200)
        throw res.statusText;
    try {
        const data = await res.json();
        return (data);
    } catch (e) {
        console.log('Error ---> ', e);
    }
}

async function postData(url = '', data = {}) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    // try {
    //     const newData = await response.json();
    //     console.log('NewData', newData);
    //     return newData;
    // } catch(error) {
    //     console.log("error", error);
    // }
}


async function retrieveData() {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const data = await request.json();
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temperature)} degrees`;
        document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
    }
    catch (error) {
        console.log("Error ---> ", error);
    }
}


document.getElementById('generate').addEventListener('click', evt => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zip && feelings) {
        getWeather(zip)
        .then(data => {
            postData('/weather', {temperature: data.main.temp, date: newDate, userResponse: feelings});
        })
        .then(() => {
            console.log('going to retrieve data');
            retrieveData();  
        })
        .catch(e => console.log('error --->', e));
    }
});

