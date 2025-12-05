<template>
  <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
    <h3 class="text-white font-semibold mb-6 flex items-center gap-2">
      <span class="text-cyan-400">🔍</span> Filters & Search
    </h3>
    
    <!-- Search -->
    <div class="mb-6">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search water bodies..."
          class="w-full bg-slate-800/50 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
        >
        <div class="absolute left-3 top-3 text-slate-500">
          🔍
        </div>
      </div>
    </div>
    
    <!-- Filter by Type -->
    <div class="mb-6">
      <label class="text-slate-300 text-sm font-medium mb-3 block">Filter by Type</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="type in types"
          :key="type.value"
          @click="toggleType(type.value)"
          class="px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300"
          :class="selectedTypes.includes(type.value) ? type.activeClass : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          {{ type.label }}
        </button>
      </div>
    </div>
    
    <!-- Filter by Pollution Risk -->
    <div class="mb-6">
      <label class="text-slate-300 text-sm font-medium mb-3 block">Pollution Risk</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="risk in pollutionRisks"
          :key="risk.value"
          @click="pollutionRisk = risk.value"
          class="px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300"
          :class="pollutionRisk === risk.value ? risk.activeClass : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          {{ risk.label }}
        </button>
      </div>
    </div>
    
    <!-- Reset Filters -->
    <button
      @click="resetFilters"
      class="w-full mt-6 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300 font-medium flex items-center justify-center gap-2"
    >
      <span>🔄</span>
      Reset All Filters
    </button>
  </div>
</template>

<script setup lang="ts">
interface FilterEvent {
  searchQuery: string
  selectedTypes: string[]
  pollutionRisk: string
}

const emit = defineEmits<{
  filterChange: [event: FilterEvent]
}>()

const searchQuery = ref('')
const selectedTypes = ref<string[]>(['lake', 'river'])
const pollutionRisk = ref('all')

const types = [
  { value: 'lake', label: 'Lakes', activeClass: 'bg-blue-500/20 text-blue-400 border border-blue-400/30' },
  { value: 'river', label: 'Rivers', activeClass: 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' }
]

const pollutionRisks = [
  { value: 'all', label: 'All', activeClass: 'bg-slate-700/50 text-white border border-slate-600' },
  { value: 'low', label: 'Low', activeClass: 'bg-green-500/20 text-green-400 border border-green-400/30' },
  { value: 'medium', label: 'Medium', activeClass: 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' },
  { value: 'high', label: 'High', activeClass: 'bg-red-500/20 text-red-400 border border-red-400/30' }
]

const toggleType = (type: string) => {
  const index = selectedTypes.value.indexOf(type)
  if (index > -1) {
    selectedTypes.value.splice(index, 1)
  } else {
    selectedTypes.value.push(type)
  }
  emitFilters()
}

const emitFilters = () => {
  emit('filterChange', {
    searchQuery: searchQuery.value,
    selectedTypes: selectedTypes.value,
    pollutionRisk: pollutionRisk.value
  })
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedTypes.value = ['lake', 'river']
  pollutionRisk.value = 'all'
  emitFilters()
}

// Watch for changes
watch([searchQuery, pollutionRisk], () => {
  emitFilters()
}, { deep: true })
</script>