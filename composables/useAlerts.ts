import { lakes, LakeData, setAxios } from '~/components/data'

export interface Alert {
  id: number
  title: string
  message: string
  location: string
  type: 'critical' | 'warning' | 'info'
  severity: 'High' | 'Medium' | 'Low'
  timestamp: string
  lakeId: number
  parameter: string
  value: number
  threshold: number
}

// Пороговые значения для каждого озера
const lakeThresholds: Record<number, {
  temperature: { min: number; max: number }
  pollution: { critical: number; warning: number }
  waterLevel: { min: number; max: number }
  bacteria: { critical: number; warning: number }
}> = {
  1: { // Озеро Пестрое
    temperature: { min: 10, max: 25 },
    pollution: { critical: 50, warning: 30 },
    waterLevel: { min: 0.8, max: 2.0 },
    bacteria: { critical: 30, warning: 25 }
  },
  2: { // Озеро Белое
    temperature: { min: 12, max: 22 },
    pollution: { critical: 45, warning: 35 },
    waterLevel: { min: 1.5, max: 2.5 },
    bacteria: { critical: 35, warning: 28 }
  },
  3: { // Озеро Горькое
    temperature: { min: 8, max: 20 },
    pollution: { critical: 40, warning: 28 },
    waterLevel: { min: 1.0, max: 2.0 },
    bacteria: { critical: 28, warning: 23 }
  },
  4: { // Озеро Поганка
    temperature: { min: 10, max: 20 },
    pollution: { critical: 60, warning: 35 },
    waterLevel: { min: 1.2, max: 2.2 },
    bacteria: { critical: 32, warning: 26 }
  },
  5: { // Озеро Дикое
    temperature: { min: 12, max: 22 },
    pollution: { critical: 35, warning: 25 },
    waterLevel: { min: 1.4, max: 2.4 },
    bacteria: { critical: 30, warning: 24 }
  },
  6: { // Ishim River
    temperature: { min: 5, max: 18 },
    pollution: { critical: 40, warning: 25 },
    waterLevel: { min: 1.0, max: 2.0 },
    bacteria: { critical: 25, warning: 20 }
  }
}

