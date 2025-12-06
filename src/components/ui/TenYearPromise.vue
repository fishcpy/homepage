<template>
  <div class="relative bg-gradient-to-r from-slate-600/80 to-stone-700/80 dark:from-slate-700/80 dark:to-stone-800/80 rounded-lg p-6 text-white shadow-xl backdrop-blur-lg border border-white/20 dark:border-gray-700/20">
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center mb-4">
          <h3 class="text-xl font-bold mr-4 text-white">十年之约</h3>
          <div class="w-12 h-12 rounded-full overflow-hidden bg-white/30 border border-white/50 shadow-lg backdrop-blur-md">
            <img
              :src="personalStore.avatar"
              :alt="personalStore.fullName"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <p class="text-slate-100 dark:text-slate-200 text-sm mb-4">
          从 {{ startDate }} 开始的坚持之路
        </p>
        <div class="flex items-center space-x-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-white">{{ yearsPassed }}</div>
            <div class="text-xs text-slate-200 dark:text-slate-300">年</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-amber-200">{{ remainingDaysInYear }}</div>
            <div class="text-xs text-slate-200 dark:text-slate-300">天</div>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="mt-2 text-xs text-slate-200 dark:text-slate-300">
          坚持中
        </div>
      </div>
    </div>
    
    <div class="mt-5 bg-white/20 rounded-lg p-4 border border-white/30 backdrop-blur-sm shadow-inner">
       <div class="flex justify-between items-center text-sm text-white/90 mb-2">
         <span>进度</span>
         <span>{{ progressPercentage }}%</span>
       </div>
       <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
         <div 
           class="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
           :style="{ width: progress + '%' }"
         ></div>
       </div>
       <div class="text-xs text-slate-200 dark:text-slate-300 mt-2">
         还有 {{ remainingDays }} 天到达十年目标
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { usePersonalStore } from '@/stores/personal'

const personalStore = usePersonalStore()

// 十年之约开始日期
const startDate = new Date('2024-09-06')
const currentDate = ref(new Date())



// 计算已过天数
const daysPassed = computed(() => {
  const diffTime = currentDate.value.getTime() - startDate.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
})

// 计算已过年数
const yearsPassed = computed(() => {
  return Math.floor(daysPassed.value / 365)
})

// 计算剩余天数（扣除整年后）
const remainingDaysInYear = computed(() => {
  return daysPassed.value % 365
})

// 计算进度百分比（十年 = 3650天）
const progress = computed(() => {
  const totalDays = 365 * 10
  return Math.min((daysPassed.value / totalDays) * 100, 100)
})

const progressPercentage = computed(() => {
  return progress.value.toFixed(2)
})

// 计算剩余天数
const remainingDays = computed(() => {
  const totalDays = 365 * 10
  return Math.max(totalDays - daysPassed.value, 0)
})

// 定时器更新当前日期
let timer: number

onMounted(() => {
  timer = setInterval(() => {
    currentDate.value = new Date()
  }, 1000 * 60 * 60) // 每小时更新一次
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>