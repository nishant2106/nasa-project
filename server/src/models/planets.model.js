const path = require("path");
const fs = require("fs");

const { parse } = require("csv-parse");
const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      ) // pipe is supposed to connect a readable stream source to a writable stream source
      .on("data", (data) => {
        if (isHabitable(data)) habitablePlanets.push(data);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        // console.log(
        //   habitablePlanets.map((habitablePlanet) => habitablePlanet.kepler_name)
        // );
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
