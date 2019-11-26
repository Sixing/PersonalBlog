const blogList = new Vue({
  el: '#blog-list',
  data: {
    blogList: []
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios({
        method: 'get',
        url: '/queryAllBlog'
      }).then(res => {
        this.blogList = res.data.data.map(item => {
          item.link = '/blog-detail.html?bid=' + item.id;
          return item;
        })
      })
    }
  }
})