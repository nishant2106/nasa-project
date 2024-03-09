const launches = new Map();
let latestFlightNumber = 101;
const launch = {
  flightNumber: 101,
  mission: "Kepler Exploration X",
  rocket: "Explorer 301",
  launchDate: new Date("December 31,2020"),
  target: "kepler-442 b",
  customer: ["nasa", "nishant"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(id) {
  console.log("Exists launch with", id);
  console.log("Launch has", launches.has(id));
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      customer: ["nishant", "nasa"],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(id) {
  const aborted = launches.get(id);
  console.log(aborted);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
module.exports = {
  launches,
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
