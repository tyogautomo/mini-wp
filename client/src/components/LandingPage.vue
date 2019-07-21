<template>
  <div class="landing-page">
    <!-- ================= LOGIN-PAGE -->
    <div class="container-fluid home-page">
      <div class="container-row d-flex">
        <!-- ========================= BANNER -->
        <div class="banner-home col-7 d-flex flex-column">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://i.ibb.co/F8kTBpr/carousel2.jpg"
                  class="d-block w-100"
                  alt="carousel1"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://i.ibb.co/PMTwLB9/carousel1.jpg"
                  class="d-block w-100"
                  alt="carousel2"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://i.ibb.co/4dJfNPP/carousel3.jpg"
                  class="d-block w-100"
                  alt="carousel3"
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="motto d-flex justify-content-center">
            <h1>Let the world hear you</h1>
          </div>
        </div>
        <!-- ========================= USER GATE -->
        <div class="user-gate col-5 d-flex flex-column align-items-center">
          <h1>Star Your Journey Here..</h1>
          <form class="d-flex flex-column" @submit.prevent="login">
            <input type="text" placeholder="Enter your Username" v-model="formLogin.email" />
            <input type="password" placeholder="Enter your Password" v-model="formLogin.password" />
            <button class="btn btn-primary" type="submit">LOGIN</button>
          </form>
          <a href data-toggle="modal" data-target="#exampleModalCenter">Didn't have an Account?</a>
          <h5 class="signingoogle">Signin with Google Account</h5>
          <div class="g-signin2" @data-onsuccess="onSignIn"></div>
          <!-- <a href="#" @click.prevent="signOut">Sign out</a> -->
        </div>
        <!-- ========================== REGISTER MODAL -->
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          v-if="changeView"
        >
          <div class="modal-dialog modal-dialog-centered" role="document" v-if="changeView">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Register New Account</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form class="d-flex flex-column" @submit.prevent="register">
                <div class="modal-body">
                  <h5>Username:</h5>
                  <input
                    type="text"
                    placeholder="Enter your Username"
                    v-model="formRegister.username"
                  />
                  <h5>Email:</h5>
                  <input type="text" placeholder="Enter your Email" v-model="formRegister.email" />
                  <h5>Password:</h5>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    v-model="formRegister.password"
                  />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["changeView", "token"],
  data() {
    return {
      formRegister: {
        username: "",
        email: "",
        password: ""
      },
      formLogin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      this.$emit("register", this.formRegister);
    },
    login() {
      //   console.log(this.formLogin);
      this.$emit("login", this.formLogin);
    },
    onSignIn(googleUser) {
      console.log(googleUser.getBasicProfile());
    },
    signOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    }
  }
};
</script>

<style scoped>
div.home-page {
  padding: 30px 60px;
}

div.container-row {
  box-shadow: 0 0 10px 8px rgba(0, 0, 0, 0.616);
}

div.banner-home {
  background-color: rgb(121, 31, 31);
  font-family: "Lobster";
  color: azure;
  padding: 0;
}

div.motto {
  padding: 10px 0;
}

div.user-gate {
  background-image: url("https://i.ibb.co/njLhd71/leaves-pattern.png");
  padding: 20px;
}

.user-gate h1 {
  font-family: "Lobster";
  margin-bottom: 60px;
}

input {
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(155, 155, 155);
  font-family: "Oswald";
  margin: 10px 0;
  width: 250px;
}

h5 {
  font-family: "Oswald";
}
.modal-header h5 {
  font-family: "Lobster";
  font-size: 25px;
}

button {
  margin: 10px 0;
}

div.modal-body {
  background-image: url("https://i.ibb.co/PFGSzdK/seigaiha.png");
}
div.modal-header,
div.modal-footer {
  background-color: rgb(255, 197, 39);
}

h5.signingoogle {
  margin-top: 30px;
}
</style>
