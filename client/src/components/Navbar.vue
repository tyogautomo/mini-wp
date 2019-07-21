<template>
  <nav class="navbar navbar-expand-lg navbar-light d-flex fixed-top">
    <div class="brand col-sm-3 d-flex align-items-center justify-content-around" @click.prevent>
      <a class="col-2" href>
        <img class="brand-icon" src="https://i.ibb.co/z4gd13q/mlogo.png" alt="logo" />
      </a>
      <a
        class="col-10 navbar-brand text-white align-items-center home"
        href="#"
        @click.prevent
      >Mini Wordpress</a>
    </div>

    <div class="collapse navbar-collapse col-sm-6" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href @click.prevent="viewArticle">Home</a>
        </li>
      </ul>
    </div>

    <div class="setting col-sm-3 align-items-center">
      <div class="setting-btn" v-show="token">
        <ul class="navbar-nav mr-auto d-flex align-items-center justify-content-around">
          <li class="nav-item active btn btn-light write">
            <a href @click.prevent="viewCreate">
              +
              Write
            </a>
          </li>
          <li class="nav-item active">
            <a href>
              <img
                class="profile-icon"
                src="https://i.ibb.co/0GzB7s2/portrait.jpg"
                alt="profile-icon"
              />
            </a>
          </li>
          <li>
            <a class="nav-item active" href>
              <img class="profile-icon" src="https://i.ibb.co/DrHwZsj/notif.png" alt="notif" />
            </a>
          </li>
        </ul>
      </div>

      <div class="logout-btn-area" v-show="false">
        <div class="logout d-flex justify-content-end">
          <img class="logout" src alt="logout" />
          <a class="align-self-end logout-btn" href>Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["token"],
  methods: {
    viewCreate() {
      this.$emit("view-create");
    },
    viewArticle() {
      this.$emit("view-article");
    }
  }
};
</script>

<style scoped>
.write a {
  color: rgb(80, 22, 22)
}
</style>
