const cartController = () => {
  return {
    index(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      // creating cart first
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totailQta: 0,
          totailPrice: 0,
        };
      }
      let cart = req.session.cart;

      // items check in cart
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          items: req.body,
          qty: 1,
        };
        cart.totailQta = cart.totailQta + 1;
        cart.totailPrice = cart.totailPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty += 1;
        cart.totailQta += 1;
        cart.totailPrice += req.body.price;
      }
      return res.json({ totailQta: req.session.cart.totailQta });
    },
  };
};

export default cartController;
