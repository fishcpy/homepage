<template>
  <div class="relative bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/20 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
    <div class="relative z-10 mb-3">
      <img
        v-if="props.project.image"
        :src="props.project.image"
        :alt="props.project.title"
        class="w-full h-32 object-cover rounded border border-gray-100 dark:border-gray-700"
      />
    </div>

    <h4 class="relative z-10 text-base font-medium text-gray-900 dark:text-white mb-2 drop-shadow-md">
      {{ props.project.title }}
    </h4>
    <p class="relative z-10 text-gray-700 dark:text-gray-200 text-sm mb-3 drop-shadow-sm">
      {{ props.project.description }}
    </p>
    
    <div class="relative z-10 flex flex-wrap gap-1 mb-3">
      <span
        v-for="tech in props.project.technologies.slice(0, 3)"
        :key="tech"
        class="px-2 py-1 text-xs bg-gray-200/60 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 rounded backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
      >
        {{ tech }}
      </span>
      <span
        v-if="props.project.technologies.length > 3"
        class="px-2 py-1 text-xs bg-gray-200/60 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 rounded backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
      >
        +{{ props.project.technologies.length - 3 }}
      </span>
    </div>
    
    <div class="relative z-10 text-xs text-gray-600 dark:text-gray-400 mb-3 drop-shadow-sm">
      {{ formatDate(props.project.createdAt) }}
    </div>
    
    <div class="relative z-10 flex gap-3 text-sm">
      <a
        v-if="props.project.demoUrl"
        :href="props.project.demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 font-medium drop-shadow-sm"
      >
        演示
      </a>
      <a
        v-if="props.project.githubUrl"
        :href="props.project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 font-medium drop-shadow-sm"
      >
        代码
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types'

const props = defineProps<{
  project: Project
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long'
  })
}
</script>
