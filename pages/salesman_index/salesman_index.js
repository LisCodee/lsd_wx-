// pages/boss_index/boss_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    ],
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    circular: true, // 是否采用衔接滑动
    interval: 6000, // 自动切换时间间隔
    duration: 1000, // 滑动动画时长
  },
  salesman_proj:function(e){
    wx.navigateTo({
      url: '../salesman_proj/salesman_proj',
    })
  },
  salesman_voicemail:function(e){
    wx.navigateTo({
      url: '../salesman_voicemail/salesman_voicemail',
    })
  },
  create_proj:function(e){
    wx.navigateTo({
      url: '../create_proj/create_proj',
    })
  }
})