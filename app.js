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
  },
  combineArray: function (a, b) {
    var result = []
    var i = 0, j = 0
    while (i < a.length && j < b.length) {
      console.log(a[i].time < b[j].time)
      if (new Date(a[i].time) > new Date(b[j].time)) {
        result.push(b[j])
        j = j + 1
      }
      else {
        result.push(a[i])
        i = i + 1
      }
    }
    if (i < a.length) {
      for (var k = i; k < a.length; k++) {
        result.push(a[k])
      }
    }
    if (j < b.length) {
      for (var k = j; k < b.length; k++) {
        result.push(b[k])
      }
    }
    console.log(result)
    return result
  }
})