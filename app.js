//app.js
App({
  globalData: {  //全局变量
    name: '',
    password: '',
    identity:'',
    project_id:'',
    message_id:''
  },
  onLaunch: function () {
    wx.getStorage({
      key: 'name',
      success: function(res) {
        this.globalData.name = res.data
        console.log(res.data)
      },
      key:'password',
      success:function(res){
        this.globalData.password = res.password
        console.log(res.data)
      },
      key:'identity',
      success:function(res){
        this.globalData.identity = res.data
        console.log(identity)
      }
    })
  }
})