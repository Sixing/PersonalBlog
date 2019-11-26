const everyDay = new Vue({
  el: '#every-day',
  data: {
    content: ""
  },
  computed: {
    getContent: function() {
      return this.content;
    }
  },
  created() {
    //请求数据，赋值
    axios({
      method: 'get',
      url: '/queryEveryDay'
    }).then(res => {
      everyDay.content = res.data.data[0].content
    }).catch( err => {
      console.log('请求失败')
    })
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
    }],
    page: 1,
    pageSize: 3,
    count: 0,
    pageNumList: []
  },
  computed: {

  },created() {
    
  },
  mounted(){
    this.getPage(this.page, this.pageSize)
  },
  methods: {
    getPage(page, pageSize) {
      const tag = this.getUrlParams();
      let queryUrl = ''
      let countUrl = ''
      if(tag != '') {
        queryUrl = '/queryByTag?tag=' + tag + '&page=' + (page - 1) + "&pageSize=" + pageSize;
        countUrl = '/queryByTagCount?tag=' + tag;
      }else {
        queryUrl = '/queryBlogByPage?page=' + (page - 1) + "&pageSize=" + pageSize
        countUrl = '/queryBlogCount'
      }

      axios({
        method: 'get',
        url: queryUrl
      }).then( res => {
        const data = this.formatArticleData(res.data.data);
        articleList.articleList = data;
        this.page = page;
      }).catch(err => {
        console.log(err)
      })

      axios({
        method: 'get',
        url: countUrl
      }).then(res => {
        console.log(res)
        this.count = res.data.data.count;
        this.generatePageTool();
      })
    },
    getUrlParams() {
      const searchUrlParam = location.search.indexOf('?') -1 ? location.search.split('?')[1].split("&"): '';
      let tag = '';
      if(searchUrlParam == '') {
        return;
      }else {
        searchUrlParam.forEach(item => {
          if(item.split('=')[0] == 'tag') {
            try {
              tag = item.split('=')[1];
            }catch(e) {
              console.log(e);
            }
          }
        })
      }
      return tag;
    },
    generatePageTool() {
      const pageNo = this.page;
      const pageSize = this.pageSize;
      const totalCount = this.count;
      let result = [];
      result.push({text: '<<', page: 1});
      if(pageNo > 2) {
        result.push({text: pageNo - 2, page: pageNo - 2});
      }

      if(pageNo > 1) {
        result.push({text: pageNo - 1, page: pageNo - 1});
      }

      result.push({text: pageNo, page: pageNo});

      if(pageNo + 1 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({text: pageNo + 1, page:pageNo + 1})
      }

      if(pageNo + 2 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({text: pageNo + 2, page:pageNo + 2})
      }

      result.push({text: '>>', page: parseInt((totalCount + pageSize - 1) / pageSize)});
      this.pageNumList = result;
      return result
    },
    jumpTo(page) {
      // if(page <= 1) {
      //   return
      // }
      this.getPage(page, this.pageSize);
    },
    formatArticleData(data) {
      const list = [];
      data.forEach( item => {
        if(item) {
          list.push({
            title: item.title,
            content: item.content,
            date: moment(item.ctime).format("YYYY-MM-DD HH:mm:ss"),
            view: item.views,
            tags: item.tags,
            id: item.id,
            link: "/blog-detail.html?bid=" + item.id
          })
        }

      })
      return list
    }
  },

})