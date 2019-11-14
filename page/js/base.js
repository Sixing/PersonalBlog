const randomTags = new Vue({
  el: '#random_tags',
  data: {
    tags: ['javascript', 'Vue', "React", 'HTML5']
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
  created() {

  }
})

const newHot = new Vue({
  el: '#new-hot',
  data: {
    titleList: [
      {
        title: '这是一个链接',
        link: " http://www.baidu.com"
      },
      {
        title: '这是一个链接',
        link: " http://www.baidu.com"
      },      {
        title: '这是一个链接',
        link: " http://www.baidu.com"
      }
    ]
  }
})

const newComment = new Vue({
  el: '#new-comment',
  data: {
    commentList: [{
      name: '这是用户名',
      date: '2019-11-13',
      comment: '这里是一大串评论'
    },{
      name: '这是用户名',
      date: '2019-11-13',
      comment: '这里是一大串评论'
    },{
      name: '这是用户名',
      date: '2019-11-13',
      comment: '这里是一大串评论'
    }]
  }
})