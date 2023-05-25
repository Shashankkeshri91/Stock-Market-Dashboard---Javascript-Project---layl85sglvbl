const API_KEY = "MPC52ZYBPWS0HSTW"
const BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_"
const MIDDLE_URL = "&symbol="
const URL_SUFFIX = "&interval=5min&apikey=" + API_KEY

function getFiveMinutesEarlier(time) {
  const [hours, minutes, seconds] = time.split(':');

  const currentHours = parseInt(hours, 10);
  const currentMinutes = parseInt(minutes, 10);
  const currentSeconds = parseInt(seconds, 10);

  const totalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;

  const newTotalSeconds = totalSeconds - 300;

  const newHours = Math.floor(newTotalSeconds / 3600);
  const remainingSeconds = newTotalSeconds % 3600;
  const newMinutes = Math.floor(remainingSeconds / 60);
  const newSeconds = remainingSeconds % 60;

  const formattedHours = ('0' + newHours).slice(-2);
  const formattedMinutes = ('0' + newMinutes).slice(-2);
  const formattedSeconds = ('0' + newSeconds).slice(-2);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

console.log("getFiveMinutesEarlier => ", getFiveMinutesEarlier("19:40:00"));

let wishList = new Map();


function fetchAPIExample() {
  let result = ""

  let selectButton = document.getElementById("timeframe-select").value;
  let search = document.getElementById("search-field").value;

  if (search != "" && search != undefined && search != null) {
    wishList.set(search, selectButton);
  }

  for (let [key, value] of wishList) {
    let URL = BASE_URL + value + MIDDLE_URL + key + URL_SUFFIX;
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let lastRef = data["Meta Data"]["3. Last Refreshed"]
        let stockPrice = data[returnValueMeta(value)][lastRef]["4. close"]
        result += `<tr onclick="showDeatil()">
        <td><h5>${key}</h5></td>
        <td><span class="badge badge-pill badge-success card">${stockPrice}</span></td>
        <td><span class="badge badge-pill badge-light card">${value}</span></td>
        <td><button type="button" class="btn-close rounded-pill" onclick="removeItem('` + key + `')"></button></td>
      </tr>`
      })
      .then(res => {
        console.log(result);
        document.getElementById("wishlist").innerHTML = result;
      })
      .catch(error => {
        console.log(error);
      })
  }
}

function removeItem(key) {
  wishList.delete(key);
  fetchAPIExample()
}

function returnValueMeta(key) {
  console.log("KEY = ", key);
  if (key === "INTRADAY") {
    return "Time Series (5min)"
  } else if (key === "DAILY") {
    return "Daily Time Series"
  } else if (key === "MONTHLY") {
    return "Monthly Time Series"
  } else {
    return "Weekly Time Series"
  }
}

function showDeatil() {
  
}