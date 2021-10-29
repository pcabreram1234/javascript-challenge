/* var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; */

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

let character = {
  count: 0,
  name: "",
  dimension: "",
};

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == "4") {
        if (xhttp.status == 200) {
          resolve(xhttp.responseText);
        } else {
          reject(xhttp.responseText);
        }
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
};

fetchData(API)
  .then((response) => {
    Object.defineProperty(character, count, {
      value: JSON.parse(response.info.count),
    });

    return JSON.parse(response);
  })
  .then((response1) => {
    fetchData(`${API}${response1.results[0].id}`).then((response2) => {
      let provCharacter = JSON.parse(response1);
      console.log(character);
    });
  });

/* fetchData(API, function (error1, data1) {
  if (error1) return console.error("Error" + " " + error1);
  console.log("Primer Llamado...");
  data1 = JSON.parse(data1);
  fetchData(API + data1.results[0].id, function (error2, data2) {
    if (error2) {
      return console.error(error1);
    }
    console.log("Segundo Llamado...");
    data2 = JSON.parse(data2);
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) {
        return console.error(error3);
      }
      data3 = JSON.parse(data3);
      console.log("Tercero Llamado...");
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
}); */

fetchData(API);
