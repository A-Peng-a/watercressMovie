// pages/movies/movies.js
const app = getApp()
var oUtils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //请求返回的数据
    starsArr: [],
    arrUrl: [
      'in_theaters',
      'coming_soon',
      'top250'
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  oRequest: function(index, url) {
    var that = this;
    wx: wx.request({
      url: app.globalData.url + url,
      data: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b',
        count: 5,
        start: 0,
        city: '南宁'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencode"
      },
      success: function(res) {
        console.log(res)
        that.data.list[index] = oUtils.newMovies(res.data, "movie");
        that.setData({
          list: that.data.list,
        })
        wx.hideLoading({
          title: '数据加载中',
        })
      }
    })
  },
  onLoad: function(options) {
    var that = this;
    for (var index in that.data.arrUrl) {
      that.oRequest(index, that.data.arrUrl[index])
    }
    wx.showLoading({
      title: '数据加载中',
    })
  },

  //点击更多时判断应跳转的页面
  clickMore: function(e) {
    var idx_Num = e.target.dataset.id;
    console.log(idx_Num)
    wx.navigateTo({
      url: '../moreMovies/moreMovies?pageId=' + idx_Num,
    })
  },
  //页面跳转传值
  movieDetails: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../movieDetails/movieDetails?movie_Id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})