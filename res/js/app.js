import axios from "axios";
import Noty from "noty";

let addtocart = document.querySelectorAll(".cartBtn");
let cartCounter = document.querySelector("#cartCounter");

const updateCart = (pizza) => {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerHTML = res.data.totailQta;
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Pizza added in cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Somthing went wrong",
      }).show();
    });
};
addtocart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);

    updateCart(pizza);
  });
});
