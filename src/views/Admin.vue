<template>
  <div class="admin">
    <div class="page-wrapper">
      <a href="#">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="container">
          <div class="sidebar-content">
            <!-- sidebar-brand  -->
            <div class="sidebar-item sidebar-brand">
              <router-link to="/">Vue Shop</router-link>
              <div id="close-sidebar">
                <font-awesome-icon icon="times" />
              </div>
            </div>
            <!-- sidebar-header  -->
            <div class="sidebar-item sidebar-header">
              <div class="user-pic">
                <img
                  class="img-responsive img-rounded"
                  :src="userDate.img"
                  alt="User picture"
                />
              </div>
              <div class="user-info">
                <span class="user-name">
                  {{ this.userDate.username }}
                </span>
                <span class="user-role"> {{ this.userDate.mail }} </span>
                <span class="user-status">
                  <font-awesome-icon class="icon" :icon="['fas', 'circle']" />
                  <span>Online</span>
                </span>
              </div>
            </div>
            <!-- sidebar-search  -->
            <div class="sidebar-item sidebar-search">
              <div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control search-menu"
                    placeholder="Search..."
                  />
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'search']" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- sidebar-menu  -->
            <div class=" sidebar-item sidebar-menu">
              <ul class="list-unstyled">
                <li class="header-menu">
                  <span>Menu</span>
                </li>
                <li>
                  <router-link to="/admin/overview">
                    <font-awesome-icon
                      class="icon"
                      :icon="['fas', 'chart-line']"
                    />
                    <span>Overview</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/products">
                    <font-awesome-icon class="icon" :icon="['fab', 'amazon']" />
                    <span>Products</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/orders">
                    <font-awesome-icon
                      class="icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                    <span>Orders</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/profile">
                    <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                    <span>Profile</span>
                  </router-link>
                </li>
                <li @click="signOut">
                  <a href="#">
                    <font-awesome-icon
                      class="icon"
                      :icon="['fas', 'power-off']"
                    />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
            <!-- sidebar-menu  -->
          </div>
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
import { FB } from "@/firebase/Firebase.js";

export default {
  name: "admin",
  data() {
    return {
      userDate: {
        username: null,
        mail: null,
        id: null,
        img: null
      }
    };
  },
  methods: {
    signOut() {
      FB.auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  },
  created() {
    FB.auth().onAuthStateChanged(user => {
      if (user) {
        FB.firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot(response => {
            (this.userDate.username = response.data().name),
              (this.userDate.mail = response.data().email),
              (this.userDate.img = response.data().imageUrl),
              (this.userDate.id = response.data().userID);
          });
      }
    });
  }
};
</script>

<style scoped lang="scss">
.admin {
  .page-wrapper {
    a {
      text-decoration: none;
      .icon {
        margin-right: 10px;
      }
    }
    .sidebar-wrapper {
      background: #222;
      position: fixed;
      top: 0;
      height: 100%;
      width: 260px;
      z-index: 2;
      .sidebar-content {
        .sidebar-brand {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(#eee, 0.3);
          padding: 10px 0;
          a,
          #close-sidebar {
            color: #c7c7c7;
          }
          a {
            font-weight: 600;
          }
          #close-sidebar {
            cursor: pointer;
          }
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(#eee, 0.3);
          padding: 15px 0;
          .user-pic {
            width: 60px;
            padding: 2px;
            margin-right: 15px;
            img {
              object-fit: cover;
              height: 100%;
              width: 100%;
            }
          }
          .user-info {
            display: flex;
            flex-direction: column;
            color: #c7c7c7;
            .user-role {
              font-size: 12px;
            }
            .user-status {
              font-size: 11px;
              margin-top: 4px;
              .icon {
                font-size: 10px;
                margin-right: 4px;
                color: #5cb85c;
              }
            }
          }
        }
        .sidebar-search {
          padding: 15px 0;
          border-bottom: 1px solid rgba(#eee, 0.3);
          .form-control {
            background: transparent;
            color: #eee;
            outline: none;
            box-shadow: none;
          }
          .input-group-text {
            cursor: pointer;
          }
        }
        .sidebar-menu {
          padding: 15px 0;
          .header-menu span {
            font-weight: bold;
            font-size: 14px;
            padding: 15px 20px 5px 20px;
          }
          ul {
            li {
              &:hover {
                a {
                  .icon {
                    color: #22ff16;
                  }
                }
              }
              a {
                display: inline-block;
                width: 100%;
                text-decoration: none;
                position: relative;
                padding: 8px 30px 8px 20px;
                .icon {
                  background-color: #2e333c;
                  margin-right: 10px;
                  font-size: 40px;
                  width: 25px;
                  height: 25px;
                  line-height: 30px;
                  text-align: center;
                  border-radius: 4px;
                  padding: 5px;
                }
              }
              a,
              span {
                color: #c7c7c7;
              }
            }
          }
        }
      }
    }
  }
  .page-content {
    padding-left: 330px;
  }
}
</style>
