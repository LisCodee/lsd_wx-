//app.js
const app = getApp()
App({
  globalData: {  //全局变量
    search_name:'',
    name: '',
    password: '',
    identity:'',
    project_id:'',
    message_id:''
  },
  onLaunch: function () {
    // var that = this
    // var name1,password1,identify1;
    // wx.getStorage({
    //   key: 'name',
    //   success: function(res) {
    //     console.log('name:' + res.data)
    //     name1 = res.data
    //   },
    //   fail:function(res){
    //     console.log(res)
    //   }
    // })
    // wx.getStorage({
    //   key: 'password',
    //   success: function (res) {
    //     console.log('password:' + res.data)
    //     password1 = res.data
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.getStorage({
    //   key: 'identity',
    //   success: function (res) {
    //     console.log('identity:' + res.data)
    //     identify1 = res.data     
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
    // console.log(that.globalData.identity)
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