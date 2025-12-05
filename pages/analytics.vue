<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
    <div class="h-16"></div>
    
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center justify-between">
          <div>
            <div class="inline-flex items-center px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-4">
              <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <span class="text-cyan-400 text-sm font-mono uppercase tracking-widest">LIVE ANALYTICS DASHBOARD</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-3">
              Water Intelligence
              <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Platform</span>
            </h1>
            <p class="text-xl text-slate-300 max-w-2xl">
              Real-time monitoring and analytics for North Kazakhstan's water ecosystem
            </p>
          </div>
          <div class="hidden md:flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-400 font-mono text-sm">SYSTEM ONLINE</span>
            <span class="text-slate-400 text-sm">Updated: {{ lastUpdate }}</span>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Grid с фильтрами -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Left Sidebar -->
        <div class="xl:col-span-1 space-y-6">
          <!-- Фильтры -->
          <FilterPanel @filter-change="handleFilterChange" />
          
          <!-- Quick Stats -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span class="text-cyan-400">📊</span> Quick Stats
            </h3>
            <div class="space-y-4">
              <div v-for="stat in computedStats" :key="stat.name" 
                   class="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <span class="text-slate-300 text-sm">{{ stat.name }}</span>
                <span class="text-white font-bold">{{ stat.value }}</span>
              </div>
            </div>
          </div>

          <!-- Export Data Button -->
          <button
            @click="exportData"
            class="w-full p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-3xl text-cyan-400 font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>📥</span>
            Export Data
          </button>
        </div>

        <!-- Main Content -->
        <div class="xl:col-span-3 space-y-8">
          <!-- Overview Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Temperature Card -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500 group">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span class="text-2xl">🌡️</span>
                </div>
                <div class="w-3 h-3 rounded-full" :class="getTemperatureColor()"></div>
              </div>
              <h3 class="text-white font-semibold text-lg mb-2">Temperature</h3>
              <p class="text-3xl font-bold text-white mb-1">{{ getActiveTemperature() }}</p>
              <p class="text-slate-400 text-sm">Current reading</p>
            </div>

            <!-- Water Level Card -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500 group">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span class="text-2xl">💧</span>
                </div>
                <div class="w-3 h-3 rounded-full" :class="getWaterLevelColor()"></div>
              </div>
              <h3 class="text-white font-semibold text-lg mb-2">Water Level</h3>
              <p class="text-3xl font-bold text-white mb-1">{{ getWaterLevel() }}</p>
              <p class="text-slate-400 text-sm">Current level</p>
            </div>

            <!-- Pollution Risk Card -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500 group">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span class="text-2xl">🦠</span>
                </div>
                <div class="w-3 h-3 rounded-full" :class="getPollutionColor()"></div>
              </div>
              <h3 class="text-white font-semibold text-lg mb-2">Pollution Risk</h3>
              <p class="text-3xl font-bold text-white mb-1">{{ getPollutionRisk() }}</p>
              <p class="text-slate-400 text-sm">Water quality</p>
            </div>
          </div>

          <!-- Data Visualization Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Temperature Gauge -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white font-semibold flex items-center gap-2">
                  <span class="text-cyan-400">🌡️</span> Temperature Trend
                </h3>
                <span class="text-cyan-400 font-mono text-sm">24H TREND</span>
              </div>
              <div class="h-48 flex items-center justify-center">
                <!-- Здесь будет график температуры -->
                <div class="text-center">
                  <p class="text-5xl font-bold text-cyan-400 mb-2">{{ getActiveTemperature() }}</p>
                  <p class="text-slate-400">Current Temperature</p>
                  <div class="mt-4 text-sm text-slate-500">
                    <div class="flex items-center justify-center gap-4">
                      <span>Min: {{ getMinTemperature() }}°C</span>
                      <span>Max: {{ getMaxTemperature() }}°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pollution Levels -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white font-semibold flex items-center gap-2">
                  <span class="text-cyan-400">🦠</span> Pollution Levels
                </h3>
                <span class="text-cyan-400 font-mono text-sm">ANALYSIS</span>
              </div>
              <div class="space-y-4">
                <!-- Coliform -->
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full" :class="getPollutionDotColor('coliform')"></div>
                    <div>
                      <p class="text-white font-medium">Coliform</p>
                      <p class="text-slate-400 text-xs">CFU/ml</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold text-lg">{{ getColiform() }}</p>
                    <p class="text-xs" :class="getPollutionTextColor('coliform')">{{ getPollutionStatus('coliform') }}</p>
                  </div>
                </div>

                <!-- Enterococci -->
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full" :class="getPollutionDotColor('enterococci')"></div>
                    <div>
                      <p class="text-white font-medium">Enterococci</p>
                      <p class="text-slate-400 text-xs">CFU/ml</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold text-lg">{{ getEnterococci() }}</p>
                    <p class="text-xs" :class="getPollutionTextColor('enterococci')">{{ getPollutionStatus('enterococci') }}</p>
                  </div>
                </div>

                <!-- Giardia -->
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full" :class="getPollutionDotColor('giardia')"></div>
                    <div>
                      <p class="text-white font-medium">Giardia</p>
                      <p class="text-slate-400 text-xs">cysts/L</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold text-lg">{{ getGiardia() }}</p>
                    <p class="text-xs" :class="getPollutionTextColor('giardia')">{{ getPollutionStatus('giardia') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Water Level -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white font-semibold flex items-center gap-2">
                  <span class="text-cyan-400">💧</span> Water Level
                </h3>
                <span class="text-cyan-400 font-mono text-sm">MONITORING</span>
              </div>
              <div class="space-y-6">
                <div class="text-center">
                  <p class="text-5xl font-bold text-cyan-400 mb-2">{{ getWaterLevel() }}</p>
                  <p class="text-slate-400">Current Level</p>
                </div>
                <div class="bg-slate-700/50 rounded-2xl p-4">
                  <div class="flex justify-between text-slate-400 text-sm mb-2">
                    <span>0m</span>
                    <span>2.5m</span>
                  </div>
                  <div class="w-full bg-slate-600 rounded-full h-4">
                    <div class="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-1000" 
                         :style="{ width: getWaterLevelPercentage() + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Weather Data -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white font-semibold flex items-center gap-2">
                  <span class="text-cyan-400">🌤️</span> Weather Data
                </h3>
                <span class="text-cyan-400 font-mono text-sm">OPEN-METEO</span>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                  <span class="text-slate-300">Humidity</span>
                  <span class="text-white font-bold">{{ getHumidity() }}</span>
                </div>
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                  <span class="text-slate-300">Wind Speed</span>
                  <span class="text-white font-bold">{{ getWindSpeed() }}</span>
                </div>
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                  <span class="text-slate-300">Last Updated</span>
                  <span class="text-cyan-400 font-bold">{{ lastUpdate }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Секция с историческими данными -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-white font-semibold flex items-center gap-2">
                <span class="text-cyan-400">📈</span> Historical Data
              </h3>
              <div class="flex space-x-2">
                <button 
                  v-for="range in timeRanges"
                  :key="range"
                  @click="timeRange = range"
                  class="px-3 py-1 rounded-2xl text-sm transition-all"
                  :class="timeRange === range 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'"
                >
                  {{ range }}
                </button>
              </div>
            </div>
            <div class="h-64 flex items-center justify-center text-slate-400">
              <!-- Здесь будет график исторических данных -->
              <div class="text-center">
                <span class="text-4xl mb-2 block">📊</span>
                <p>Historical data visualization for {{ timeRange }}</p>
                <p class="text-sm text-slate-500 mt-2">(Graph would be displayed here)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { lakes } from '~/components/data'

interface FilterData {
  searchQuery: string
  selectedTypes: string[]
  pollutionRisk: string
}

// Reactivity
const activeBodyId = ref(1)
const isLoading = ref(false)
const lastUpdate = ref('--:--')
const timeRange = ref('7D')
const filterData = ref<FilterData>({
  searchQuery: '',
  selectedTypes: ['lake', 'river'],
  pollutionRisk: 'all'
})

const temperatures = ref<{[key: number]: number | null}>({})
const humidities = ref<{[key: number]: number | null}>({})
const windSpeeds = ref<{[key: number]: number | null}>({})

const timeRanges = ['24H', '7D', '30D', '1Y']

// Computed properties
const computedStats = computed(() => [
  { name: 'Total Water Bodies', value: filteredLakes.value.length },
  { name: 'Lakes', value: filteredLakes.value.filter(l => l.status === 'lake').length },
  { name: 'Rivers', value: filteredLakes.value.filter(l => l.status === 'river').length },
  { name: 'Last Update', value: lastUpdate.value }
])

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

// Filter handlers
const handleFilterChange = (data: FilterData) => {
  filterData.value = data
}

// Export function
const exportData = () => {
  const dataStr = JSON.stringify(filteredLakes.value, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = `hydrovision-data-${new Date().toISOString().split('T')[0]}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
  
  // Show notification
  alert(`Exported ${filteredLakes.value.length} water bodies to JSON`)
}

// Helper functions
const getTemperature = (id: number) => {
  return temperatures.value[id] ? temperatures.value[id]!.toFixed(1) + '°C' : 'Loading...'
}

const getActiveTemperature = () => {
  return temperatures.value[activeBodyId.value] ? temperatures.value[activeBodyId.value]!.toFixed(1) + '°C' : '--'
}

const getMinTemperature = () => {
  const temps = filteredLakes.value.map(l => l.temperature)
  return temps.length > 0 ? Math.min(...temps).toFixed(1) : '--'
}

const getMaxTemperature = () => {
  const temps = filteredLakes.value.map(l => l.temperature)
  return temps.length > 0 ? Math.max(...temps).toFixed(1) : '--'
}

const getTemperatureColor = () => {
  const temp = temperatures.value[activeBodyId.value]
  if (!temp) return 'bg-gray-400'
  return temp > 20 ? 'bg-red-400' : temp > 10 ? 'bg-yellow-400' : 'bg-green-400'
}

// Water level functions
const getWaterLevel = () => {
  const levels: {[key: number]: string} = {
    1: '1.2m', 2: '1.8m', 3: '1.5m', 
    4: '0.9m', 5: '1.6m', 6: '0.8m'
  }
  return levels[activeBodyId.value] || '--'
}

const getWaterLevelPercentage = () => {
  const levels: {[key: number]: number} = {
    1: 1.2, 2: 1.8, 3: 1.5, 
    4: 0.9, 5: 1.6, 6: 0.8
  }
  return (levels[activeBodyId.value] / 2.5) * 100 || 0
}

const getWaterLevelColor = () => {
  const levels: {[key: number]: number} = {
    1: 1.2, 2: 1.8, 3: 1.5, 
    4: 0.9, 5: 1.6, 6: 0.8
  }
  const level = levels[activeBodyId.value]
  return level > 1.8 ? 'bg-red-400' : level > 1.2 ? 'bg-yellow-400' : 'bg-green-400'
}

// Pollution functions
const getColiform = () => {
  const values: {[key: number]: string} = {
    1: '25.3', 2: '28.1', 3: '22.7', 
    4: '24.9', 5: '23.5', 6: '32.2'
  }
  return values[activeBodyId.value] || '--'
}

const getEnterococci = () => {
  const values: {[key: number]: string} = {
    1: '7.2', 2: '6.8', 3: '6.1', 
    4: '7.9', 5: '6.5', 6: '9.3'
  }
  return values[activeBodyId.value] || '--'
}

const getGiardia = () => {
  const values: {[key: number]: string} = {
    1: '8.1', 2: '7.4', 3: '7.8', 
    4: '8.3', 5: '7.6', 6: '8.9'
  }
  return values[activeBodyId.value] || '--'
}

const getPollutionDotColor = (type: string) => {
  const value = parseFloat(
    type === 'coliform' ? getColiform() : 
    type === 'enterococci' ? getEnterococci() : 
    getGiardia()
  )
  
  if (isNaN(value)) return 'bg-gray-400'
  return value < 25 ? 'bg-green-400' : value < 30 ? 'bg-yellow-400' : 'bg-red-400'
}

const getPollutionTextColor = (type: string) => {
  const value = parseFloat(
    type === 'coliform' ? getColiform() : 
    type === 'enterococci' ? getEnterococci() : 
    getGiardia()
  )
  
  if (isNaN(value)) return 'text-gray-400'
  return value < 25 ? 'text-green-400' : value < 30 ? 'text-yellow-400' : 'text-red-400'
}

const getPollutionStatus = (type: string) => {
  const value = parseFloat(
    type === 'coliform' ? getColiform() : 
    type === 'enterococci' ? getEnterococci() : 
    getGiardia()
  )
  
  if (isNaN(value)) return '--'
  return value < 25 ? 'Normal' : value < 30 ? 'Warning' : 'Critical'
}

const getPollutionRisk = () => {
  const risks: {[key: number]: string} = {
    1: 'Low', 2: 'Medium', 3: 'Low', 
    4: 'Low', 5: 'Low', 6: 'High'
  }
  return risks[activeBodyId.value] || '--'
}

const getPollutionColor = () => {
  const risks: {[key: number]: string} = {
    1: 'bg-green-400', 2: 'bg-yellow-400', 3: 'bg-green-400', 
    4: 'bg-green-400', 5: 'bg-green-400', 6: 'bg-red-400'
  }
  return risks[activeBodyId.value] || 'bg-gray-400'
}

// Weather functions
const getHumidity = () => {
  return humidities.value[activeBodyId.value] ? humidities.value[activeBodyId.value] + '%' : '--'
}

const getWindSpeed = () => {
  return windSpeeds.value[activeBodyId.value] ? windSpeeds.value[activeBodyId.value] + ' km/h' : '--'
}

// Selection function
const selectBody = (id: number) => {
  activeBodyId.value = id
}

// Refresh function
const refreshData = async () => {
  isLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update all lakes
    lakes.forEach(lake => {
      lake.temperature += (Math.random() - 0.5) * 0.5
      lake.pollutionLevel += (Math.random() - 0.5) * 2
      lake.waterLevel += (Math.random() - 0.5) * 0.1
      lake.lastUpdated = new Date()
      
      temperatures.value[lake.id] = lake.temperature
      humidities.value[lake.id] = lake.humidity
      windSpeeds.value[lake.id] = lake.windSpeed
    })
    
    lastUpdate.value = new Date().toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  } catch (error) {
    console.error('Error updating data:', error)
  } finally {
    isLoading.value = false
  }
}

// Auto-update
let updateInterval: NodeJS.Timeout

onMounted(() => {
  refreshData()
  updateInterval = setInterval(refreshData, 5 * 60 * 1000)
  
  // Listen for real-time updates
  window.addEventListener('waterDataUpdate', handleDataUpdate)
})

onUnmounted(() => {
  clearInterval(updateInterval)
  window.removeEventListener('waterDataUpdate', handleDataUpdate)
})

const handleDataUpdate = () => {
  // Handle real-time updates
  refreshData()
}
</script>