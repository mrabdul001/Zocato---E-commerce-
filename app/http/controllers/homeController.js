import Menu from "../../models/menu.js";

const homeController = () => {
  // factory function
  return {
    async index(req, res) {
      // Menu.find().then((pizzas) => {
      //   console.log(pizzas);
      //   res.render("home", { pizzas: pizzas });
      // });

      const pizzas = await Menu.find();
      res.render("home", { pizzas: pizzas });
      console.log(pizzas);
    },
  };
};

export default homeController;
