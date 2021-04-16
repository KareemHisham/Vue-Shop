<template>
  <nav class="navbar custom-nav navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <span>Vue</span> Shop</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0 ml-auto">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <a
            class="btn btn-outline-success my-2 my-sm-0"
            data-toggle="modal"
            data-target="#login"
            v-if="!isUser"
            >Get Start</a
          >
          <div class="nav-item dropdown" v-if="isUser">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Welcome {{ isUser.displayName }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/admin" class="dropdown-item d-block btn"
                >Dashboard</router-link
              >
              <router-link
                to="/cart"
                class="btn btn-outline-info border-0 d-block"
                data-toggle="modal"
                data-target="#miniCart"
              >
                <font-awesome-icon icon="cart-plus" class="mr-3" />
                Cart
              </router-link>
              <div class="dropdown-divider"></div>
              <button class="btn btn-danger btn-block" @click.prevent="signOut">
                <font-awesome-icon
                  class="icon mr-3"
                  :icon="['fas', 'power-off']"
                />Logout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { FB } from "@/firebase/Firebase.js";
export default {
  name: "Navbar",
  data() {
    return {
      isUser: false
    };
  },
  methods: {
    signOut() {
      FB.auth()
        .signOut()
        .then(() => {
          this.$router.push("/").catch(() => {});
        });
    }
  },
  created() {
    FB.auth().onAuthStateChanged(user => {
      if (user) {
        this.isUser = user;
      } else {
        this.isUser = false;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  .navbar-brand {
    span {
      color: #42b983;
    }
  }
  .collapse {
    form {
      a:not(.nav-link) {
        color: black;
        text-align: center;
        &:hover {
          background: #42b983;
          color: white;
        }
      }
      a.nav-link {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
@media (min-width: 992px) {
  .navbar.custom-nav {
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #fff !important;
  }
}
</style>
