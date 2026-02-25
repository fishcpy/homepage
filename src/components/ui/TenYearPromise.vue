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
          从 {{ startDateLabel }} 开始的坚持之路
        </p>
        <div class="flex items-center space-x-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-white">{{ yearsPassed }}</div>
            <div class="text-xs text-slate-200 dark:text-slate-300">年</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-amber-200">{{ daysIntoCurrentYear }}</div>
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
      <div class="mt-4 text-xs text-slate-200 dark:text-slate-300 space-y-0.5">
        <div class="font-semibold tracking-wide uppercase text-white/70">时间之约日志</div>
        <div>起点：{{ startDateLabel }}</div>
        <div>目标：{{ endDateLabel }}</div>
        <div>当前：{{ currentDateLabel }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { usePersonalStore } from '@/stores/personal'

const personalStore = usePersonalStore()

const MS_PER_DAY = 1000 * 60 * 60 * 24
const TEN_YEARS = 10
const startDate = new Date(2024, 8, 6)
const endDate = new Date(startDate)
endDate.setFullYear(endDate.getFullYear() + TEN_YEARS)

const zhDateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const startDateLabel = zhDateFormatter.format(startDate)
const endDateLabel = zhDateFormatter.format(endDate)

const currentDate = ref(new Date())
const totalPromiseDays = Math.round((endDate.getTime() - startDate.getTime()) / MS_PER_DAY)

const getYearsPassed = (from: Date, to: Date) => {
  let diff = to.getFullYear() - from.getFullYear()
  const monthDiff = to.getMonth() - from.getMonth()
  const dayDiff = to.getDate() - from.getDate()
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    diff -= 1
  }
  return Math.max(diff, 0)
}

const daysPassed = computed(() => {
  const diffTime = currentDate.value.getTime() - startDate.getTime()
  return Math.floor(diffTime / MS_PER_DAY)
})

const yearsPassed = computed(() => getYearsPassed(startDate, currentDate.value))

const daysIntoCurrentYear = computed(() => {
  const baseline = new Date(startDate)
  baseline.setFullYear(baseline.getFullYear() + yearsPassed.value)
  const diff = currentDate.value.getTime() - baseline.getTime()
  return diff < 0 ? 0 : Math.floor(diff / MS_PER_DAY)
})

const progress = computed(() => Math.min((daysPassed.value / totalPromiseDays) * 100, 100))
const progressPercentage = computed(() => progress.value.toFixed(2))
const remainingDays = computed(() => Math.max(totalPromiseDays - daysPassed.value, 0))
const currentDateLabel = computed(() => zhDateFormatter.format(currentDate.value))

let timer: number

onMounted(() => {
  timer = window.setInterval(() => {
    currentDate.value = new Date()
  }, 1000 * 60 * 60)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
