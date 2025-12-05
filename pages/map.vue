<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
    <div class="h-16"></div>
    
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="inline-flex items-center px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-4">
              <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <span class="text-cyan-400 text-sm font-mono uppercase tracking-widest">INTERACTIVE MAP</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-3">
              Water Bodies
              <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Map</span>
            </h1>
            <p class="text-xl text-slate-300 max-w-2xl">
              Explore the geographical distribution of North Kazakhstan's water monitoring stations
            </p>
          </div>
          <div class="hidden md:flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-400 font-mono text-sm">MAP ONLINE</span>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="(stat, index) in stats" :key="index" 
             class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500 group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-2xl">{{ stat.icon }}</span>
            </div>
            <div>
              <p class="text-sm text-slate-300 mb-1">{{ stat.name }}</p>
              <p class="text-2xl font-bold text-white">{{ stat.count }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid с фильтрами -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Left Sidebar -->
        <div class="xl:col-span-1 space-y-6">
          <!-- Instructions -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span class="text-cyan-400">🎯</span> Map Instructions
            </h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p class="text-slate-300 text-sm">Click on markers to view water body details</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p class="text-slate-300 text-sm">Use list below to quickly navigate to locations</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p class="text-slate-300 text-sm">Zoom and pan to explore the region</p>
              </div>
            </div>
          </div>

          <!-- Фильтры -->
          <FilterPanel @filter-change="handleFilterChange" />
          
          <!-- Water Bodies List -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden">
            <div class="p-6 border-b border-slate-700/50">
              <h3 class="text-white font-semibold flex items-center gap-2">
                <span class="text-cyan-400">💧</span> Water Bodies
              </h3>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <button 
                v-for="body in filteredLakes" 
                :key="body.id" 
                @click="zoomToMarker(body.lat, body.lng)"
                class="w-full p-4 flex items-center justify-between transition-all duration-300 border-b border-slate-700/30 last:border-b-0 group hover:bg-white/10"
              >
                <div class="text-left flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full" :class="body.status === 'river' ? 'bg-cyan-400' : 'bg-blue-400'"></div>
                  <div>
                    <p class="text-white font-medium group-hover:text-cyan-300 transition-colors">{{ body.name }}</p>
                    <p class="text-slate-400 text-xs">{{ body.status === 'river' ? 'River' : 'Lake' }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 text-sm">{{ body.lat.toFixed(4) }}, {{ body.lng.toFixed(4) }}</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Map Container -->
        <div class="xl:col-span-3">
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-white font-semibold flex items-center gap-2">
                <span class="text-cyan-400">🗺️</span> Interactive Map
              </h3>
              <div class="flex items-center space-x-4">
                <span class="text-cyan-400 font-mono text-sm">LIVE VIEW</span>
                <div class="flex items-center space-x-2">
                  <div class="flex items-center space-x-1">
                    <div class="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span class="text-slate-300 text-xs">Lake</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <div class="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span class="text-slate-300 text-xs">River</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Map -->
            <div class="rounded-2xl overflow-hidden border border-slate-700/50">
              <div class="w-full h-[500px] lg:h-[600px]">
                <LMap 
                  :zoom="mapZoom" 
                  :center="mapCenter" 
                  :use-global-leaflet="false" 
                  class="w-full h-full"
                >
                  <LTileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />    
                  
                  <!-- Petropavl Marker -->
                  <LMarker 
                    :lat-lng="petropavl" 
                    @click="zoomToMarker(petropavl[0], petropavl[1])"
                  >
                    <LTooltip permanent direction="top" class="custom-tooltip">
                      <div class="text-slate-900 font-semibold">Petropavlosk (NKR)</div>
                    </LTooltip>
                    <LPopup>
                      <div class="p-2">
                        <h3 class="font-bold text-slate-900">Petropavlosk</h3>
                        <p class="text-slate-600">North Kazakhstan Region</p>
                        <p class="text-sm text-slate-500">Regional Center</p>
                      </div>
                    </LPopup>
                  </LMarker>
                  
                  <!-- Water Bodies Markers -->
                  <LMarker 
                    v-for="(lake, i) in filteredLakes" 
                    :key="i"
                    :lat-lng="[lake.lat, lake.lng]"
                    :draggable="false"
                    @click="zoomToMarker(lake.lat, lake.lng)"
                  >
                    <LTooltip 
                      permanent 
                      direction="top" 
                      class="custom-tooltip"
                    >
                      <div class="text-slate-900 font-semibold">{{ lake.name }}</div>
                      <div class="text-slate-600 text-xs">{{ lake.status === 'river' ? 'River' : 'Lake' }}</div>
                    </LTooltip>
                    <LPopup>
                      <div class="p-3 min-w-[200px]">
                        <h3 class="font-bold text-slate-900 mb-2">{{ lake.name }}</h3>
                        <div class="space-y-1 text-sm">
                          <div class="flex justify-between">
                            <span class="text-slate-600">Type:</span>
                            <span class="font-medium">{{ lake.status === 'river' ? 'River' : 'Lake' }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-slate-600">Latitude:</span>
                            <span class="font-mono">{{ lake.lat.toFixed(4) }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-slate-600">Longitude:</span>
                            <span class="font-mono">{{ lake.lng.toFixed(4) }}</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-slate-600">Temperature:</span>
                            <span class="font-medium text-cyan-600">{{ lake.temperature }}°C</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-slate-600">Pollution:</span>
                            <span class="font-medium" :class="getPollutionClass(lake.pollutionLevel)">
                              {{ lake.pollutionLevel }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </LPopup>
                  </LMarker>
                </LMap>
              </div>
            </div>
            
            <!-- Map Controls -->
            <div class="flex items-center justify-between mt-4 px-2">
              <div class="text-slate-400 text-sm">
                Showing {{ filteredLakes.length }} of {{ lakes.length }} water bodies
                • Zoom: {{ mapZoom }}x
              </div>
              <div class="flex gap-2">
                <button 
                  @click="exportMapData"
                  class="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-300 text-sm font-medium flex items-center gap-2"
                >
                  <span>📥</span>
                  Export
                </button>
                <button 
                  @click="resetView"
                  class="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-2xl border border-slate-600 hover:bg-slate-600/50 transition-all duration-300 text-sm font-medium"
                >
                  Reset View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css'
import { lakes } from '~/components/data';

type LatLngTuple = [number, number]

interface FilterData {
  searchQuery: string
  selectedTypes: string[]
  pollutionRisk: string
}

// Reactivity
const petropavl = ref<LatLngTuple>([54.88, 69.16])
const mapCenter = ref<LatLngTuple>([54.88, 69.16])
const mapZoom = ref(11)
const filterData = ref<FilterData>({
  searchQuery: '',
  selectedTypes: ['lake', 'river'],
  pollutionRisk: 'all'
})

// Stats data
const stats = computed(() => [
  {
    name: "Total Water Bodies",
    count: lakes.length,
    icon: "💧"
  },
  {
    name: "Rivers",
    count: lakes.filter(lake => lake.status === 'river').length,
    icon: "🌊"
  },
  {
    name: "Lakes & Reservoirs", 
    count: lakes.filter(lake => lake.status === 'lake').length,
    icon: "🏞️"
  }
])

// Filtered lakes
const filteredLakes = computed(() => {
  return lakes.filter(lake => {
    // Filter by search query
    if (filterData.value.searchQuery && 
        !lake.name.toLowerCase().includes(filterData.value.searchQuery.toLowerCase())) {
      return false
    }
    
    // Filter by type
    if (!filterData.value.selectedTypes.includes(lake.status)) {
      return false
    }
    
    // Filter by pollution risk
    if (filterData.value.pollutionRisk !== 'all') {
      const risk = getRiskLevel(lake.pollutionLevel)
      if (risk !== filterData.value.pollutionRisk) {
        return false
      }
    }
    
    return true
  })
})

const getRiskLevel = (level: number) => {
  if (level < 30) return 'low'
  if (level < 50) return 'medium'
  return 'high'
}

const getPollutionClass = (level: number) => {
  if (level < 30) return 'text-green-600'
  if (level < 50) return 'text-yellow-600'
  return 'text-red-600'
}

// Filter handlers
const handleFilterChange = (data: FilterData) => {
  filterData.value = data
}

// Export function
const exportMapData = () => {
  const dataStr = JSON.stringify(filteredLakes.value.map(lake => ({
    name: lake.name,
    type: lake.status,
    coordinates: { lat: lake.lat, lng: lake.lng },
    temperature: lake.temperature,
    pollutionLevel: lake.pollutionLevel,
    waterLevel: lake.waterLevel
  })), null, 2)
  
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  const exportFileDefaultName = `hydrovision-map-data-${new Date().toISOString().split('T')[0]}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

// Map functions
const zoomToMarker = (lat: number, lng: number) => {
  mapCenter.value = [lat, lng]
  mapZoom.value = 14
}

const resetView = () => {
  mapCenter.value = [54.88, 69.16]
  mapZoom.value = 11
}
</script>

<style>
/* Custom tooltip styles */
.custom-tooltip .leaflet-tooltip {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(203, 213, 225, 0.5);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Map container adjustments */
.leaflet-container {
  background: #0f172a;
}

.leaflet-popup-content-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(203, 213, 225, 0.5);
}

.leaflet-popup-tip {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
</style>