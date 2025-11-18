<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <nav class="flex items-center justify-between px-6 py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group" @click="closeMenu">
          <div class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-white font-bold text-lg tracking-tight">HydroVision</span>
            <span class="text-cyan-400 text-xs font-mono">MONITORING SYSTEM</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink 
            to="/map" 
            class="flex items-center space-x-2 px-4 py-2 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-medium"
          >
            <span>🗺️</span>
            <span>Map</span>
          </NuxtLink>
          <NuxtLink 
            to="/analytics" 
            class="flex items-center space-x-2 px-4 py-2 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-medium"
          >
            <span>📊</span>
            <span>Analytics</span>
          </NuxtLink>
          
        </div>

        <!-- Mobile Menu Button -->
        <button 
          ref="toggleRef" 
          class="md:hidden w-12 h-12 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-slate-700/50 transition-all duration-300"
          @click="isOpen = !isOpen"
        >
          <div class="space-y-1.5">
            <span
              :class="[
                'block h-0.5 w-6 bg-cyan-400 transition-all duration-300 rounded-full',
                isOpen ? 'translate-y-2 rotate-45' : ''
              ]"
            ></span>
            <span
              :class="[
                'block h-0.5 w-6 bg-cyan-400 transition-all duration-300 rounded-full',
                isOpen ? 'opacity-0' : 'opacity-100'
              ]"
            ></span>
            <span
              :class="[
                'block h-0.5 w-6 bg-cyan-400 transition-all duration-300 rounded-full',
                isOpen ? '-translate-y-2 -rotate-45' : ''
              ]"
            ></span>
          </div>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          ref="menuRef"
          v-if="isOpen"
          class="md:hidden bg-slate-800/95 backdrop-blur-xl border-b border-slate-700 px-6 py-4 space-y-3"
        >

          <NuxtLink to="/map" class="flex items-center space-x-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 font-medium" @click="closeMenu">
            <span>🗺️</span>
            <span>Map</span>
          </NuxtLink>
          <NuxtLink to="/Analytics" class="flex items-center space-x-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 font-medium" @click="closeMenu">
            <span>📊</span>
            <span>Analytics</span>
          </NuxtLink>
          
        </div>
      </Transition>
    </header>

    <!-- Main Content -->
    <main class="flex-1 relative">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative z-10">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50">
      <div class="px-6 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-4"></div>
          <div class="flex items-center space-x-4">
            <span class="text-slate-400 text-sm">Open in Maps</span>
            <a
  href="https://www.google.com/maps"
  target="_blank"
  rel="noopener noreferrer"
  class="bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 hover:bg-slate-700 transition-all duration-300 group p-2"
>
  <img 
    src="/images/googlemap.webp" 
    alt="Google Maps" 
    class="w-8 h-10 group-hover:scale-110 transition-transform object-contain"
  />
</a>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t border-slate-700/50">
        
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const menuRef = ref(null)
const toggleRef = ref(null)

// Navigation Link Components
const NavLink = {
  props: ['to', 'icon'],
  setup(props, { slots }) {
    return () => h(
      NuxtLink,
      {
        to: props.to,
        class: 'flex items-center space-x-2 px-4 py-2 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-medium'
      },
      {
        default: () => [
          h('span', { class: 'text-lg' }, props.icon),
          h('span', { class: 'text-sm' }, slots.default?.())
        ]
      }
    )
  }
}

const MobileNavLink = {
  props: ['to', 'icon', 'onClick'],
  setup(props, { slots }) {
    return () => h(
      NuxtLink,
      {
        to: props.to,
        class: 'flex items-center space-x-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 font-medium',
        onClick: props.onClick
      },
      {
        default: () => [
          h('span', { class: 'text-xl' }, props.icon),
          h('span', { class: 'text-base' }, slots.default?.())
        ]
      }
    )
  }
}

const closeMenu = () => {
  isOpen.value = false
}

const handleClickOutside = event => {
  if (!isOpen.value) return

  const menuEl = menuRef.value
  const toggleEl = toggleRef.value
  const target = event.target

  if ((menuEl && menuEl.contains(target)) || (toggleEl && toggleEl.contains(target))) {
    return
  }

  closeMenu()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>