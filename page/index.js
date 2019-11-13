const everyDay = new Vue({
  el: '#every-day',
  data: {
    content: "asdafsdfasdfasdf"
  },
  computed: {
    getContent: function() {
      return this.content;
    }
  },
  created() {
    //请求数据，赋值
  }
})


const articleList = new Vue({
  el: '#article-list',
  data: {
    articleList: [{
      title: '母猪护理与原子弹',
      content: '阿斯顿发送到发送到发是都发烧的发送到发送到发送到发放',
      date: '2019-11-13',
      view: '101',
      tags: '母猪的产后护理 原子弹制造与维修',
      id: '1',
      link: ""
    },
    {
      title: '母猪护理与原子弹',
      content: '阿斯顿发送到发送到发是都发烧的发送到发送到发送到发放',
      date: '2019-11-13',
      view: '101',
      tags: '母猪的产后护理 原子弹制造与维修',
      id: '2',
      link: ""
    },
    {
      title: '母猪护理与原子弹',
      content: '阿斯顿发送到发送到发是都发烧的发送到发送到发送到发放',
      date: '2019-11-13',
      view: '101',
      tags: '母猪的产后护理 原子弹制造与维修',
      id: '3',
      link: ""
    }]
  },
  computed: {

  },created() {

  }
})