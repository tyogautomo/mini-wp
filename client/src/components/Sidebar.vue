<template>
  <div class="side-bar col-sm-2 d-flex flex-column">
    <h2 class="streams">Streams</h2>
    <div class="menu-list">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <a href>
            <img src="https://i.ibb.co/kcrKgQS/round-insert-drive-file-black-18dp.png" alt="icon" />
            <span class="col-sm-10">My Article</span>
          </a>
        </li>
        <li class="list-group-item">
          <a href>
            <img src="https://i.ibb.co/0XsfB9C/round-public-black-18dp.png" alt="icon" />
            <span class="col-sm-10">Discover</span>
          </a>
        </li>
        <li class="list-group-item">
          <a href>
            <img src="https://i.ibb.co/6mLVcCY/round-star-black-18dp.png" alt="icon" />
            <span class="col-sm-10">Favourites</span>
          </a>
        </li>
        <li class="list-group-item">
          <a href @click.prevent="logout">
            <img src="https://i.ibb.co/MkzcYmt/baseline-exit-to-app-black-18dp.png" alt="icon" />
            <span class="col-sm-10">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$emit('logout')
    }
  }
};
</script>

<style scoped>
</style>
