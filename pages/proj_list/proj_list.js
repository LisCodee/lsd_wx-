// pages/proj_list/proj_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    act_msg: [{
        proj_id:'1',
        proj_name: '微信小程序',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠',
      },

      {
        proj_name: '微信小程序02',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠02',
      },
      {
        proj_name: '微信小程序02',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠02',
      },
      {
        proj_name: '微信小程序02',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠02',
      },
      {
        proj_name: '微信小程序02',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠02',
      },
      {
        proj_name: '微信小程序02',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠02',
      },
       {
        proj_name: '微信小程序02',
        proj_time: '时间:09月01日 周日 17:00',
        proj_leader: '吴楠02',
      },
    ],

  },
  change: function(e) {
    console.log(e);
    this.setData({
      num: e.target.dataset.num
    })
  },
  send: function(e) {
    wx.navigateTo({
      url: '../create_proj/create_proj',
    })
  },
  boss_proj_detail: function(e) {
    wx.navigateTo({
      url: '../boss_proj_detail/boss_proj_detail',
    })
  }
})