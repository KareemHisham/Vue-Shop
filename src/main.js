import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Import Vendors
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Font-Awesome";
import "./assets/Global-style/App.scss";
import { FB } from "@/firebase/Firebase.js";
import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

Vue.config.productionTip = false;

let app = "";

FB.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
