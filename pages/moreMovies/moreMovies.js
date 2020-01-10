// pages/comingMovies/comingMovies.js
const app = getApp()  //初始化
var oUtils = require("../../utils/util.js");     //引入utils
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //接收请求返回数据
    off: true, //用于下滑懒加载无内容时不请求数据开关
    arrUrl: ['in_theaters', 'coming_soon', 'top250'],
    url: '',
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据传过来的值请求接口
    this.setData({
      url: this.data.arrUrl[options.pageId]
    })
    //未请求成功前提示正在加载
    wx.showLoading({
      title: '数据加载中',
    })

    //请求数据
    this.getMovies();

  },

  //请求事件
  getMovies: function () {
    var that = this;
    var url = that.data.url;
    var lenNum = that.data.list.length;     //获取当前页面的电影个数
    if (lenNum == 0) {
      that.setData({
        totalNum: lenNum + 10,
      })
    }
    wx: wx.request({
      url: app.globalData.url + url,
      data: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        count: 10,
        start: lenNum,
        city: '南宁'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencode"
      },
      success: function (res) {
        //更改页面标题
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        //获取星星评分
        var startNum;
        for (var i = 0; i < res.data.subjects.length; i++) {
          startNum = oUtils.getstart(res.data.subjects[i].rating.average);
          res.data.subjects[i].ostartNum = startNum;
        }
        //添加最新获取的数据
        var newArr = that.data.list.concat(oUtils.newMovies(res.data, "more"))
        that.setData({
          list: newArr
        })

        //如果没有数据返回
        if (res.data.subjects.length == 0) {
          wx.showToast({
            title: '没有更多了',
            image: '../img/kulian.png',
            duration: 2000
          })
          that.setData({
            off: false
          })
        }
        //请求成功后隐藏等待加载提示
        wx.hideLoading({})

      }
    })
  },
  //页面跳转传值
  movieDetails: function (e) { //获取当前点击电影id传至详情页面
    wx.navigateTo({
      url: '../movieDetails/movieDetails?movie_Id=' + e.currentTarget.dataset.id,
    })
  },

  //
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    if (this.data.off) { //如果还有请求还有数据返回的话off状态为true
      wx.showLoading({
        title: '数据加载中',
      })
      this.getMovies();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})