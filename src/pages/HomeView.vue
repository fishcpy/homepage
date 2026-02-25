<template>
  <div 
    class="min-h-screen bg-black"
  >
    <!-- Hero Banner Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Prism Background -->
      <div class="absolute inset-0 w-full h-full bg-black z-0 pointer-events-none">
        <Prism
          animation-type="rotate"
          :time-scale="0.5"
          :height="3.5"
          :base-width="5.5"
          :scale="3.6"
          :hue-shift="0"
          :color-frequency="1"
          :noise="0.08"
          :glow="1"
          class="block w-full h-full"
        />
      </div>

      
      <!-- Main Content -->
      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <!-- Avatar (Mobile First) -->
        <div class="flex-shrink-0 mb-8 lg:mb-0 lg:order-2 lg:ml-12">
          <div class="relative">
            <div class="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-sm">
              <img
                :src="personalStore.info.avatar"
                :alt="personalStore.fullName"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Glow effect around avatar -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-500/20 blur-xl -z-10"></div>
          </div>
        </div>
        
        <!-- Profile Info -->
        <div class="flex-1 max-w-2xl text-center lg:text-left lg:order-1">
          <div class="animate-fade-in-up">
            <div class="mb-6">
              <SplitText
                :text="personalStore.info.title"
                class-name="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
                :delay="100"
                :duration="0.8"
                ease="power3.out"
                split-type="chars"
                :from="{ opacity: 0, y: 60, rotationX: -90 }"
                :to="{ opacity: 1, y: 0, rotationX: 0 }"
                :threshold="0.2"
                text-align="left"
              />
            </div>
            
            <SplitText
              :text="`我是${personalStore.fullName}`"
              class-name="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4"
              :delay="120"
              :duration="0.6"
              ease="power2.out"
              split-type="chars"
              :from="{ opacity: 0, y: 30, scale: 0.8 }"
              :to="{ opacity: 1, y: 0, scale: 1 }"
              :threshold="0.1"
              text-align="left"
            />
            
            <SplitText
              :text="personalStore.info.bio"
              class-name="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              :delay="80"
              :duration="0.5"
              ease="power2.out"
              split-type="words"
              :from="{ opacity: 0, y: 20 }"
              :to="{ opacity: 1, y: 0 }"
              :threshold="0.1"
              text-align="left"
            />
            
            <!-- Social Links -->
            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                v-for="link in personalStore.info.socialLinks"
                :key="link.platform"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-white/20 dark:bg-white/10 backdrop-blur-md border border-gray-300/30 dark:border-white/20 rounded-lg hover:bg-white/30 dark:hover:bg-white/20 hover:border-gray-400/40 dark:hover:border-white/30 transition-all duration-300 shadow-lg"
              >
                <Github v-if="link.icon === 'github'" class="w-4 h-4 mr-2" />
                <ExternalLink v-else-if="link.icon === 'globe'" class="w-4 h-4 mr-2" />
                {{ link.platform }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section id="portfolio" class="py-12 relative">
      <div class="absolute inset-0 bg-white/30 dark:bg-black/20 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8 animate-fade-in-up text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg">
            我的项目
          </h2>
          <p class="text-gray-700 dark:text-gray-200 drop-shadow-sm">
            乱七八糟的东西
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProjectMagicCard
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            :enable-stars="true"
            :enable-spotlight="true"
            :enable-border-glow="true"
            :enable-tilt="false"
            :enable-magnetism="true"
            :click-effect="true"
            :spotlight-radius="250"
            :particle-count="6"
            glow-color="132, 0, 255"
            :style="{ animationDelay: `${index * 0.1}s` }"
            class="project-card"
          >
            <div class="aspect-video bg-gray-100/50 dark:bg-black/20 flex items-center justify-center overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 drop-shadow-md">{{ project.title }}</h3>
              <p class="text-gray-700 dark:text-gray-200 mb-4 text-sm leading-relaxed">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 text-xs text-gray-800 dark:text-white bg-gray-200/60 dark:bg-white/20 backdrop-blur-sm rounded-full border border-gray-300/40 dark:border-white/30"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 text-sm">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  访问>
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  代码
                </a>
              </div>
            </div>
          </ProjectMagicCard>
        </div>
        
        <div class="mt-8 text-center">
          <a
            href="/portfolio"
            class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 text-sm transition-colors duration-200 inline-block font-medium"
          >
            查看所有项目 →
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Sites Section -->
    <section class="py-12 relative">
      <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 animate-fade-in-up text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg">
            网站
          </h2>
          <p class="text-gray-700 dark:text-gray-200 drop-shadow-sm">
            一些在线的东西
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MagicCard
            v-for="(site, index) in featuredSites"
            :key="site.id"
            :glow-color="index % 3 === 0 ? '236, 72, 153' : index % 3 === 1 ? '59, 130, 246' : '16, 185, 129'"
            :spotlight-radius="300"
            :enable-border-glow="true"
            :enable-spotlight="true"
            :click-effect="true"
            class="site-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="aspect-video bg-gray-100/50 dark:bg-black/20 flex items-center justify-center overflow-hidden">
              <img
                :src="site.image"
                :alt="site.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 drop-shadow-md">{{ site.title }}</h3>
              <p class="text-gray-700 dark:text-gray-200 mb-4 text-sm leading-relaxed">{{ site.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in site.technologies"
                  :key="tech"
                  class="px-3 py-1 text-xs text-gray-800 dark:text-white bg-gray-200/60 dark:bg-white/20 backdrop-blur-sm rounded-full border border-gray-300/40 dark:border-white/30"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 text-sm">
                <a
                  :href="site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  访问>
                </a>
                <a
                  v-if="site.githubUrl"
                  :href="site.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  代码
                </a>
              </div>
            </div>
          </MagicCard>
        </div>
        
        <div class="mt-8 text-center">
          <a
            href="/sites"
            class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 text-sm transition-colors duration-200 inline-block font-medium"
          >
            查看所有网站 →
          </a>
        </div>
      </div>
    </section>

    <!-- Ten Year Promise Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            十年之约
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            从2024年9月6日开始，记录这段时光
          </p>
        </div>
        
        <TenYearPromise />
      </div>
    </section>


  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.project-card {
  animation: fadeInUp 0.6s ease-out both;
}

.site-card {
  animation: fadeInUp 0.6s ease-out both;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { ExternalLink, Github } from 'lucide-vue-next'
import { usePersonalStore } from '@/stores/personal'
import { useProjectsStore } from '@/stores/projects'
import { useSitesStore } from '@/stores/sites'
import TenYearPromise from '@/components/ui/TenYearPromise.vue'
import SplitText from '@/components/SplitText.vue'
import ProjectMagicCard from '@/components/vue-bits/ProjectMagicCard.vue'
import MagicCard from '@/components/ui/MagicCard.vue'
import Prism from '@/components/Prism.vue'

const personalStore = usePersonalStore()
const projectsStore = useProjectsStore()
const sitesStore = useSitesStore()
const featuredProjects = computed(() => projectsStore.featuredProjects)
const featuredSites = computed(() => sitesStore.featuredSites)
</script>
