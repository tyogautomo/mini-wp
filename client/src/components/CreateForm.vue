<template>
  <div class="article-form-container">
    <h1 class="new-article">New Article</h1>
    <form enctype="multipart/form-data">
      <input
        class="inp-title"
        type="text"
        name="inp-article-title"
        id="inp-article-title"
        placeholder="Title here.."
        v-model="formCreate.title"
      />
      <input class="input-img" type="file" name="files" id="file" />
      <!-- <textarea
          class="inp-content justify-content-center"
          name="content"
          cols="30"
          rows="10"
          placeholder="Tell your story .."
          v-model="formCreate.content"
      ></textarea>-->
      <Editor
        class="editor"
        v-model="formCreate.content"
        api-key="yz6rslamoykea3ihubhhbd4r79vbysel2ke1qimc6866wzvm"
        :init="{plugins: 'wordcount'}"
      ></Editor>
      <button class="btn btn-primary" href @click.prevent="createArticle">Submit</button>
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  data() {
    return {
      formCreate: {
        title: "",
        content: "",
        featured_image: "https://i.ibb.co/0GzB7s2/portrait.jpg"
      }
    };
  },
  components: {
    Editor
  },
  methods: {
    createArticle: function() {
      let payload = {
        title: this.formCreate.title,
        content: this.formCreate.content,
        featured_image: this.formCreate.featured_image
      };
      this.$emit("create-article", payload);
    }
  }
};
</script>

<style scoped>
.editor {
  height: 300px;
}

h1.new-article {
  font-family: "Lobster";
}

input.input-img {
  margin-bottom: 20px;
}

button {
  margin: 10px 0;
}
</style>
