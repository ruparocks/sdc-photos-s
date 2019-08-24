const fetch = require("node-fetch");
const dbConnection = require("./db.js");
const UNSPLASH_API_KEY = require("./../src/config/unsplash.js");
console.log("UNSPLASH KEY => ", UNSPLASH_API_KEY);
const collections = {
  home: "4944467",
  livingRoom: "4944380",
  kitchen: "4944376",
  bedroom: "4944363",
  bathroom: "4944395",
  backyard: "4944404",
  pets: "4944391",
  interior: "4944387",
  other: "4944365",
  white: "1127156"
};

const seed = () => {
  for (let interior in collections) {
    fetch(
      `https://api.unsplash.com/collections/${
        collections[interior]
      }/photos/?client_id=${UNSPLASH_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        const photoSet = {
          "0": "zero",
          "1": "one",
          "2": "two",
          "3": "three",
          "4": "four",
          "5": "five",
          "6": "six",
          "7": "seven",
          "8": "eight",
          "9": "nine",
          "10": "ten"
        };

        for (let i = 0; i < data.length; i++) {
          //console.log(data);
          // dbConnection.insertIntoDB(
          //   data[i].id,
          //   data[i].likes,
          //   data[i].user.username,
          //   data[i].urls.regular,
          //   interior === "livingRoom" ? "living room" : interior,
          //   photoSet[i]
          // );
          data[i]['interior'] = interior;
          data[i]['photoSet'] = photoSet[i];
          console.log("INFO ===> ", data[i]);
          dbConnection.insertIntoDB(
            data[i],
            (err,msg) => {
              if (err) throw err;
              //else console.log(msg);
            }
          );
        }
      });
    console.log(`[Seeded]: ${interior}`);
  }
  
  return "Seeding Completed";
};

seed();
