// const trainers = require("./trainers.json");
import Location from "./models/location.js";
import fs from "fs";
import Mongoose from "mongoose";
import "dotenv/config";
const locations = JSON.parse(fs.readFileSync("../initial data/locations.json", 'utf-8'));

let db = Mongoose.connect("mongodb+srv://Clemo:Abayomi01@cluster0.oz356.gcp.mongodb.net/TrainingBooking?retryWrites=true&w=majority")
const loadData = async (db) => {
  try {

      await Location.insertMany(locations)
      process.exit()
    } catch (e) {
      console.log(`error -> ${e}`)
      process.exit()
    }
         
  // }
};
loadData(db)
