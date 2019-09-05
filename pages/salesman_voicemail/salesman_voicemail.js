// pages/salesman_voicemail/salesman_voicemail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voicemail: [{
      message_id:'1',
      message: '项目做的不错',
      message_time: '2019/8/30',
    },

    {
      message_id:'1',
      message: '李市长那里给的有点多了，告诉他，如果不愿意合作的话就结束合作关系，然后你去王市长那里，我已经打过招呼了，最晚明天解决这个事情',
      message_time: '2019/8/31',
    },
    ],
  },
  salesman_proj_detail: function (e) {
    console.log(e.target.dataset.message_id)
    app.globalData.message_id = e.target.dataset.message_id
    console.log("app.globalData.message_id:" + app.globalData.message_id)
    wx.navigateTo({
      url: '../salesman_proj_detail/salesman_proj_detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/get-ones-record',
      method:"GET",
      data:{
        name:app.globalData.name
      },
      header:{
        'content-type': 'application/json'  //默认值
      },
      success:function(res){
        if(res.statusCode == 200){
          //如果正常响应
          that.setData({
            voicemail:res.data
          })
        }else{
          console(res.statusCode)
        }
      },
      fail:function(res){
        wx.showToast({
          title: '请求超时',
          icon:'none'
        })
      }
    })
  }
})