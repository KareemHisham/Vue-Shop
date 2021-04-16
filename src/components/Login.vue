<template>
  <div class="login">
    <!-- Modal -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul
              class="nav nav-fill nav-pills mb-3"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                  >Login</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-register-tab"
                  data-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                  >Signup</a
                >
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
              >
                <h5 class="text-center">Login Please</h5>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    v-model="userInfo.email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small class="form-text text-muted"
                    >We'll never share your email with anyone else.</small
                  >
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    @keyup.enter="login"
                    v-model="userInfo.password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <div
                  class="alert alert-danger text-center"
                  v-if="msgs.errorMsg"
                >
                  {{ msgs.errorMsg }}
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary mr-4"
                    @click="login"
                    :disabled="!userInfo.email || !userInfo.password"
                  >
                    Login
                  </button>
                  <button
                    class="btn btn-primary"
                    @click="resetPassword"
                    :disabled="!userInfo.email"
                  >
                    Forget Password
                  </button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Create New Account</h5>

                <div class="form-group">
                  <label for="name">Your name</label>
                  <input
                    type="text"
                    v-model="userInfo.name"
                    class="form-control"
                    id="name"
                    placeholder="Your nice name"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    v-model="userInfo.email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input
                    type="number"
                    v-model="userInfo.phone"
                    class="form-control"
                    id="phone"
                    aria-describedby="emailHelp"
                    placeholder="Enter phone"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    v-model="userInfo.password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div
                  class="alert alert-danger text-center"
                  v-if="msgs.errorMsg"
                >
                  {{ msgs.errorMsg }}
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary"
                    @click="register"
                    :disabled="
                      !userInfo.name ||
                        !userInfo.email ||
                        !userInfo.password ||
                        !userInfo.phone
                    "
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FB } from "@/firebase/Firebase.js";
import swal from "sweetalert";
export default {
  data() {
    return {
      userInfo: {
        name: null,
        email: null,
        password: null,
        phone: null
      },
      msgs: {
        errorMsg: null,
        resetMsg: null
      }
    };
  },
  methods: {
    register() {
      FB.auth()
        .createUserWithEmailAndPassword(
          this.userInfo.email,
          this.userInfo.password
        )
        .then(user => {
          FB.firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              name: this.userInfo.name,
              email: this.userInfo.email,
              phone: this.userInfo.phone,
              userID: user.user.uid
            });
        })
        .then(() => {
          document.querySelector(".modal-backdrop").style.display = "none";
          var user = FB.auth().currentUser;
          user.updateProfile({
            displayName: this.userInfo.name,
            email: this.userInfo.email,
            phoneNumber: this.userInfo.phone
          });
          this.$router.push("/admin");
        })
        .catch(error => {
          this.msgs.errorMsg = error.message;
        });
    },
    login() {
      FB.auth()
        .signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
        .then(() => {
          document.querySelector(".modal-backdrop").style.display = "none";
          this.$router.push("/admin");
        })
        .catch(error => {
          this.msgs.errorMsg = error.message;
        });
    },
    resetPassword() {
      FB.auth()
        .sendPasswordResetEmail(this.userInfo.email)
        .then(() => {
          swal({
            text: "Please chech your inbox",
            icon: "success",
            button: false,
            timer: 2000
          });
        });
    }
  }
};
</script>
