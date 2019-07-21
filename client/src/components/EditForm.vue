<template>
  <div class="article-form-container" v-if="formEditor">
    <h1 class="new-article roboto">Edit Article</h1>
    <form>
      <input
        class="inp-title"
        type="text"
        name="inp-article-title"
        placeholder="Title here.."
        v-model="currentArticle.title"
      />
      <!-- <textarea
        class="inp-content"
        name="content"
        id="justify-content-center"
        cols="30"
        rows="10"
        placeholder="Tell your story .."
        v-model="currentArticle.content"
      ></textarea>-->
      <Editor
        class="editor"
        v-model="currentArticle.content"
        api-key="yz6rslamoykea3ihubhhbd4r79vbysel2ke1qimc6866wzvm"
        :init="{plugins: 'wordcount'}"
      ></Editor>
      <button class="btn btn-primary" href @click.prevent="updateArticle()">Edit</button>
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  props: ["currentArticle", "formEditor"],
  components: {
    Editor
  },
  data() {
    return {
      formEdit: {
        title: this.currentArticle.title,
        content: this.currentArticle.content
      }
    };
  },
  methods: {
    updateArticle: function() {
      console.log(this.currentArticle, "ini kan yang lu mau");
      this.$emit("update-article", this.currentArticle);
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
