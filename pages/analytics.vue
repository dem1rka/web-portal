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

      <!-- Main Dashboard Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Left Sidebar - Water Bodies -->
        <div class="xl:col-span-1 space-y-6">
          <!-- Quick Stats -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span class="text-cyan-400">📊</span> Quick Stats
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 rounded-2xl bg-white/5">
                <span class="text-slate-300 text-sm">Total Water Bodies</span>
                <span class="text-white font-bold">6</span>
              </div>
              <div class="flex items-center justify-between p-3 rounded-2xl bg-white/5">
                <span class="text-slate-300 text-sm">Lakes</span>
                <span class="text-white font-bold">5</span>
              </div>
              <div class="flex items-center justify-between p-3 rounded-2xl bg-white/5">
                <span class="text-slate-300 text-sm">Rivers</span>
                <span class="text-white font-bold">1</span>
              </div>
              <div class="flex items-center justify-between p-3 rounded-2xl bg-white/5">
                <span class="text-slate-300 text-sm">Last Update</span>
                <span class="text-cyan-400 font-bold text-sm">{{ lastUpdate }}</span>
              </div>
            </div>
          </div>

          <!-- Water Bodies List -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden">
            <div class="p-6 border-b border-slate-700/50">
              <div class="flex items-center justify-between">
                <h3 class="text-white font-semibold flex items-center gap-2">
                  <span class="text-cyan-400">💧</span> Water Bodies
                </h3>
                <button 
                  @click="refreshData" 
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                  :disabled="isLoading"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <!-- Озеро Пестрое -->
              <button
                @click="selectBody(1)"
                :class="[
                  'w-full p-4 flex items-center justify-between transition-all duration-300 border-b border-slate-700/30 group',
                  activeBodyId === 1 
                    ? 'bg-cyan-500/20 border-cyan-400/30' 
                    : 'hover:bg-white/10'
                ]"
              >
                <div class="text-left flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  <div>
                    <p class="text-white font-medium group-hover:text-cyan-300 transition-colors">Озеро Пестрое</p>
                    <p class="text-slate-400 text-xs">Lake</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 font-bold text-sm">{{ getTemperature(1) }}</p>
                  <p class="text-slate-400 text-xs">1.2m</p>
                </div>
              </button>

              <!-- Озеро Белое -->
              <button
                @click="selectBody(2)"
                :class="[
                  'w-full p-4 flex items-center justify-between transition-all duration-300 border-b border-slate-700/30 group',
                  activeBodyId === 2 
                    ? 'bg-cyan-500/20 border-cyan-400/30' 
                    : 'hover:bg-white/10'
                ]"
              >
                <div class="text-left flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div>
                    <p class="text-white font-medium group-hover:text-cyan-300 transition-colors">Озеро Белое</p>
                    <p class="text-slate-400 text-xs">Lake</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 font-bold text-sm">{{ getTemperature(2) }}</p>
                  <p class="text-slate-400 text-xs">1.8m</p>
                </div>
              </button>

              <!-- Озеро Горькое -->
              <button
                @click="selectBody(3)"
                :class="[
                  'w-full p-4 flex items-center justify-between transition-all duration-300 border-b border-slate-700/30 group',
                  activeBodyId === 3 
                    ? 'bg-cyan-500/20 border-cyan-400/30' 
                    : 'hover:bg-white/10'
                ]"
              >
                <div class="text-left flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  <div>
                    <p class="text-white font-medium group-hover:text-cyan-300 transition-colors">Озеро Горькое</p>
                    <p class="text-slate-400 text-xs">Lake</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 font-bold text-sm">{{ getTemperature(3) }}</p>
                  <p class="text-slate-400 text-xs">1.5m</p>
                </div>
              </button>

              <!-- Озеро Поганка -->
              <button
                @click="selectBody(4)"
                :class="[
                  'w-full p-4 flex items-center justify-between transition-all duration-300 border-b border-slate-700/30 group',
                  activeBodyId === 4 
                    ? 'bg-cyan-500/20 border-cyan-400/30' 
                    : 'hover:bg-white/10'
                ]"
              >
                <div class="text-left flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  <div>
                    <p class="text-white font-medium group-hover:text-cyan-300 transition-colors">Озеро Поганка</p>
                    <p class="text-slate-400 text-xs">Lake</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 font-bold text-sm">{{ getTemperature(4) }}</p>
                  <p class="text-slate-400 text-xs">0.9m</p>
                </div>
              </button>

              <!-- Озеро Дикое -->
              <button
                @click="selectBody(5)"
                :class="[
                  'w-full p-4 flex items-center justify-between transition-all duration-300 border-b border-slate-700/30 group',
                  activeBodyId === 5 
                    ? 'bg-cyan-500/20 border-cyan-400/30' 
                    : 'hover:bg-white/10'
                ]"
              >
                <div class="text-left flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                  <div>
                    <p class="text-white font-medium group-hover:text-cyan-300 transition-colors">Озеро Дикое</p>
                    <p class="text-slate-400 text-xs">Lake</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 font-bold text-sm">{{ getTemperature(5) }}</p>
                  <p class="text-slate-400 text-xs">1.6m</p>
                </div>
              </button>

              <!-- Ishim River -->
              <button
                @click="selectBody(6)"
                :class="[
                  'w-full p-4 flex items-center justify-between transition-all duration-300 border-b border-slate-700/30 group',
                  activeBodyId === 6 
                    ? 'bg-cyan-500/20 border-cyan-400/30' 
                    : 'hover:bg-white/10'
                ]"
              >
                <div class="text-left flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div>
                    <p class="text-white font-medium group-hover:text-cyan-300 transition-colors">Ishim River</p>
                    <p class="text-slate-400 text-xs">River</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-cyan-400 font-bold text-sm">{{ getTemperature(6) }}</p>
                  <p class="text-slate-400 text-xs">0.8m</p>
                </div>
              </button>
            </div>
          </div>
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
                  <span class="text-cyan-400">🌡️</span> Temperature
                </h3>
                <span class="text-cyan-400 font-mono text-sm">LIVE</span>
              </div>
              <div class="flex items-center justify-center mb-4">
                <div class="relative">
                  <div class="w-48 h-48 rounded-full border-8 border-slate-700 relative">
                    <div class="absolute inset-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                      <div class="text-center">
                        <p class="text-4xl font-bold text-white">{{ getActiveTemperature() }}</p>
                        <p class="text-slate-200 text-sm">Current</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <p class="text-slate-400 text-sm">Real-time from weather API</p>
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
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                    <div>
                      <p class="text-white font-medium">Coliform</p>
                      <p class="text-slate-400 text-xs">CFU/ml</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold text-lg">{{ getColiform() }}</p>
                    <p class="text-green-400 text-xs">Normal</p>
                  </div>
                </div>

                <!-- Enterococci -->
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                    <div>
                      <p class="text-white font-medium">Enterococci</p>
                      <p class="text-slate-400 text-xs">CFU/ml</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold text-lg">{{ getEnterococci() }}</p>
                    <p class="text-green-400 text-xs">Normal</p>
                  </div>
                </div>

                <!-- Giardia -->
                <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                    <div>
                      <p class="text-white font-medium">Giardia</p>
                      <p class="text-slate-400 text-xs">cysts/L</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold text-lg">{{ getGiardia() }}</p>
                    <p class="text-green-400 text-xs">Normal</p>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { lakes } from '~/components/data'

