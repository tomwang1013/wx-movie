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

  lifetimes: {
    ready() {
      this.innerAudioContext = wx.createInnerAudioContext();
      this.innerAudioContext.src = this.properties.audioFile;

      // 开始播放
      this.innerAudioContext.onPlay(() => {
        this.setData({
          playing: true
        })
      })

      // 播放完了自然停止
      this.innerAudioContext.onEnded(() => {
        this.setData({
          playing: false
        })
      })

      // 手动停止
      this.innerAudioContext.onStop(() => {
        this.setData({
          playing: false
        })
      })

      // 发生错误
      this.innerAudioContext.onError(err => {
        wx.showModal({
          title: '播放失败',
          content: JSON.stringify(err),
        })
      })
    }
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
    }
  }
})
