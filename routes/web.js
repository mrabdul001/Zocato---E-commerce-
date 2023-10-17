import authController from "../app/http/controllers/authController.js";
import cartController from "../app/http/controllers/customers/cartController.js";
import homeController from "../app/http/controllers/homeController.js";

const initRoutes = (app) => {
  app.get("/", homeController().index);

  app.get("/login", authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", authController().register);
  app.post("/register", authController().postRegister);

  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);
};

export default initRoutes;
