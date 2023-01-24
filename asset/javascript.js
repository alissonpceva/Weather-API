// current date 
// current time

var date = moment().format('ddd,MMMM do YYYY');
var currentTime = moment().format('YYYY-MM-DD HH:MM:SS')

// variable city history and save array with local storage

var cityHistory = [];
$('.search').on('click', function (event){
    event.preventDefault();
    city = $(this).parent('.btnSrc').sibling('.formInput').val().trim(); 
    if (city ===""){
        return;
    };
    cityHistory.push(city);

    localStorage.setItem('city',JSON.stringify(cityHistory));
    fiveForecastEL.empty();
    getHistory();
    getWeatherToday();
});
// search buttons based on history 

// today card

// five day forecast

// allows initial local weather as sample 