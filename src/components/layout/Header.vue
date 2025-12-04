<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-b border-gray-300/20 dark:border-gray-700/20">
    <nav class="max-w-7xl mx-auto px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo区域 -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="https://file.fis.ink/img/fishcpy/logo_c.png" 
                alt="fishcpy logo" 
                class="w-full h-full object-cover" 
              />
            </div>
            <span class="font-medium text-gray-900 dark:text-white text-lg">
              {{ personalStore.fullName }}
            </span>
          </router-link>
        </div>
        
        <!-- 中央导航菜单 -->
        <div class="hidden md:flex items-center bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-1 py-1 border border-gray-400/30 dark:border-gray-600/30">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
            :class="[
              $route.path === item.href
                ? 'text-white bg-blue-500/80 backdrop-blur-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300/50 dark:hover:bg-gray-800'
            ]"
          >
            {{ item.name }}
          </router-link>
        </div>
        
        <!-- 右侧操作区 -->
        <div class="flex items-center space-x-3">
          <ThemeToggle />
          
          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-300 dark:border-gray-700">
        <div class="space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block px-4 py-2 text-base font-medium rounded-lg transition-colors"
            :class="[
              $route.path === item.href
                ? 'text-white bg-blue-500/80 backdrop-blur-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300/50 dark:hover:bg-gray-800'
            ]"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePersonalStore } from '@/stores/personal'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const personalStore = usePersonalStore()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: '首页', href: '/' },
  { name: '关于我', href: '/about' },
  { name: '文章', href: '/articles' },
  { name: '项目作品', href: '/portfolio' },
  { name: '我的网站', href: '/sites' },
  { name: '赞助支持', href: '/sponsor' }
]

// 移动端菜单控制
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>