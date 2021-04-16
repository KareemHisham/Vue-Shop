<template>
  <section class="editPage py-5">
    <div class="container">
      <h1 class="text-center text-capitalize mb-3">Edit Page</h1>
      <form @submit.prevent="save">
        <div class="form-group">
          <input type="text" class="form-control" v-model="fetchProds.name" />
        </div>
        <div class="form-group">
          <input type="price" class="form-control" v-model="fetchProds.price" />
        </div>
        <div class="form-group">
          <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="pushImg"
          />
        </div>
        <div class="form-group">
          <textarea
            cols="30"
            rows="10"
            class="form-control"
            v-model="fetchProds.description"
          ></textarea>
        </div>
        <button
          type="submit"
          class="btn btn-success btn-block"
          :disabled="
            !fetchProds.name || !fetchProds.price || !fetchProds.description
          "
        >
          Save
        </button>
        <router-link to="/admin/products" class="btn btn-danger btn-block"
          >cancel</router-link
        >
      </form>
    </div>
  </section>
</template>
<script>
import { FB } from "@/firebase/Firebase.js";

export default {
  name: "edit",
  data() {
    return {
      fetchProds: {},
      productID: this.$route.params.id,
      testImg: null
    };
  },
  methods: {
    save() {
      const storageRef = FB.storage().ref(),
        ref = storageRef.child(`pics/${this.fetchProds.imageUrl.name}`);
      ref.put(this.fetchProds.imageUrl).then(() => {
        ref
          .getDownloadURL()
          .then(url => {
            this.fetchProds.imageUrl = url;
          })
          .then(() => {
            FB.firestore()
              .collection("products")
              .doc(this.productID)
              .update(this.fetchProds)
              .then(() => {
                this.$router.push("/admin/products");
              });
          });
      });
    },

    pushImg(e) {
      this.fetchProds.imageUrl = e.target.files[0];
    }
  },
  created() {
    FB.firestore()
      .collection("products")
      .doc(this.$route.params.id)
      .onSnapshot(response => {
        this.testImg = response.data().imageUrl;
        this.fetchProds = {
          name: response.data().name,
          price: response.data().price,
          imageUrl: response.data().imageUrl,
          description: response.data().description
        };
      });
  }
};
</script>
