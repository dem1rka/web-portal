<template>
  <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <h3 class="text-white font-semibold flex items-center gap-2">
          <span class="text-cyan-400">🚨</span> Active Alerts
        </h3>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-red-400 rounded-full"></div>
            <span class="text-xs text-slate-400">{{ stats.critical }}</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span class="text-xs text-slate-400">{{ stats.warning }}</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span class="text-xs text-slate-400">{{ stats.info }}</span>
          </div>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <button
          @click="refreshAlerts"
          :disabled="isLoading"
          class="text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
          title="Refresh alerts"
        >
          <svg class="w-5 h-5" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
        
        <button
          @click="dismissAll"
          v-if="activeAlerts.length > 0"
          class="text-xs px-3 py-1 bg-slate-700/50 text-slate-300 rounded-2xl hover:bg-slate-600/50 transition-all duration-300"
        >
          Clear All
        </button>
      </div>
    </div>
    
    <!-- Оповещения -->
    <div class="space-y-3">
      <TransitionGroup name="alert-list">
        <div 
          v-for="alert in activeAlerts" 
          :key="alert.id"
          class="p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          :class="alertClasses[alert.type]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full" :class="dotClasses[alert.type]"></div>
              <div>
                <p class="text-sm font-medium" :class="textClasses[alert.type]">{{ alert.title }}</p>
                <p class="text-xs opacity-80 mt-1">{{ alert.location }}</p>
              </div>
            </div>
            <span class="text-xs opacity-70">{{ formatTime(alert.timestamp) }}</span>
          </div>
          
          <p class="mt-2 text-sm opacity-90">{{ alert.message }}</p>
          
          <!-- Детали параметра -->
          <div v-if="alert.parameter !== 'general'" class="mt-3 pt-3 border-t border-white/10">
            <div class="flex items-center justify-between">
              <div class="text-xs opacity-70">
                Parameter: <span class="font-medium capitalize">{{ alert.parameter }}</span>
              </div>
              <div class="text-xs" :class="getValueColor(alert.value, alert.threshold, alert.type)">
                Value: {{ alert.value.toFixed(2) }} 
                <span v-if="alert.parameter !== 'bacteria'">
                  (Threshold: {{ alert.threshold.toFixed(2) }})
                </span>
              </div>
            </div>
            
            <!-- Прогресс бар для визуализации превышения -->
            <div v-if="alert.parameter !== 'bacteria'" class="mt-2">
              <div class="flex justify-between text-xs text-slate-400 mb-1">
                <span>Threshold</span>
                <span>Current</span>
              </div>
              <div class="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-500"
                  :class="getProgressBarClass(alert.type)"
                  :style="{ 
                    width: `${Math.min(100, (alert.value / alert.threshold) * 100)}%` 
                  }"
                ></div>
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <span class="text-xs opacity-70">Severity: {{ alert.severity }}</span>
            <button 
              @click="dismissAlert(alert.id)"
              class="text-xs px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
              :class="buttonClasses[alert.type]"
            >
              Dismiss
            </button>
          </div>
        </div>
      </TransitionGroup>
      
      <div v-if="activeAlerts.length === 0" class="text-center py-6">
        <span class="text-2xl mb-2 block">✅</span>
        <p class="text-slate-400">No active alerts</p>
        <p class="text-slate-500 text-sm mt-1">All systems operating normally</p>
        <button
          @click="refreshAlerts"
          class="mt-3 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-2xl hover:bg-slate-600/50 transition-all duration-300 text-sm"
        >
          Check for new alerts
        </button>
      </div>
    </div>
    
    <!-- Footer с информацией -->
    <div class="mt-4 pt-4 border-t border-slate-700/50">
      <div class="flex items-center justify-between text-xs text-slate-500">
        <span>Auto-update every 30s</span>
        <span>Last checked: {{ lastChecked }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlerts } from '~/composables/useAlerts'

const {
  activeAlerts,
  isLoading,
  updateAlerts,
  dismissAlert,
  dismissAllAlerts,
  getAlertStats,
  formatTime
} = useAlerts()

const lastChecked = ref(new Date().toLocaleTimeString('en-GB', { 
  hour: '2-digit', 
  minute: '2-digit' 
}))

// Classes для разных типов оповещений
const alertClasses = {
  critical: 'bg-red-500/10 border border-red-400/30',
  warning: 'bg-yellow-500/10 border border-yellow-400/30',
  info: 'bg-blue-500/10 border border-blue-400/30'
}

const dotClasses = {
  critical: 'bg-red-400 animate-pulse',
  warning: 'bg-yellow-400',
  info: 'bg-blue-400'
}

const textClasses = {
  critical: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400'
}

const buttonClasses = {
  critical: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30',
  info: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
}

// Статистика
const stats = computed(() => getAlertStats.value)

// Обновить оповещения вручную
const refreshAlerts = async () => {
  await updateAlerts()
  lastChecked.value = new Date().toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Удалить все оповещения
const dismissAll = () => {
  if (confirm('Are you sure you want to dismiss all alerts?')) {
    dismissAllAlerts()
  }
}

// Получить цвет для значения
const getValueColor = (value: number, threshold: number, type: string) => {
  if (type === 'critical') return 'text-red-400'
  if (type === 'warning') return 'text-yellow-400'
  return 'text-green-400'
}

// Получить класс для прогресс бара
const getProgressBarClass = (type: string) => {
  if (type === 'critical') return 'bg-gradient-to-r from-red-400 to-red-500'
  if (type === 'warning') return 'bg-gradient-to-r from-yellow-400 to-yellow-500'
  return 'bg-gradient-to-r from-blue-400 to-blue-500'
}

// Слушать обновления в реальном времени
onMounted(() => {
  window.addEventListener('alertsUpdated', () => {
    lastChecked.value = new Date().toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  })
})
</script>

<style scoped>
.alert-list-enter-active,
.alert-list-leave-active {
  transition: all 0.3s ease;
}

.alert-list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.alert-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.alert-list-move {
  transition: transform 0.3s ease;
}
</style>