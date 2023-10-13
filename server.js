import express from "express";
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Assets
app.use(express.static("public"));

//   set Temple engine
app.use(expressEjsLayouts);
app.set("views", path.join(__dirname, "/res/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cart", (req, res) => {
  res.render("customers/cart");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});
app.get("/register", (req, res) => {
  res.render("auth/register");
});
app.listen(PORT, () => {
  console.log(`App listning on http://localhost:${PORT}`);
});
