//import paths to used
// enable env variables
import { config } from "dotenv";
config();

import apiRoutes from "./routes/app.routes.js";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongodb-session";
let MongoDbSession = MongoStore(session);

const app = express();

//paths to be used
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for forms
app.use(express.json()); // for application/json
app.use(cookieParser());

//database link
const DB_URI = process.env.DB_URI;

// connect session database
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("database-session connected");
  });

//store session
const store = new MongoDbSession({
  uri: DB_URI,
  collection: "adventSessions",
});

//use session
app.use(
  session({
    secret: "key to sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//routes
async function startApp() {
  console.log("Starting App...");

  console.log("Connection to DB...");

  await mongoose.connect(DB_URI);

  // define our routes
  app.use("", apiRoutes);

  console.log("Database connected");

  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => {
    console.log("App is live and running on http://localhost:5500/ ");
  });
}

startApp();
