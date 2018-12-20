// components/comment-audio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audioFile: String,  // 播放文件路径
    duration: Number    // 文件时长
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false  // 是否正在播放
  },

  created() {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.src = this.properties.audioFile;
    this.innerAudioContext.onError(err => {
      wx.showModal({
        title: '播放失败',
        content: err,
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play() {
      if (this.data.playing) {
        this.innerAudioContext.stop();
      } else {
        this.innerAudioContext.play();
      }

      this.setData({
        playing: !this.data.playing
      })
    }
  }
})
