//最初加载页面时的url
var url = 'https://wangyi.butterfly.mopaasapp.com/news/api?type=war&page=1&limit=10';

var colors = {
      war: '#BDC6B8',
      sport: '#BDC6B8',
      tech: '#BDC6B8',
      edu: '#BDC6B8',
      ent: '#BDC6B8',
      money: '#BDC6B8',
      gupiao: '#BDC6B8',
      travel: '#BDC6B8'
    }

//点击某类新闻时导航栏上对应的字变为红色
var changeColor = function (curColor){
    for (var i in colors){
      if (i == curColor){
        colors[i] = 'red';
      }else{
        colors[i] = '#BDC6B8';
      }
    }
  }

Page({
  data:{
    newslist:[],
    page: 1,
    newstype: 'war',
    scrollHeight: 0,
    hidden: true,
    color: {
      war: 'red',
      sport: '#BDC6B8',
      tech: '#BDC6B8',
      edu: '#BDC6B8',
      ent: '#BDC6B8',
      money: '#BDC6B8',
      gupiao: '#BDC6B8',
      travel: '#BDC6B8'
    }
  },

  // 页面初始化 options为页面跳转所带来的参数
  onLoad:function(options){
    var _this = this;
   this.setData({
      hidden: false, // 阴藏或显示加载更多
    });

   // 网络请求
   wx.request({
      url: url,
      method: 'post',
      success: (res) => {
        _this.setData({
            newslist: res.data.list,
            hidden: true
        });
      }
    });
    //获得窗口的高度，在划到页面最底部时加载更多要用
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  //浏览某条新闻
  browsing: function(event){
    var newstype = event.currentTarget.id;
    changeColor(newstype);
    this.setData({
      newstype: newstype,
      color: colors
    });
    url = 'https://wangyi.butterfly.mopaasapp.com/news/api?type='+ newstype + '&page=1&limit=10';
    wx.request({
      url: url,
      method: 'post',
      success: (res) => {
        this.setData({
            newslist: res.data.list,
            page: 1
        });
      }
    });
  },

  //下拉或上拉加载更多
  loadmore: function (event){
    this.setData({
      hidden: false,
      page: this.data.page + 1
    });
    url = 'https://wangyi.butterfly.mopaasapp.com/news/api?type='+ this.data.newstype + '&page=' + this.data.page + '&limit=' + this.data.page * 10;
    wx.request({
      url: url,
      method: 'post',
      success: (res) => {
        this.setData({
            newslist: res.data.list,
            hidden: true
        });
      }
    })
  }
})