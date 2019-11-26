const randomTags = new Vue({
  el: '#random_tags',
  data: {
    tags: []
  },
  computed: {
    randomColor() {
      return function() {
        const red = Math.random() * 255;
        const green = Math.random() * 255;
        const blue = Math.random() * 255;
        return `rgb(${red}, ${green}, ${blue})`
      }
    },
    randomSize() {
      return function() {
        const size = (Math.random() * 20 + 12) + 'px';
        return size
      }
    }
  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      axios({
        method: 'get',
        url: '/queryRandomTags'
      }).then(res => {
        this.tags = res.data.data.map( item => {
          return {
            text: item.tag,
            link: '/?tag=' + item.tag
          }
        })
      })
    }
  }

})

const newHot = new Vue({
  el: '#new-hot',
  data: {
    titleList: []
  },
  mounted() {
    this.queryBlogByHot()
  },
  methods: {
    queryBlogByHot(){
      axios({
        method: 'get',
        url: '/queryBlogByHot?size=5'
      }).then(res => {
        this.titleList = res.data.data.map(item => {
          return {
            title: item.title,
            link: "/blog-detail.html?bid=" + item.id
          }
        });
      })
    }
  }
})

const newComment = new Vue({
  el: '#new-comment',
  data: {
    commentList: []
  },
  mounted() {
    this.queryNewComments()
  },
  methods: {
    queryNewComments() {
      axios({
        method: 'get',
        url: '/queryNewComments?size=5'
      }).then(res => {
        this.commentList = res.data.data.map(item => {
          return {
            name: item.user_name,
            date: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss'),
            comment: item.comment
          }
        })
      })
    }
  }
})