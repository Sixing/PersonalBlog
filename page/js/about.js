


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
    checkCaptcha() {
      const inputValue = document.getElementById('comment-code').value;
      if(inputValue === this.rightCode) {
        return true;
      }
      return false;
    },
    sendComment() {
      
      const bid = -10;
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
      const bid = -10;
      axios({
        method: 'get',
        url: '/queryCommentsByBlogId?bid=' + bid
      }).then(res => {
        this.commentsList = res.data.data.map(item => {
          if(item.parent > -1) {
            item.option = '回复@' + item.parent_name
          }
          
        })
        this.commentsList = res.data.data.map(item => {
          return {
            name: item.user_name,
            option: item.option,
            ctime: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')
          }
        })

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