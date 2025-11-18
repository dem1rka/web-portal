<template>
<div class="items-center justify-center p-24 bg-gray-200 space-y-6">
    <div class="items-center gap-4 bg-white rounded-2xl p-6 shadow-md border border-blue-100 ">
        <p class="text-xl text-start text-blue-600">Pathogen and MicroBiogiological Monitoring</p>
        <p class="text-sm text-start text-blue-600">Detection and monitoring of potential waterborne pathogens and indicator organisms to ensure water safety and quality.</p>
    </div>
    <div class="items-center gap-4 bg-white rounded-2xl p-6 shadow-md border border-blue-100 ">
        <div v-for="value in lakes">{{ value.name }}</div>
    </div>
    <div>

    </div>
    <div>
        <!-- for div -->
        <div></div>
    </div>
    <!-- statistic -->
    <div>

    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LakeData,lakes } from '~/components/data';




</script>