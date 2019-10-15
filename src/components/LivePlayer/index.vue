<template>
  <div class="LivePlayer">
    <video
      ref="myPlayer"
      :id="id"
      class="video-js vjs-big-play-centered vjs-fluid"
      width="500"
      height="500"
      autoplay
      allow="autoplay"
      preload
    >
      <source :src="opts.source" />
      <p class="vjs-no-js">不支持播放</p>
    </video>
    <!-- 自定义控制栏 -->
    <div class="livePlayerCtrl" ref="customCtrlBar">
      <span class="type">直播</span>
      <!-- 全屏 -->
      <i class="iconfont icon-quanping fillBtn" @click="enterFullScreen" />
      <!-- 声音 -->
      <div class="volume">
        <i class="volumeBtn iconfont icon-shengyin" @click="showVolume = !showVolume" />
        <SliderVertical v-show="showVolume" v-model="volumeVal" :max="100" :min="0" />
      </div>
      <!-- 清晰度-->
      <Select v-model="legibilityVal" class="legibility" @on-change="legibilityChange">
        <Option v-for="item in legibility" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
//引入video样式
import "video.js/dist/video-js.css";
import videojs from "video.js";
import "videojs-flash";
import Lib from "@/lib";
import SliderVertical from "./components/SliderVertical";

export default {
  name: "",
  props: {
    opts: {
      type: Object,
      required: false
    }
  },
  components: {
    SliderVertical
  },
  data() {
    return {
      legibility: [
        {
          label: "超清",
          value: 2
        },
        {
          label: "高清",
          value: 1
        },
        {
          label: "流畅",
          value: 0
        }
      ],
      legibilityVal: 1, // 默认清晰度
      volumeVal: 40, // 声音大小
      showVolume: false // 声音拖动条切换
    };
  },
  computed: {
    // 动态设置id，兼容一屏多个直播视频
    id() {
      let id = Lib.createRandomId();
      return `my-player-${id}`;
    }
  },
  mounted() {
    this.player = videojs(this.id); // 视频对象
    this.player.volume(0);
  },
  methods: {
    // 全屏
    enterFullScreen() {
      Lib.launchFullscreen(document.getElementById(this.id));
    },
    // 监听清晰度变化
    legibilityChange() {
      this.$emit("legibilityChange", this.legibilityVal);
    },
    // 音量提示
    format(val) {
      return "音量 " + val;
    }
  },
  watch: {
    // 监听视频切换，重载
    "opts.source": function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.player.src(newVal);
        this.player.load(newVal);
        this.player.play();
      }
    },
    // 监听声音大小变化
    volumeVal: function(newVal) {
      this.player.volume(newVal / 100);
    }
  },
  destroyed() {
    // 销毁video实例
    this.player.dispose();
    this.player = null;
  }
};
</script>

<style scoped lang="less">
.LivePlayer {
  position: relative;
  display: inline-block;
  // background: #000;
}
.video-js {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #ccc;
  * {
    outline: none;
  }
}
// vjs-control-bar
.vjs-control-bar {
  display: none; // 隐藏video.js自带的控制栏
}
.livePlayerCtrl {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 12px;
  box-sizing: border-box;
  .type {
    float: left;
    padding-left: 10px;
    margin-right: 5px;
    &::before {
      content: "";
      float: left;
      margin-top: 16px;
      width: 4px;
      height: 4px;
      background-color: #22d6af;
      border-radius: 50%;
      margin-right: 4px;
    }
  }
  .volume {
    float: right;
    position: relative;
    .volumeBtn {
      font-size: 14px;
      text-align: center;
      line-height: 36px;
      padding: 0 10px;
      box-sizing: content-box;
      cursor: pointer;
    }
  }
  .legibility {
    float: right;
    width: 60px;
    height: 36px;
    color: #fff;
    text-align: center;
    // 覆盖
    /deep/.ivu-select-selection {
      background: none;
      border: none;
      height: 100%;
      color: #fff;
      box-shadow: none;
      .ivu-select-selected-value {
        padding: 0 10px;
        text-align: center;
        line-height: 36px;
      }
      .ivu-icon {
        display: none;
      }
    }
  }
  .fillBtn {
    float: right;
    padding: 0 10px;
    font-size: 16px;
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    text-align: right;
  }
}

// 覆盖
.video-js .vjs-big-play-button {
  height: 3em;
  line-height: 3em;
  border-radius: 50%;
  border-width: 1px;
  font-size: 20px;
}
</style>
