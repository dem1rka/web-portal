<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 px-6">
      <!-- Background Grid -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <!-- Badge -->
            <div class="inline-flex items-center px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <span class="text-cyan-400 text-sm font-mono uppercase tracking-widest">Live Monitoring Active</span>
            </div>

            <!-- Main Heading -->
            <div class="space-y-6">
              <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Water
                <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Intelligence
                </span>
                Platform
              </h1>
              
              <p class="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Advanced real-time monitoring of North Kazakhstan's water ecosystems. 
                Track temperature, pollution levels, and pathogen risks with precision analytics.
              </p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md">
              <div 
                class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div class="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">6</div>
                <div class="text-xs text-slate-400 uppercase tracking-wider">Water Bodies</div>
              </div>
              <div 
                class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div class="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">5</div>
                <div class="text-xs text-slate-400 uppercase tracking-wider">Lakes</div>
              </div>
              <div 
                class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div class="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">1</div>
                <div class="text-xs text-slate-400 uppercase tracking-wider">Rivers</div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                to="/map"
                class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-white font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                <span>Explore Interactive Map</span>
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </NuxtLink>
              
              <NuxtLink
                to="/analytics"
                class="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                View Analytics
              </NuxtLink>
            </div>
          </div>

          <!-- Right Content - Data Visualization -->
          <div class="relative">
            <!-- Main Card -->
            <div class="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white font-semibold text-lg">Live Water Bodies Map</h3>
                <div class="flex items-center space-x-2 text-cyan-400">
                  <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span class="text-sm font-mono">INTERACTIVE</span>
                </div>
              </div>

              <!-- Real Mini Map -->
              <div class="bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden mb-6">
                <div class="w-full h-80">
                  <LMap 
                    :zoom="miniMapZoom" 
                    :center="miniMapCenter" 
                    :use-global-leaflet="false" 
                    class="w-full h-full"
                  >
                    <LTileLayer 
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    
                    <!-- Water Bodies Markers -->
                    <LMarker 
                      v-for="(lake, i) in lakes" 
                      :key="i"
                      :lat-lng="[lake.lat, lake.lng]"
                      :draggable="false"
                    >
                      <LTooltip 
                        permanent 
                        direction="top" 
                        class="custom-mini-tooltip"
                      >
                        <div class="text-slate-900 font-semibold text-xs">{{ lake.name }}</div>
                      </LTooltip>
                    </LMarker>
                    
                    <!-- Petropavl Marker -->
                    <LMarker :lat-lng="petropavl">
                      <LTooltip 
                        permanent 
                        direction="top" 
                        class="custom-mini-tooltip"
                      >
                        <div class="text-slate-900 font-semibold text-xs">Petropavlosk</div>
                      </LTooltip>
                    </LMarker>
                  </LMap>
                </div>
              </div>

              <!-- Map Legend -->
              <div class="flex items-center justify-between px-2 mb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-1">
                    <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span class="text-slate-300 text-xs">Lakes</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <div class="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span class="text-slate-300 text-xs">Rivers</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <div class="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span class="text-slate-300 text-xs">City</span>
                  </div>
                </div>
                <div class="text-slate-400 text-xs">
                  Zoom: {{ miniMapZoom }}x
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                <div class="text-center">
                  <div class="text-xl font-bold text-white">{{ lakes.length }}</div>
                  <div class="text-xs text-slate-400 mt-1">Total</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-cyan-400">{{ lakes.filter(l => l.status === 'lake').length }}</div>
                  <div class="text-xs text-slate-400 mt-1">Lakes</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-green-400">{{ lakes.filter(l => l.status === 'river').length }}</div>
                  <div class="text-xs text-slate-400 mt-1">Rivers</div>
                </div>
              </div>
            </div>

            <!-- Floating Elements -->
            <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-500/10 rounded-3xl blur-xl"></div>
            <div class="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-3xl blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { lakes } from '~/components/data'

type LatLngTuple = [number, number]

// Mini map configuration
const miniMapCenter = ref<LatLngTuple>([54.88, 69.16])
const miniMapZoom = ref(10)
const petropavl = ref<LatLngTuple>([54.88, 69.16])

// Remove the unused functions from your original code
const closeMenu = () => {
  // This function is not used in this component
  // It should be in your layout component
}

const handleClickOutside = (event: Event) => {
  // This function is not used in this component  
  // It should be in your layout component
}

onMounted(() => {
  // You can add any map initialization logic here if needed
})

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<style>
/* Custom styles for the mini map tooltips */
.custom-mini-tooltip .leaflet-tooltip {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(203, 213, 225, 0.5);
  border-radius: 8px;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.2);
  font-size: 0.75rem;
  padding: 4px 8px;
}

/* Map container dark theme */
.leaflet-container {
  background: #0f172a;
}

/* Ensure map controls are visible */
.leaflet-control-zoom a {
  background: rgba(30, 41, 59, 0.8) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 116, 139, 0.3) !important;
  color: #cbd5e1 !important;
}

.leaflet-control-zoom a:hover {
  background: rgba(51, 65, 85, 0.8) !important;
}
</style>