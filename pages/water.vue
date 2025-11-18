<template>
    <div class="w-full h-full items-center justify-center p-4 lg:p-16 space-y-6 bg-gray-200">
        <div class="h-16"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(value,index) in summaryCards" :key="index" class="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-md border border-blue-100">
                <div class="frame_style"></div>
                <div>
                    <p class="text-sm text-blue-600">{{ value.label }}</p>
                    <p class="text-2xl text-blue-900">{{ value.total }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap gap-6 w-full justify-center">
            <div class="w-full lg:basis-3/4 bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <div class="h-full w-full">
                    <div class="p-6 space-y-6">
                        <div class="flex flex-col gap-2">
                            <h2 class="text-2xl text-blue-900 font-semibold">Water Temperature Overview</h2>
                        </div>
                        <div v-if="activeBody" class="rounded-2xl border border-blue-100 p-4 space-y-2 bg-gradient-to-br from-white to-blue-50/40">
                            <p class="text-xs text-gray-500 uppercase tracking-wide">Selected water body</p>
                            <p class="text-xl font-semibold text-blue-900">{{ activeBody.name }}</p>
                            <p class="text-sm text-gray-600">{{ activeBody.type }} &middot; {{ activeBody.location }}</p>
                        </div>
                        <div v-if="activeBody" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="rounded-2xl bg-blue-50 p-4 border border-blue-100">
                                <p class="text-xs uppercase tracking-wide text-blue-600">Min</p>
                                <p class="text-3xl font-semibold text-blue-900">{{ activeBody.min.toFixed(1) }}&deg;C</p>
                                <p class="text-sm text-gray-500">Lowest reading</p>
                            </div>
                            <div class="rounded-2xl bg-blue-600 text-white p-4 border border-blue-100">
                                <p class="text-xs uppercase tracking-wide opacity-70">Avg</p>
                                <p class="text-3xl font-semibold">{{ activeBody.avg.toFixed(1) }}&deg;C</p>
                                <p class="text-sm opacity-75">Daily average</p>
                            </div>
                            <div class="rounded-2xl bg-orange-50 p-4 border border-orange-100">
                                <p class="text-xs uppercase tracking-wide text-orange-600">Max</p>
                                <p class="text-3xl font-semibold text-orange-700">{{ activeBody.max.toFixed(1) }}&deg;C</p>
                                <p class="text-sm text-gray-500">Highest reading</p>
                            </div>
                        </div>
                        <div class="rounded-2xl border border-blue-100 p-4">
                            <p class="text-sm text-blue-900 font-semibold mb-3">All temperatures</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div v-for="body in temperatureBodies" :key="body.id" class="border border-blue-50 rounded-xl p-4 bg-white shadow-sm">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-sm text-blue-900 font-semibold">{{ body.name }}</p>
                                            <p class="text-xs text-gray-500">{{ body.type }} &middot; {{ body.location }}</p>
                                        </div>
                                        <p class="text-sm font-semibold text-blue-600">{{ body.avg.toFixed(1) }}&deg;C avg</p>
                                    </div>
                                    <div class="flex items-center justify-between text-xs text-gray-500 mt-2">
                                        <span>Min {{ body.min.toFixed(1) }}&deg;C</span>
                                        <span>Max {{ body.max.toFixed(1) }}&deg;C</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full lg:basis-1/5 space-y-6">
                <div class="flex flex-col bg-white rounded-2xl p-6 shadow-md border border-blue-100 items-center justify-start">
                    <div class="frame_style"></div>
                    <p class="text-center text-sm text-blue-600">Select a water body to view its detailed temperature.</p>
                </div>
                <div class="w-full max-w-md mx-auto bg-gray-50 rounded-2xl shadow-2xl overflow-hidden">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-sm font-medium text-gray-700">All Water Bodies</h2>
                        </div>
                        <div class="max-h-80 overflow-y-auto">
                            <button
                                v-for="body in temperatureBodies"
                                :key="body.id"
                                @click="selectBody(body.id)"
                                :class="[
                                    'w-full px-6 py-4 flex items-center gap-3 transition-colors text-left border-b border-gray-100 last:border-b-0',
                                    body.id === selectedBodyId ? 'bg-blue-50' : 'bg-white hover:bg-blue-50'
                                ]"
                            >
                                <span class="text-sm text-blue-600 font-medium">{{ body.name }}</span>
                                <span class="text-xs text-gray-500 ml-auto">{{ body.avg.toFixed(1) }}&deg;C</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { lakes } from '~/components/data'

interface LakeWithTemp {
    id: number
    name: string
    type: 'River' | 'Lake'
    location: string
    min: number
    avg: number
    max: number
}

const temperatureReadings = ref([
    { id: 1, min: 3.4, avg: 4.8, max: 6.1},
    { id: 2, min: 5.0, avg: 6.2, max: 7.4},
    { id: 3, min: 4.6, avg: 5.9, max: 7.0},
    { id: 4, min: 3.1, avg: 4.2, max: 5.6},
    { id: 5, min: 4.0, avg: 5.3, max: 6.5},
    { id: 6, min: 3.8, avg: 5.0, max: 6.2}
])

const temperatureBodies = computed<LakeWithTemp[]>(() => {
    return lakes.map((lake) => {
        const reading = temperatureReadings.value.find((entry) => entry.id === lake.id)
        return {
            id: lake.id,
            name: lake.name,
            type: lake.status === 'river' ? 'River' : 'Lake',
            location: `${lake.lat.toFixed(2)}, ${lake.lng.toFixed(2)}`,
            min: reading?.min ?? 0,
            avg: reading?.avg ?? 0,
            max: reading?.max ?? 0,
        }
    })
})

const selectedBodyId = ref(temperatureBodies.value[0]?.id ?? 0)

const activeBody = computed(() => {
    return temperatureBodies.value.find((body) => body.id === selectedBodyId.value) ?? null
})

const selectBody = (id: number) => {
    selectedBodyId.value = id
}

const summaryCards = computed(() => [
    { label: 'Total Water Body', total: lakes.length },
    { label: 'Rivers', total: lakes.filter((lake) => lake.status === 'river').length },
    { label: 'Lakes & Reservoirs', total: lakes.filter((lake) => lake.status === 'lake').length }
])
</script>

<style>
.frame_style{
    @apply w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center;
}
</style>