export const useAlerts = () => {
  const activeAlerts = ref<Alert[]>([])
  const alertHistory = ref<Alert[]>([])
  const isLoading = ref(false)

  // Функция для симуляции небольших изменений данных
  const simulateDataChanges = () => {
    lakes.forEach(lake => {
      // Симулируем небольшие изменения в патогенах
      lake.coliform += (Math.random() - 0.5) * 3
      lake.enterococci += (Math.random() - 0.5) * 3
      lake.giardia += (Math.random() - 0.5) * 3
      
      // Ограничиваем значения разумными пределами
      lake.coliform = Math.max(0, Math.min(50, lake.coliform))
      lake.enterococci = Math.max(0, Math.min(20, lake.enterococci))
      lake.giardia = Math.max(0, Math.min(20, lake.giardia))
      
      // Обновляем время
      lake.lastUpdated = new Date()
    })
  }

  // Генерировать оповещения на основе данных озер
  const generateAlerts = (): Alert[] => {
    const newAlerts: Alert[] = []
    
    lakes.forEach(lake => {
      const thresholds = lakeThresholds[lake.id]
      if (!thresholds) return
      
      // Проверка температуры (если она доступна)
      if (lake.temperature !== null) {
        if (lake.temperature > thresholds.temperature.max) {
          newAlerts.push({
            id: Date.now() + lake.id,
            title: 'High Temperature',
            message: `Temperature (${lake.temperature.toFixed(1)}°C) exceeds maximum threshold (${thresholds.temperature.max}°C)`,
            location: lake.name,
            type: 'warning',
            severity: 'Medium',
            timestamp: new Date().toISOString(),
            lakeId: lake.id,
            parameter: 'temperature',
            value: lake.temperature,
            threshold: thresholds.temperature.max
          })
        } else if (lake.temperature < thresholds.temperature.min) {
          newAlerts.push({
            id: Date.now() + lake.id + 1000,
            title: 'Low Temperature',
            message: `Temperature (${lake.temperature.toFixed(1)}°C) below minimum threshold (${thresholds.temperature.min}°C)`,
            location: lake.name,
            type: 'warning',
            severity: 'Medium',
            timestamp: new Date().toISOString(),
            lakeId: lake.id,
            parameter: 'temperature',
            value: lake.temperature,
            threshold: thresholds.temperature.min
          })
        }
      }
      
      // Проверка уровня загрязнения (рассчитываем из патогенов)
      const pollutionLevel = lake.pollutionLevel
      if (pollutionLevel > thresholds.pollution.critical) {
        newAlerts.push({
          id: Date.now() + lake.id + 2000,
          title: 'Critical Pollution Level',
          message: `Pollution level (${pollutionLevel.toFixed(1)}) exceeds critical threshold (${thresholds.pollution.critical})`,
          location: lake.name,
          type: 'critical',
          severity: 'High',
          timestamp: new Date().toISOString(),
          lakeId: lake.id,
          parameter: 'pollution',
          value: pollutionLevel,
          threshold: thresholds.pollution.critical
        })
      } else if (pollutionLevel > thresholds.pollution.warning) {
        newAlerts.push({
          id: Date.now() + lake.id + 3000,
          title: 'High Pollution Level',
          message: `Pollution level (${pollutionLevel.toFixed(1)}) exceeds warning threshold (${thresholds.pollution.warning})`,
          location: lake.name,
          type: 'warning',
          severity: 'Medium',
          timestamp: new Date().toISOString(),
          lakeId: lake.id,
          parameter: 'pollution',
          value: pollutionLevel,
          threshold: thresholds.pollution.warning
        })
      }
      
      // Проверка уровня воды
      if (lake.waterLevel < thresholds.waterLevel.min) {
        newAlerts.push({
          id: Date.now() + lake.id + 4000,
          title: 'Low Water Level',
          message: `Water level (${lake.waterLevel.toFixed(2)}m) below minimum threshold (${thresholds.waterLevel.min}m)`,
          location: lake.name,
          type: 'warning',
          severity: 'Medium',
          timestamp: new Date().toISOString(),
          lakeId: lake.id,
          parameter: 'waterLevel',
          value: lake.waterLevel,
          threshold: thresholds.waterLevel.min
        })
      } else if (lake.waterLevel > thresholds.waterLevel.max) {
        newAlerts.push({
          id: Date.now() + lake.id + 5000,
          title: 'High Water Level',
          message: `Water level (${lake.waterLevel.toFixed(2)}m) exceeds maximum threshold (${thresholds.waterLevel.max}m)`,
          location: lake.name,
          type: 'warning',
          severity: 'Medium',
          timestamp: new Date().toISOString(),
          lakeId: lake.id,
          parameter: 'waterLevel',
          value: lake.waterLevel,
          threshold: thresholds.waterLevel.max
        })
      }
      
      // Проверка бактериальных показателей
      const maxBacteria = Math.max(lake.coliform, lake.enterococci, lake.giardia)
      if (maxBacteria > thresholds.bacteria.critical) {
        newAlerts.push({
          id: Date.now() + lake.id + 6000,
          title: 'Bacterial Contamination',
          message: `Bacterial levels exceed critical threshold. Coliform: ${lake.coliform.toFixed(1)}, Enterococci: ${lake.enterococci.toFixed(1)}, Giardia: ${lake.giardia.toFixed(1)}`,
          location: lake.name,
          type: 'critical',
          severity: 'High',
          timestamp: new Date().toISOString(),
          lakeId: lake.id,
          parameter: 'bacteria',
          value: maxBacteria,
          threshold: thresholds.bacteria.critical
        })
      } else if (maxBacteria > thresholds.bacteria.warning) {
        newAlerts.push({
          id: Date.now() + lake.id + 7000,
          title: 'High Bacteria Levels',
          message: `Bacterial levels above warning threshold. Coliform: ${lake.coliform.toFixed(1)}, Enterococci: ${lake.enterococci.toFixed(1)}`,
          location: lake.name,
          type: 'warning',
          severity: 'Medium',
          timestamp: new Date().toISOString(),
          lakeId: lake.id,
          parameter: 'bacteria',
          value: maxBacteria,
          threshold: thresholds.bacteria.warning
        })
      }
      
      // Информационные оповещения о нормальных значениях (случайно)
      if (newAlerts.length === 0 && Math.random() > 0.8) {
        newAlerts.push({
          id: Date.now() + lake.id + 8000,
          title: 'Normal Conditions',
          message: `All parameters within normal ranges. Pollution: ${pollutionLevel.toFixed(1)}`,
          location: lake.name,
          type: 'info',
          severity: 'Low',
          timestamp: new Date().toISOString(),
          lakeId: lake.id,
          parameter: 'general',
          value: 0,
          threshold: 0
        })
      }
    })
    
    return newAlerts
  }

  // Обновить оповещения
  const updateAlerts = async () => {
    isLoading.value = true
    try {
      // Обновляем данные через API (или симуляцию)
      await setAxios()
      
      // Симулируем небольшие изменения в патогенах для реалистичности
      simulateDataChanges()
      
      // Генерируем новые оповещения
      const newAlerts = generateAlerts()
      
      // Фильтруем дубликаты (по location и title за последние 5 минут)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60000)
      const recentAlerts = activeAlerts.value.filter(alert => 
        new Date(alert.timestamp) > fiveMinutesAgo
      )
      
      // Добавляем только новые уникальные оповещения
      newAlerts.forEach(newAlert => {
        const isDuplicate = recentAlerts.some(existingAlert => 
          existingAlert.location === newAlert.location && 
          existingAlert.title === newAlert.title &&
          Math.abs(new Date(existingAlert.timestamp).getTime() - new Date(newAlert.timestamp).getTime()) < 60000 // менее минуты разницы
        )
        
        if (!isDuplicate) {
          activeAlerts.value.unshift(newAlert)
          alertHistory.value.unshift(newAlert)
          
          // Воспроизводим звук для критических оповещений
          if (newAlert.type === 'critical') {
            playCriticalSound()
          } else if (newAlert.type === 'warning') {
            playWarningSound()
          }
        }
      })
      
      // Ограничиваем количество активных оповещений
      if (activeAlerts.value.length > 10) {
        activeAlerts.value = activeAlerts.value.slice(0, 10)
      }
      
      // Удаляем старые оповещения (старше 24 часов)
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 3600000)
      activeAlerts.value = activeAlerts.value.filter(alert => 
        new Date(alert.timestamp) > twentyFourHoursAgo
      )
      
      // Эмитируем событие для обновления в реальном времени
      window.dispatchEvent(new CustomEvent('alertsUpdated', {
        detail: { alerts: activeAlerts.value }
      }))
      
    } catch (error) {
      console.error('Error updating alerts:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Звуковые уведомления
  const playCriticalSound = () => {
    try {
      // Простой звук через Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (e) {
      console.log('Audio context not supported')
    }
  }
  
  const playWarningSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 600
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      console.log('Audio context not supported')
    }
  }

  // Удалить оповещение
  const dismissAlert = (id: number) => {
    activeAlerts.value = activeAlerts.value.filter(alert => alert.id !== id)
  }

  // Удалить все оповещения
  const dismissAllAlerts = () => {
    activeAlerts.value = []
  }

  // Получить статистику оповещений
  const getAlertStats = computed(() => {
    return {
      total: activeAlerts.value.length,
      critical: activeAlerts.value.filter(a => a.type === 'critical').length,
      warning: activeAlerts.value.filter(a => a.type === 'warning').length,
      info: activeAlerts.value.filter(a => a.type === 'info').length
    }
  })

  // Отформатировать время
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleDateString()
  }

  // Инициализация
  onMounted(() => {
    // Начальное обновление
    updateAlerts()
    
    // Настроить автоматическое обновление каждые 30 секунд
    const interval = setInterval(updateAlerts, 30000)
    
    onUnmounted(() => {
      clearInterval(interval)
    })
  })

  return {
    activeAlerts,
    alertHistory,
    isLoading,
    updateAlerts,
    dismissAlert,
    dismissAllAlerts,
    getAlertStats,
    formatTime
  }
}