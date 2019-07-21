// Vue.component('card-article', {
//     props: ['article'],
//     template: `
//     <div class="card row flex-row align-items-center">
//         <div class="article-title col-9">
//             <h1><a href="">{{article.title}}</a></h1>
//             <p class="paragraph">{{article.content}}</p>
//             <span class="timestamp">1 days ago</span>
//         </div>
//         <div class="article-image col-2">
//             <img src="./static/portrait.jpg" alt="image">
//         </div>
//         <div class="article-options col-1 d-flex flex-column justify-content-between">
//             <a href=""><img src="./static/round-edit-24px.svg" alt="edit"></a>
//             <a href=""><img src="./static/baseline-delete-24px.svg" alt="edit"></a>
//         </div>
//     </div>
//     `
// })

let miniWordpress = new Vue({
    el: '#app',
    data: {
        title: '',
        content: '',
        search: '',
        formLogin: {
            email: '',
            password: ''
        },
        formRegister: {
            username: '',
            email: '',
            password: ''
        },
        article: {},
        articles: [],
        dsplList: true,
        dsplForm: false,
        dsplEdit: false,
        publishNav: true,
        draftNav: false,
        isLogin: true
    },
    methods: {
        createArticle: function (event) {
            // alert(this.title)
            // alert(this.content)
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/articles',
                    data: {
                        title: this.title,
                        content: this.content
                    }
                })
                .then(({
                    data
                }) => {
                    alert('Successfuly created data')
                    this.title = '',
                        this.content = '',
                        this.getArticle()
                    this.dsplForm = false;
                    this.dsplList = true;
                })
                .catch(err => {
                    console.log(err)
                })

        },
        getArticle: function () {
            axios({
                    method: 'get',
                    url: 'http://localhost:3000/articles'
                })
                .then(({
                    data
                }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        findArticle: function () {
            this.articles = []
            axios({
                    method: 'get',
                    url: 'http://localhost:3000/articles'
                })
                .then(({
                    data
                }) => {
                    data.forEach(element => {
                        if (element.title.toLowerCase().includes(this.search.toLowerCase())) {
                            this.articles.push(element)
                        } else {
                            //
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updatePage: function (id) {
            console.log(id)
            axios({
                    method: 'get',
                    url: `http://localhost:3000/articles/edit/${id}`
                })
                .then(({
                    data
                }) => {
                    console.log(this.title)
                    this.title = data.title
                    this.content = data.content
                    this.article = data
                    this.dsplEdit = true;
                    this.dsplList = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateArticle: function (id) {
            console.log(id)
            axios({
                    method: 'put',
                    url: `http://localhost:3000/articles/edit/${id}`,
                    data: {
                        title: this.title,
                        content: this.content
                    }
                })
                .then(({
                    data
                }) => {
                    this.dsplEdit = false;
                    this.getArticle();
                    this.dsplList = true;
                    this.title = '',
                        this.content = ''
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteArticle: function (id) {
            console.log(id)
            axios({
                    method: 'delete',
                    url: `http://localhost:3000/articles/delete/${id}`
                })
                .then(({
                    data
                }) => {
                    this.getArticle()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        displayForm: function (event) {
            this.title = '',
                this.content = '',
                this.dsplForm = true;
            this.dsplList = false;
            this.dsplEdit = false;
        },
        displayList: function (event) {
            this.dsplForm = false;
            this.dsplEdit = false;
            this.dsplList = true;
        },
        clickPublish() {
            this.publishNav = true;
            this.draftNav = false;
        },
        clickDraft() {
            this.publishNav = false;
            this.draftNav = true
        }

    },
    watch: {
        search: function () {
            this.findArticle()
        }
    },
    created: function () {
        this.getArticle()
    }
})