// Только необходимые реактивные переменные
const activeBodyId = ref(1)
const isLoading = ref(false)
const lastUpdate = ref('--:--')
const temperatures = ref<{[key: number]: number | null}>({})
const humidities = ref<{[key: number]: number | null}>({})
const windSpeeds = ref<{[key: number]: number | null}>({})

// Простые функции для получения данных
const getTemperature = (id: number) => {
  return temperatures.value[id] ? temperatures.value[id]!.toFixed(1) + '°C' : 'Loading...'
}

const getActiveTemperature = () => {
  return temperatures.value[activeBodyId.value] ? temperatures.value[activeBodyId.value]!.toFixed(1) + '°C' : '--'
}

const getTemperatureColor = () => {
  const temp = temperatures.value[activeBodyId.value]
  if (!temp) return 'bg-gray-400'
  return temp > 20 ? 'bg-red-400' : temp > 10 ? 'bg-yellow-400' : 'bg-green-400'
}

// Уровень воды (статичные данные)
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

// Загрязнение (статичные данные)
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

// Погодные данные
const getHumidity = () => {
  return humidities.value[activeBodyId.value] ? humidities.value[activeBodyId.value] + '%' : '--'
}

const getWindSpeed = () => {
  return windSpeeds.value[activeBodyId.value] ? windSpeeds.value[activeBodyId.value] + ' km/h' : '--'
}

// Основные функции
const selectBody = (id: number) => {
  activeBodyId.value = id
}

const refreshData = async () => {
  isLoading.value = true
  try {
    const updatePromises = lakes.map(async (lake) => {
      await lake.setAxios()
      temperatures.value[lake.id] = lake.temperature
      humidities.value[lake.id] = lake.humidity
      windSpeeds.value[lake.id] = lake.windSpeed
    })
    
    await Promise.all(updatePromises)
    
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

// Авто-обновление
let updateInterval: NodeJS.Timeout

onMounted(() => {
  refreshData()
  updateInterval = setInterval(refreshData, 5 * 60 * 1000)
})

onUnmounted(() => {
  clearInterval(updateInterval)
})
</script>