// pages/salesman_proj/salesman_proj.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act_msg: [{
      project_id:'1',
      peoples: ['李景新', '张光辉'],
      project_name: '富士达项目管理系统',
      time: '2019/8/30',
    },

    {
      project_id:'2',
      peoples:['李景新','张光辉'],
      project_name: '富士达项目管理系统',
      time: '2019/8/31',
    },
    ],
  },
  salesman_proj_detail:function(e){
    console.log(e.target.dataset.id)
    app.globalData.project_id = e.target.dataset.id,
    console.log("globalData.project_id:" + app.globalData.project_id)
    wx.navigateTo({
      url: '../salesman_proj_detail/salesman_proj_detail',
    })
  },
  onLoad:function(){
    var that = this
    wx.request({
      url: 'https://www.leishida.cn/search-with-salesman',
      method:"GET",
      data:{
        name:app.globalData.name
      },
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            act_msg: res.data
          })
        }
        else{
          console.log(res.statusCode)
        }
      },
      fail:function(e){
        console.log(e)
      }
    })
  }
})