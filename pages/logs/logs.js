//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  combineArray:function(){
    var a = [{ status: 0, report_id: '1', report_name: '雷士达项目管理系统', reporter: '王亚莉', time: '2019/08/30' }, { status: 0,         report_id: '1', report_name: '雷士达项目管理系统', reporter: '王亚莉', time: '2019/09/30' }]
    var b = [{ status: 1, content: '留言信息', time: '2019/08/31' }, { status: 1, content: '留言信息', time: '2019/10/20' }]
    var result = []
    var i = 0, j = 0
    while(i < a.length && j < b.length){
      console.log(a[i].time < b[j].time)
      if(new Date(a[i].time) > new Date(b[j].time)){
        result.push(b[j])
        j = j + 1
      }
      else{
        result.push(a[i]) 
        i = i + 1
      }
    }
    if(i < a.length){
      for(var k = i;k<a.length;k++){
        result.push(a[k])
      }
    }
    if(j < b.length){
      for(var k = j;k<b.length;k++){
        result.push(b[k])
      }
    }
    console.log(result)
  }
})
