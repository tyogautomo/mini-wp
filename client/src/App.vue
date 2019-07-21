<template>
  <div>
    <Navbar @view-create="viewCreate" @view-article="viewArticle" :token="token"></Navbar>
    <Sidebar v-if="token" @logout="logout"></Sidebar>
    <Content
      :articles="articles"
      :isLogin="isLogin"
      :formCreate="formCreate"
      :userpage="userpage"
      @create-article="createArticle"
      @delete-article="deleteArticle"
      :currentArticle="currentArticle"
      :formEdit="formEdit"
      @edit-page="editPage"
      @update-article="updateArticle"
      @preview-article="previewArticle"
      :preview="preview"
      @search-article="searchArticle"
      v-if="token"
    ></Content>
    <LandingPage @register="register" :changeView="modalForm" @login="login" v-if="!token"></LandingPage>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Content from "./components/Content.vue";
import LandingPage from "./components/LandingPage.vue";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isLogin: false,
      currentArticle: {},
      articles: [],
      userpage: true,
      formCreate: false,
      formEdit: false,
      modalForm: true,
      preview: false,
      token: localStorage.getItem("token")
    };
  },
  components: {
    Navbar,
    Sidebar,
    Content,
    LandingPage
  },
  methods: {
    register: function(payload) {
      // console.log(payload, "dari app vue nih <<<<<<<<<<<<<");
      axios({
        method: "post",
        url: "http://localhost:3000/users/register",
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          this.modalForm = false;
          Swal.fire({
            title: "Thank you!",
            text: "Please login to continue your journey..",
            type: "success",
            timer: 1300
          });
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            title: "Oops!",
            text: "Please use different email address.",
            type: "error",
            timer: 2500
          });
        });
    },
    login: function(payload) {
      //   console.log(payload, "sampe login di app vue <<<<<<<<<<<<<<<");
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          //   console.log(data, "token dari server <<<<<<<<<<<<");
          Swal.fire({
            title: "Login Success!",
            text: "Let's start your journey..",
            type: "success",
            timer: 1300
          });
          localStorage.setItem("token", data);
          this.token = localStorage.getItem("token");
          this.getArticle();
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            title: "Oops!",
            text: "Invalid username / password",
            type: "error",
            timer: 2000
          });
        });
    },
    logout: function() {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out after this",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
      }).then(result => {
        if (result.value) {
          Swal.fire("See ya!", "", "success");
          localStorage.removeItem("token");
          this.token = "";
          this.articles = [];
        }
      });
    },
    getArticle: function() {
      axios({
        method: "get",
        url: "http://localhost:3000/articles",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createArticle: function(payload) {
      //   console.log(payload, "sampe sini bungggg");
      axios({
        method: "post",
        url: "http://localhost:3000/articles",
        data: {
          title: payload.title,
          content: payload.content,
          featured_image: payload.featured_image
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: "Congratulation!",
            text: "Your new article have been submitted",
            type: "success",
            timer: 1000
          });
          this.getArticle();
          this.formCreate = false;
          this.userpage = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteArticle: function(id) {
      //   console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          axios({
            method: "delete",
            url: `http://localhost:3000/articles/delete/${id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({ data }) => {
              this.getArticle();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    editPage: function(id) {
      //   console.log(id);
      axios({
        method: "get",
        url: `http://localhost:3000/articles/edit/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.currentArticle = data;
          this.formEdit = true;
          this.userpage = false;
          //   console.log(this.currentArticle);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateArticle: function(payload) {
      console.log(payload, "nyampe lagi di appssss");
      axios({
        method: "put",
        url: `http://localhost:3000/articles/edit/${payload._id}`,
        data: {
          title: payload.title,
          content: payload.content
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: "Well done!",
            text: "Your article has been updated",
            type: "success",
            timer: 1300
          });
          this.formEdit = false;
          this.getArticle();
          this.userpage = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    previewArticle: function(id) {
      axios({
        method: "get",
        url: `http://localhost:3000/articles/edit/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.currentArticle = data;
          this.preview = true;
          this.userpage = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchArticle: function(search) {
      this.articles = [];
      axios({
        method: "get",
        url: "http://localhost:3000/articles",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          data.forEach(element => {
            if (element.title.toLowerCase().includes(search.toLowerCase())) {
              this.articles.push(element);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    viewCreate: function(condition) {
      this.formCreate = true;
      this.userpage = false;
      this.formEdit = false;
      this.preview = false;
    },
    viewArticle: function() {
      this.formCreate = false;
      this.userpage = true;
      this.formEdit = false;
      this.preview = false;
    }
  },
  created: function() {
    if (this.token) {
      this.getArticle();
    }
  }
};
</script>

<style scoped>
</style>
