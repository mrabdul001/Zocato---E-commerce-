import express from "express";
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.get("/", (req, res) => {
  res.render("home");
});

//   set Temple engine
app.use(expressEjsLayouts);
app.set("views", path.join(__dirname, "/res/views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`App listning on http://localhost:${PORT}`);
});
