import express from "express";
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import initRoutes from "./routes/web.js";
import mongoose from "mongoose";
import session from "express-session";
import { configDotenv } from "dotenv";
import flash from "express-flash";
import pkg from "connect-mongo";
const connectMongo = pkg;

// const store = new MongoDbStore(session);

configDotenv();
const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// database connection
try {
  mongoose.connect("mongodb://127.0.0.1:27017/Real_Time_Pizza", {
    useNewUrlParser: true,
  });
  console.log("monogDB connected successfully");
} catch (error) {
  console.log(error);
}

// session setup
mongoose.connect("mongodb://127.0.0.1:27017/Real_Time_Pizza", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  session({
    secret: process.env.COKKIE_SECRET,
    resave: false,
    store: new connectMongo({
      client: mongoose.connection.getClient(),
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

// Assets
app.use(express.static("public"));
app.use(express.json());

// golobal middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
//   set Temple engine
app.use(expressEjsLayouts);
app.set("views", path.join(__dirname, "/res/views"));
app.set("view engine", "ejs");

initRoutes(app);
app.listen(PORT, () => {
  console.log(`App listning on http://localhost:${PORT}`);
});
