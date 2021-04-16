<template>
  <div class="products">
    <div class="container h-100">
      <intro />
      <Product-Table
        :productInfo="this.productInfo"
        :addProduct="this.addProduct"
        :pushImg="this.pushImg"
        :products="this.products"
        :edit="this.edit"
        :deleteItem="this.deleteItem"
      />
    </div>
  </div>
</template>
<script>
import Intro from "@/components/Product-page/Intro.vue";
import ProductTable from "@/components/Product-page/productTable.vue";
import { FB } from "@/firebase/Firebase.js";
import swal from "sweetalert";
export default {
  components: { Intro, ProductTable },
  name: "products",
  data() {
    return {
      productInfo: {
        name: null,
        price: 1,
        imageUrl: null,
        description: null
      },
      products: []
    };
  },
  methods: {
    pushImg(e) {
      this.productInfo.imageUrl = e.target.files[0];
    }, // End PushImg
    addProduct() {
      const storageRef = FB.storage().ref(),
        ref = storageRef.child(`pics/${this.productInfo.imageUrl.name}`);
      ref.put(this.productInfo.imageUrl).then(() => {
        ref
          .getDownloadURL()
          .then(url => {
            this.productInfo.imageUrl = url;
          })
          .then(() => {
            FB.firestore()
              .collection("products")
              .add(this.productInfo)
              .then(() => {
                document.querySelector(".modal-backdrop").style.display =
                  "none";
                document.querySelector(".modal-dialog, .modal").style.display =
                  "none";
                document.body.classList.remove("modal-open");
                document.getElementById("formProduct").reset();
                this.$router.push("/admin/products").catch(() => {});
              });
          });
      });
    }, // End addProduct
    edit(id) {
      this.$router.push({
        name: "edit",
        params: { id: id }
      });
    }, //End Edit
    deleteItem(id) {
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this item?",
        icon: "warning",
        dangerMode: true,
        buttons: true
      }).then(willDelete => {
        if (willDelete) {
          FB.firestore()
            .collection("products")
            .doc(id)
            .delete();
          swal("Deleted!", "Your item has been deleted!", "success");
        }
      });
    } // End Delete
  }, // End Methods
  created() {
    // This is not a Dynamic Way
    // FB.firestore()
    //   .collection("products")
    //   .onSnapshot(response => {
    //     this.products = [];
    //     response.forEach(item => {
    //       this.products.push({
    //         productID: item.id,
    //         name: item.data().name,
    //         price: item.data().price,
    //         description: item.data().description,
    //         imgURL: item.data().imageUrl
    //       });
    //     });
    //   });
    // This is a Dynamic Way
    FB.firestore()
      .collection("products")
      .onSnapshot(docs => {
        this.products = [];
        docs.forEach(doc => {
          this.products.push(doc);
        });
      });
  }
};
</script>
<style lang="scss">
.products {
  .products-table {
    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .table {
      img {
        width: 30%;
        height: auto;
      }
      td,
      th {
        vertical-align: baseline;
      }
      td {
        width: 200px;
      }
      tbody {
        .buttons {
          display: flex;
          border-top: none;
        }
      }
    }
  }
}
</style>
