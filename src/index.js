var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

let character = {
  count: 0,
  name: "",
  dimension: "",
  id: "",
  url: "",
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
    return JSON.parse(response);
  })
  .then((response1) => {
    character.count = response1.info.count;
    character.name = response1.results[0].name;
    character.id = response1.results[0].id;
    character.url = response1.results[0].origin.url;
    fetchData(`${character.url}`).then((response3) => {
      character.dimension = JSON.parse(response3).dimension;
    });
    console.log(`                 Personajes: ${character.count}
                 Primer Personaje: ${character.name}
                 Dimensión: ${character.dimension}`);
  })
  .catch((error) => {
    console.log(error);
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
