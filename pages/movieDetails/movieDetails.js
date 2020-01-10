// pages/movieDetails/movieDetails.js
var oUtils = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movie_Id: '',       //用于接收传过来的电影id
    detailsList: ''       //用于接收请求返回的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var movie_Id = options.movie_Id;
    wx.showLoading({
      title: '数据加载中',
    })

    wx: wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + movie_Id,
      data: {
        apikey: '0b2bdeda43b5688921839c8ecb20399b'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencode"
      },
      success: function(res) {

        //循环给数据加上ostarNum（星星数组），用于页面渲染
        var startNum;
        res.data.ostartNum = null;
        startNum = oUtils.getstart(res.data.rating.average);
        res.data.ostartNum = startNum;
        // console.log(res.data)
        that.setData({
          detailsList: res.data,
        })
        wx.hideLoading({
          title: '数据加载中',
        })
      }
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