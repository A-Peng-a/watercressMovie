// pages/books/books.js
var oUtils = require('../../utils/util.js');
const db = wx.cloud.database();
const book = db.collection('books');
import Dialog from '../../dist/dialog/dialog'; //引入弹窗
import Toast from '../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookLists: [], //接受传输过来的数据
    value: 3.5 //星星个数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      selector: '#custom-selector',
      mask: true,
      message: '加载中...'
    });

    this.getBookData() //调用获取数据库数据并渲染到页面方法
  },
  getBookData: function() { //获取数据库数据并渲染到页面方法
    var that = this;
    book.get({
      success(resData) {
        console.log(resData.data)
        that.setData({
          bookLists: oUtils.newBook(resData.data) //newbook抽取所需要的数据
        })
        Toast.clear();
        wx.hideNavigationBarLoading(); // 隐藏导航栏加载框 
        wx.stopPullDownRefresh(); // 停止下拉动作
      }
    })
  },
  more: function(e) { //详情页跳传传值
    var book = JSON.stringify(this.data.bookLists[e.currentTarget.id])
    wx.navigateTo({
      url: '../bookDetails/bookDetails?n=' + book

    })
  },
  //弹窗
  onClose(event) {
    var that = this;
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'

        }).then(() => {
          instance.close();
          //删除
          book.doc(event.detail.name).remove({
            success: function(res) {
              that.getBookData()
              Toast.success({
                forbidClick: true, // 禁用背景点击
                selector: '#success',
                message: '已删除'
              });
            }
          })
        }).catch(() => console.log('已取消'));
        break;
    }
  },

  //点击扫码
  scan: function() {
    var that = this;
    //扫码请求
    wx.scanCode({
      success(scanRes) {
        wx: wx.request({
          url: 'https://api.douban.com/v2/book/isbn/' + scanRes.result,
          data: {
            apikey: '0b2bdeda43b5688921839c8ecb20399b'
          },
          header: {
            "Content-Type": "application/x-www-form-urlencode"
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res.data)
            if (that.bookpanduan(res.data)) { //调用判定书本书否重复函数
              that.add(res.data) //将扫码获取到的数据添加到数据库
            } else {
              wx.showToast({
                title: '书本已存在',
                image: '../img/kulian.png',
                duration: 2000
              })
            }

          },
          fail: function(res) {
            console.log('请求失败')
          },
          complete: function(res) {},
        })
      }
    })
  },
  bookpanduan: function(obj) { //判定书本书否重复函数
    var that = this;
    var off = true;
    var bookarr = that.data.bookLists;
    for (var index in bookarr) {
      if (bookarr[index].id == obj.id) { //根据书本id比较判断是否已存在
        off = false;
      }

    }
    return off
  },
  add: function(data) { //添加数据到数据库
    var that = this;
    //添加
    book.add({
      // data 字段表示需新增的 JSON 数据
      data: data,
      success: function(res) {
        that.getBookData();
        Toast.success({
          forbidClick: true, // 禁用背景点击
          selector: '#success',
          message: '添加成功'
        });
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
    wx.showNavigationBarLoading();
    this.getBookData();
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