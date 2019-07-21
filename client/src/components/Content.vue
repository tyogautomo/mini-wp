<template>
  <div class="content col-sm-10 d-flex flex-column">
    <div class="show-article">
      <div class="articles-container container">
        <!-- ================================ NAV ARTICLE -->
        <NavArticle v-if="userpage"></NavArticle>
        <!-- =========================== LIST ARTICLE =========================== -->
        <div
          class="list-articles d-flex flex-column align-items-center"
          id="list-articles"
          v-if="userpage"
        >
          <Article
            v-for="(article, index) in articles"
            :key="index"
            :id="article._id"
            :title="article.title"
            :content="article.content"
            @delete-article="deleteArticle"
            @edit-page="editPage"
            @preview-article="previewArticle"
          ></Article>
        </div>
        <div class="preview" v-if="preview">
          <Preview :article="currentArticle"></Preview>
        </div>
        <!-- =================== ARTICLE FORM ================== -->
        <div id="form-article" v-if="formCreate">
          <CreateForm @create-article="createArticle"></CreateForm>
        </div>
        <!-- =================== FORM EDIT ARTICLE ================ -->
        <div id="edit-article">
          <EditForm
            :currentArticle="currentArticle"
            :formEditor="formEdit"
            @update-article="updateArticle"
          ></EditForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Article from "./Article.vue";
import NavArticle from "./NavArticle.vue";
import CreateForm from "./CreateForm.vue";
import EditForm from "./EditForm.vue";
import Preview from "./PreviewArticle";

export default {
  props: [
    "articles",
    "isLogin",
    "formCreate",
    "userpage",
    "currentArticle",
    "formEdit",
    "preview"
  ],
  components: {
    Article,
    NavArticle,
    CreateForm,
    EditForm,
    Preview
  },
  methods: {
    createArticle(payload) {
      this.$emit("create-article", payload);
    },
    deleteArticle(id) {
      this.$emit("delete-article", id);
    },
    editPage(id) {
      this.$emit("edit-page", id);
    },
    updateArticle(payload) {
      // console.log(payload, "ada idnya nih <<<<<<<<<<<<<<<<<<<<<<,");
      this.$emit("update-article", payload);
    },
    previewArticle(id) {
      this.$emit("preview-article", id);
    }
  }
};
</script>

<style scoped>
</style>
