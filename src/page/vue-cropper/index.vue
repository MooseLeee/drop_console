<template>
  <div class="cropper">
    <div
      :style="previews.div"
      class="preview">
      <img
        :style="previews.img"
        :src="previews.url">
    </div>
    <vue-cropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.outputSize"
      :outputType="option.outputType"
      :info="option.info"
      :canScale="option.canScale"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :fixed="option.fixed"
      :fixedNumber="option.fixedNumber"
      :full="option.full"
      :fixedBox="option.fixedBox"
      :canMove="option.canMove"
      :canMoveBox="option.canMoveBox"
      :original="option.original"
      :centerBox="option.centerBox"
      :height="option.height"
      :infoTrue="option.infoTrue"
      :maxImgSize="option.maxImgSize"
      :enlarge="option.enlarge"
      :mode="option.mode"
      @realTime="realTime"
      @imgLoad="imgLoad"/>
    <div class="toolbar">
      <el-button
        @click="selectPicture"
        type="primary">选择图片</el-button>
      <el-button
        @click="onRotated(0)"
        icon="el-icon-refresh-left"
        type="warning">左旋转</el-button>
      <el-button
        @click="onRotated(1)"
        icon="el-icon-refresh-right"
        type="warning">右旋转</el-button>
      <el-button
        @click="onUpload('blob')"
        icon="el-icon-upload"
        type="success">上传封面</el-button>
    </div>
    <input
      @change="onSelected"
      ref="img"
      accept="image/*"
      type="file"
      style="display:none;">
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: "index",
  data() {
    return {
      previews: {},
      option: {
        img: '',               // 裁剪图片的地址
        outputSize: 1,         // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png',     // 裁剪生成图片的格式（jpeg || png || webp）
        info: true,            // 图片大小信息
        canScale: true,        // 图片是否允许滚轮缩放
        autoCrop: true,        // 是否默认生成截图框
        autoCropWidth: 200,    // 默认生成截图框宽度
        autoCropHeight: 150,   // 默认生成截图框高度
        fixed: true,           // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1],   // 截图框的宽高比例
        full: false,           // false按原比例裁切图片，不失真
        fixedBox: true,        // 固定截图框大小，不允许改变
        canMove: false,        // 上传图片是否可以移动
        canMoveBox: true,      // 截图框能否拖动
        original: false,       // 上传图片按照原始比例渲染
        centerBox: false,      // 截图框是否被限制在图片里面
        height: true,          // 是否按照设备的dpr 输出等比例图片
        infoTrue: false,       // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,      // 限制图片最大宽度和高度
        enlarge: 1,            // 图片根据截图框输出比例倍数
        mode: '200px 150px',   // 图片默认渲染方式
      },
    }
  },
  components: {
    VueCropper,
  },
  methods: {
    //实时预览函数
    realTime (data) {
      this.previews = data
    },
    //初始化函数
    imgLoad (msg) {
      console.log('工具初始化函数=====' + msg)
    },
    // 选择图片
    selectPicture() {
      this.$refs.img.click()
    },
    onSelected(e) {
      const reader = new FileReader()
      //转化为blob
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      //转化为base64
      const file = e.target.files[0]
      reader.readAsDataURL(file)
    },
    // 旋转图片
    onRotated(type) {
      if (type) {
        // 右转
        this.$refs.cropper.rotateRight()
      } else {
        // 左转
        this.$refs.cropper.rotateLeft()
      }
    },
    // 上传图片
    onUpload(type) {
      if (type === 'blob') {
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          const formData = new FormData()
          formData.append('file', data, 'example.jpg')
          console.log(data, '====')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cropper {
  position: relative;
  margin: auto;
  width: 500px;
  height: 500px;
  .preview {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100%);
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .toolbar {
    margin-top: 10px;
  }
}
</style>