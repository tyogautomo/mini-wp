<template>
  <div class="card row flex-row align-items-center">
    <div class="article-title col-9">
      <h1 @click.prevent="previewArticle(id)">
        <a href>{{title}}</a>
      </h1>
      <!-- <p class="paragraph">{{content}}</p> -->
      <span class="timestamp">1 days ago</span>
    </div>

    <div class="article-image col-2">
      <img src="https://i.ibb.co/0GzB7s2/portrait.jpg" alt="image" />
    </div>

    <div
      class="article-options col-1 d-flex flex-column justify-content-between align-content-stretch"
    >
      <a href class="edit">
        <img
          src="https://i.ibb.co/mH5FmcC/round-create-black-18dp.png"
          alt="edit"
          @click.prevent="editPage(id)"
        />
      </a>
      <a href class="delete">
        <img
          src="https://i.ibb.co/qsd95Nh/round-delete-sweep-black-18dp.png"
          alt="delete"
          @click.prevent="deleteArticle(id)"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "content"],
  methods: {
    deleteArticle(id) {
      this.$emit("delete-article", id);
    },
    editPage(id) {
      this.$emit("edit-page", id);
    },
    previewArticle(id) {
      this.$emit("preview-article", id);
    }
  }
};
</script>

<style>
</style>
