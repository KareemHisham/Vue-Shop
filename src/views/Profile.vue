<template>
  <div class="profile">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Profile settings</h3>
            <p>
              Change your profile settings here
            </p>
          </div>
          <div class="col-md-5">
            <img
              src="@/assets/img/svg/profile.svg"
              width="300"
              alt="Profile_img"
              class="img-fluid"
            />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
              >Profile</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              id="account-tab"
              data-toggle="tab"
              href="#account"
              role="tab"
              aria-controls="account"
              aria-selected="false"
              >Account settings</a
            >
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <!-- Profile Form -->
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Full name"
                      class="form-control"
                      v-model="profile.name"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="number"
                      placeholder="Phone"
                      class="form-control"
                      v-model="profile.phone"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Address"
                      class="form-control"
                      v-model="profile.address"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="number"
                      placeholder="Postcode"
                      class="form-control"
                      v-model="profile.postcode"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                      @click="saveChanges"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Account Form -->
          <div
            class="tab-pane fade pt-3"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Email address"
                      class="form-control"
                      v-model="account.mail"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="file" class="form-control" @change="pushImg" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="New password"
                      class="form-control"
                      v-model="account.password"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="password"
                      placeholder="Confirm password"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="submit"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                      @click="saveAccount"
                    />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input
                      type="button"
                      value="Update password"
                      class="btn btn-success w-100"
                      @click="updatePassword"
                    />
                  </div>
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
  name: "profile",
  data() {
    return {
      profile: {
        name: null,
        phone: null,
        address: null,
        postcode: null,
        userID: null
      },
      account: {
        mail: null,
        imageUrl: null,
        password: null
      }
    };
  }, // Data
  methods: {
    pushImg(e) {
      this.account.imageUrl = e.target.files[0];
    }, // End PushImg
    saveChanges() {
      FB.firestore()
        .collection("users")
        .doc(this.profile.userID)
        .update({
          name: this.profile.name,
          phone: this.profile.phone,
          address: this.profile.address,
          postcode: this.profile.postcode,
          userID: this.profile.userID
        })
        .then(() => {
          swal({
            text: "The data has been updated",
            icon: "success",
            button: false,
            timer: 2000
          });
        });
    }, // End saveChanges
    saveAccount() {
      const storageRef = FB.storage().ref(),
        ref = storageRef.child(`pics/${this.account.imageUrl.name}`);
      ref.put(this.account.imageUrl).then(() => {
        ref
          .getDownloadURL()
          .then(url => {
            this.account.imageUrl = url;
          })
          .then(() => {
            FB.firestore()
              .collection("users")
              .doc(this.profile.userID)
              .update({
                email: this.account.mail,
                imageUrl: this.account.imageUrl
              })
              .then(() => {
                swal({
                  text: "The data has been updated",
                  icon: "success",
                  button: false,
                  timer: 2000
                });
              });
          });
      });
    }, // saveAccount
    updatePassword() {
      FB.auth()
        .currentUser.updatePassword(this.account.password)
        .then(() => {
          swal({
            text: "Password updated",
            icon: "success",
            button: false,
            timer: 2000
          });
        })
        .catch(error => {
          swal({
            text: error.message,
            icon: "error",
            button: false,
            timer: 3000
          });
        });
    }
  }, //updatePassword
  created() {
    FB.auth().onAuthStateChanged(user => {
      if (user) {
        FB.firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot(res => {
            this.profile = res.data();
            this.account.mail = res.data().email;
            this.profile.userID = user.uid;
          });
      }
    });
  } // Created Method
};
</script>
