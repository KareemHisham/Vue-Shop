import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Overview from "../views/Overview.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import Profile from "../views/Profile.vue";
import EditProduct from "../views/EditProduct.vue";
import Cart from "../views/Cart.vue";
import { FB } from "@/firebase/Firebase.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Home
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "overview",
        name: "overview",
        component: Overview
      },
      {
        path: "products",
        name: "products",
        component: Products
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "orders",
        name: "orders",
        component: Orders
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditProduct
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  const AUTH = FB.auth().currentUser,
    requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !AUTH) {
    next("/");
  } else {
    next();
  }
});

export default router;
