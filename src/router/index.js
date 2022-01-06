import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 滑块验证
import VuePuzzleVcode from '@/page/vue-puzzle-vcode'
// 富文本
import Tinymce from '@/page/tinymce'
// 图片截取
import VueCropper from '@/page/vue-cropper'
// 监禁加载图片
import ProgressiveImage from '@/page/progressive-image'
// PDF预览
import PDFJS from '@/page/pdfjs'

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/vue-puzzle-vcode', name: 'VuePuzzleVcode', component: VuePuzzleVcode },
    { path: '/tinymce', name: 'Tinymce', component: Tinymce },
    { path: '/vue-cropper', name: 'VueCropper', component: VueCropper },
    { path: '/progressive-image', name: 'ProgressiveImage', component: ProgressiveImage },
    { path: '/pdf-viewer', name: 'PDFJS', component: PDFJS },
  ],
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

export default router
