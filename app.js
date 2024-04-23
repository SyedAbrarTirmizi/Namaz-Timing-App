document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("showdata").innerHTML = "";
  let cityName = document.getElementById("cityName").value;

  const validCities = [
    "karachi",
    "lahore",
    "islamabad",
    "quetta",
    "faisalabad",
    "multan",
    "rawalpindi",
    "peshawar",
    "hyderabad",
    "gujranwala",
    "bahawalpur",
    "sargodha",
    "sialkot",
    "sukkur",
    "jhang",
    "mardan",
    "larkana",
    "sheikhupura",
  ];

  if (!validCities.includes(cityName)) {
    document.getElementById("showdata").innerHTML = "Enter a right city name.";
    return;
  }

  let date = new Date().toISOString().slice(0, 10);

  const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${cityName}&country=Pakistan`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        let timings = data.data.timings;
        let prayerTimes = `
          Fajr : ${timings.Fajr}<br>
          Dhuhr : ${timings.Dhuhr}<br>
          Asr : ${timings.Asr}<br>
          Maghrib : ${timings.Maghrib}<br>
          Isha : ${timings.Isha}
        `;
        document.getElementById(
          "showdata"
        ).innerHTML = `Namaz Timings of ${cityName} : <br>${prayerTimes}`;
      } else {
        document.getElementById(
          "showdata"
        ).innerHTML = `Sorry Try Again ${cityName} (${date})`;
      }
    });
});
