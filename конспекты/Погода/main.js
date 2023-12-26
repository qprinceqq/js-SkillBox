const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "213bd6c811237b5a0c7fc0722cf09588",
};

const dateBuilder = (d) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${date} ${month} ${year}, ${day}`;
};

const input = document.querySelector(".searchbar");
const container = document.querySelector(".location-container");
let store = {};
let city = localStorage.getItem("city") || "Ekaterinburg";

input.addEventListener("keyup", (e) => {
    const value = e.target.value;

    if (e.key === "Enter" && value) {
        city = value;
        localStorage.setItem("city", city);
        fetchData();
        e.target.value = "";
    }
});

const fetchData = async () => {
    getLoader();
    const response = await fetch(
        `${api.base}weather?q=${city}&appid=${api.key}`
    ).then((res) => res.json());
    const {name, weather, main: { temp }, sys: { country }, } = response;
    store = {
        name,
        weather: weather[0].main,
        temp: Math.round(temp - 273.15),
        country,
    };
    renderComponent();
};

const getLoader = () => {
    container.innerHTML = `<span class="loader"></span>`;
};

const renderComponent = () => {
    container.innerHTML = getContent();
};

const getContent = () => {
    const { name, weather, temp, country } = store;

    return `<div class="location-box">
    <div class="location">${name}, ${country}</div>
    <div class="date">${dateBuilder(new Date())}</div>
</div>
<div class="weather-box">
    <div class="temp">${temp} ℃</div>
    <div class="weather">${weather}</div>
</div>`;
};

fetchData();
