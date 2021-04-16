<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="@/assets/img/svg/product.svg" alt="Product" width="400" />
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam
            reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum,
            voluptas exercitationem ratione consectetur et!
          </p>
          <button class="btn custom-btn btn-outline-primary mr-4">
            Browse Products
          </button>
        </div>
      </div>
      <slider :mobiles="mobiles" />
    </div>
    <login></login>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Slider from "@/components/Slider.vue";
import Login from "@/components/Login.vue";
import { FB } from "@/firebase/Firebase.js";

export default {
  name: "home",
  components: {
    Navbar,
    Slider,
    Login
  },
  data() {
    return {
      mobiles: []
    };
  },
  created() {
    FB.firestore()
      .collection("products")
      .onSnapshot(queries => {
        queries.forEach(query => {
          this.mobiles.push(query);
        });
      });
  }
};
</script>

<style></style>
