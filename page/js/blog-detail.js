
const blogDetail = new Vue({
  el: '#blog-detail',
  data: {
    title: "",
    content: '',
    ctime: "",
    tags: "",
    views: ""
  },
  mounted() {
    this.getData()
  },
  methods: {
    getUrlParam() {
      const searchUrlParam = location.search.indexOf('?') -1 ? location.search.split('?')[1].split("&"): '';
      let bid = '';
      if(searchUrlParam == '') {
        return;
      }else {
        searchUrlParam.forEach(item => {
          if(item.split('=')[0] == 'bid') {
            try {
              bid = parseInt(item.split('=')[1]);
            }catch(e) {
              console.log(e);
            }
          }
        })
      }
      return bid;
    },
    getData() {
      const bid = this.getUrlParam()
      axios({
        method: 'get',
        url: '/queryBlogById?bid=' + bid
      }).then(res => {
        const result = res.data.data;
        this.title = result.title;
        this.content = result.content;
        this.ctime = moment(result.ctime).format('YYYY-MM-DD HH:mm:ss');
        this.tags = result.tags;
        this.views = result.views;
      }).catch(err => {
        console.log('请求失败',err)
      })
    },

  }
})

const comments = new Vue({
  el: '#comments',
  data: {
    vcode: '',
    rightCode: '',
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    // getUrlParam() {
    //   const searchUrlParam = location.search.indexOf('?') -1 ? location.search.split('?')[1].split("&"): '';
    //   let bid = '';
    //   if(searchUrlParam == '') {
    //     return;
    //   }else {
    //     searchUrlParam.forEach(item => {
    //       if(item.split('=')[0] == 'bid') {
    //         try {
    //           bid = parseInt(item.split('=')[1]);
    //         }catch(e) {
    //           console.log(e);
    //         }
    //       }
    //     })
    //   }
    //   return bid;
    // },
    checkCaptcha() {
      const inputValue = document.getElementById('comment-code').value;
      if(inputValue === this.rightCode) {
        return true;
      }
      return false;
    },
    sendComment() {
      
      const bid = blogDetail.getUrlParam();
      const reply = document.getElementById('comment-reply').value;
      const replyName = document.getElementById('comment-reply-name').value;
      const name = document.getElementById('comment-name').value;
      const email = document.getElementById('comment-email').value;
      const content = document.getElementById('comment-content').value;
      const checkResult = this.checkCaptcha();
      if(!checkResult) {
        window.alert('验证码不正确');
        this.getCaptcha();
        return
      }

      axios({
        method: 'get',
        url: '/addComment?bid=' + bid + "&parent=" + reply + '&userName=' + name + '&email=' + email + '&content=' + content + '&parentName=' + replyName
      }).then (res => {

      }).catch (err => {

      })
    },
    getCaptcha() {
      axios({
        method: 'get',
        url: '/queryRandomCode'
      }).then( res => {
        console.log(res)
        this.vcode = res.data.data.data;
        this.rightCode = res.data.data.text;
      })
    }
  }
})

const blogComment = new Vue({
  el: '#blog-comment',
  data: {
    total: 100,
    commentsList: []
  },
  mounted(){
    this.getComments()
  },
  methods: {
    reply(id, name) {
      document.getElementById('comment-reply').value = id;
      document.getElementById('comment-reply-name').value = name;
      location.href = '#comments'
    },
    getComments() {
      const bid = blogDetail.getUrlParam();
      axios({
        method: 'get',
        url: '/queryCommentsByBlogId?bid=' + bid
      }).then(res => {
        this.commentsList = res.data.data.map(item => {
          if(item.parent > -1) {
            item.option = '回复@' + item.parent_name
          }
          
        })
        this.commentsList = res.data.data

      }).catch(err => {
        console.log(err)
      })

      axios({
        method: 'get',
        url: '/queryCommentsCountByBlogId?bid=' + bid
      }).then( res => {
        this.total = res.data.data[0].count;
      })
    }
  }
})