// pages/boss_index/boss_index.js
const app = getApp()
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

  gotoprojlist:function(param){
    console.log(param);
    wx.navigateTo({
      url: '../proj_list/proj_list',
    })
  },
  gotosaleslist:function(e){
    wx.navigateTo({
      url: '../view_salesman/view_salesman',
    })
  }
})