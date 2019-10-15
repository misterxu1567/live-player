<template>
  <div id="app">
    <div class="liveVideo">
      <LivePlayer
        v-if="liveOpts"
        :opts="liveOpts"
        @legibilityChange="legibilityChange"
        style="position:absolute;left:0;top:0;width:100%;height:100%;"
      />
    </div>
  </div>
</template>

<script>
import LivePlayer from "@/components/LivePlayer";

export default {
  name: "page",
  components: {
    LivePlayer
  },
  data() {
    return {
      liveOpts: {
        id: 1,
        source: "http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8", // cctv1
      } // id, source
    };
  },
  methods: {
    // 监听清晰度变化
    legibilityChange(val) {
      // ...
    }
  }
};
</script>

<style>
@import "./assets/css/main.less";
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
}
/* 动态响应视频宽度变化 */
.liveVideo {
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  position: relative;
}
</style>
