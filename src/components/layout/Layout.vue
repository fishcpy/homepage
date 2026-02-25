<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 flex flex-col relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gray-400/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/3 -left-20 w-60 h-60 bg-gray-500/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gray-600/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-gray-300/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
    </div>
    
    <Header />

    <main class="flex-1 relative z-10 pt-16">
    <Transition 
      :name="transitionName" 
      mode="out-in"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <RouterView :key="$route.fullPath" />
    </Transition>
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './Header.vue'
import Footer from './Footer.vue'

const route = useRoute()
const transitionName = ref('page')
const prevRoute = ref('')

// 路由顺序映射，用于判断前进还是后退
const routeOrder = {
  '/': 0,
  '/about': 1,
  '/articles': 2,
  '/portfolio': 3,
  '/sites': 4,
  '/sponsor': 5
}

// 监听路由变化，动态设置过渡动画
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (!oldPath) {
      transitionName.value = 'page'
      return
    }
    
    const newIndex = routeOrder[newPath as keyof typeof routeOrder] ?? -1
    const oldIndex = routeOrder[oldPath as keyof typeof routeOrder] ?? -1
    
    if (newIndex > oldIndex) {
      // 前进动画
      transitionName.value = 'page-forward'
    } else if (newIndex < oldIndex) {
      // 后退动画
      transitionName.value = 'page-backward'
    } else {
      // 默认动画
      transitionName.value = 'page'
    }
    
    prevRoute.value = oldPath
  },
  { immediate: true }
)

// 动画生命周期钩子
const onBeforeEnter = (el: Element) => {
  // 添加进入前的准备工作
  ;(el as HTMLElement).style.transformOrigin = 'center center'
}

const onEnter = (el: Element, done: () => void) => {
  // 进入动画完成后的回调
  setTimeout(() => {
    done()
  }, 600)
}

const onLeave = (el: Element, done: () => void) => {
  // 离开动画完成后的回调
  setTimeout(() => {
    done()
  }, 400)
}

</script>

<style scoped>
.page-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 1, 0.45);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(100px) rotateY(15deg) scale(0.9);
  filter: blur(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-50px) rotateY(-10deg) scale(1.05);
  filter: blur(5px);
}

.page-enter-to {
  opacity: 1;
  transform: translateX(0) rotateY(0deg) scale(1);
  filter: blur(0px);
}

.page-leave-from {
  opacity: 1;
  transform: translateX(0) rotateY(0deg) scale(1);
  filter: blur(0px);
}

/* 添加3D透视效果 */
main {
  perspective: 1200px;
  perspective-origin: center center;
}

/* 前进动画 - 从右侧滑入 */
.page-forward-enter-active {
  transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}

.page-forward-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 1, 0.45);
}

.page-forward-enter-from {
  opacity: 0;
  transform: translateX(120px) rotateY(25deg) scale(0.85);
  filter: blur(12px) brightness(1.2);
}

.page-forward-leave-to {
  opacity: 0;
  transform: translateX(-80px) rotateY(-15deg) scale(1.1);
  filter: blur(8px) brightness(0.8);
}

/* 后退动画 - 从左侧滑入 */
.page-backward-enter-active {
  transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}

.page-backward-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 1, 0.45);
}

.page-backward-enter-from {
  opacity: 0;
  transform: translateX(-120px) rotateY(-25deg) scale(0.85);
  filter: blur(12px) brightness(1.2);
}

.page-backward-leave-to {
  opacity: 0;
  transform: translateX(80px) rotateY(15deg) scale(1.1);
  filter: blur(8px) brightness(0.8);
}

/* 添加页面切换时的动态背景效果 */
@keyframes backgroundPulse {
  0% {
    background-size: 100% 100%;
    filter: brightness(1);
  }
  50% {
    background-size: 110% 110%;
    filter: brightness(1.05);
  }
  100% {
    background-size: 100% 100%;
    filter: brightness(1);
  }
}

/* 为页面容器添加动态效果 */
.page-forward-enter-active,
.page-backward-enter-active {
  animation: backgroundPulse 0.7s ease-in-out;
}

/* 添加微妙的阴影动画 */
@keyframes shadowFlow {
  0% {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
  100% {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
}

/* 为所有页面切换添加阴影效果 */
.page-enter-active,
.page-forward-enter-active,
.page-backward-enter-active {
  animation: shadowFlow 0.6s ease-in-out;
}
</style>
