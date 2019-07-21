<template>
  <div class="preview d-flex flex-column align-items-center">
    <h1>{{article.title}}</h1>
    <small>Created at {{article.createdAt}}</small>
    <div class="parag d-flex" v-html="article.content"></div>
  </div>
</template>

<script>
export default {
  props: ["article"]
};
</script>

<style scoped>
div.preview {
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.513);
  border-radius: 6px;
}

h1 {
  font-family: "Lobster";
}

div.parag {
    margin-top: 30px;
}
</style>
