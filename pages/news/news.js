var WxParse = require('../wxParse/wxParse.js');

Page({
    data:{
        news: ''
    },

    //options为页面跳转带来的参数
    onLoad: function(options){
        console.log(options.newsid);
        var _this = this;
        //网络请求，加载id对应的新闻详情
        wx.request({
      url:'https://wangyi.butterfly.mopaasapp.com/detail/api?simpleId='+ options.newsid,
      method: 'post',
      success: (res) => {
          var str = res.data.content;
          str = str.replace(/style="border: 0px; vertical-align: middle; max-width: 640px; display: block; margin: 0px auto;"/g, 'style="width: 300px"');
          console.log(str);
          //wxParse插件可以将html代码转换为wxml代码
          WxParse.wxParse('newsContent', 'html', str, _this);
      }
    })
    }
});