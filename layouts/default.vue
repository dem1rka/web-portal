<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-slate-900/80 border-b border-slate-700/50">
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
          
          <!-- Login Button -->
          <button 
            @click="showLogin = true"
            class="flex items-center space-x-2 px-4 py-2 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-medium"
          >
            <span>🔑</span>
            <span>Login</span>
          </button>
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
          
          <!-- Mobile Login Button -->
          <button 
            @click="showLogin = true; closeMenu();"
            class="flex items-center space-x-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 font-medium w-full"
          >
            <span>🔑</span>
            <span>Login</span>
          </button>
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

    <!-- Login Modal Overlay -->
    <Transition name="fade">
      <div 
        v-if="showLogin" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="showLogin = false"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <!-- Login Form -->
        <div class="relative z-10 w-full max-w-md">
          <Transition name="slide-up">
            <div 
              v-if="showLogin"
              class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden"
            >
              <!-- Form Header -->
              <div class="p-6 border-b border-slate-700/50">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 class="text-white font-bold text-xl">Welcome Back</h2>
                      <p class="text-cyan-400 text-sm font-mono">HydroVision Login</p>
                    </div>
                  </div>
                  <button 
                    @click="showLogin = false"
                    class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-colors"
                  >
                    <span class="text-slate-400 hover:text-white text-lg">×</span>
                  </button>
                </div>
              </div>

              <!-- Form Body -->
              <div class="p-6">
                <form @submit.prevent="handleLogin" class="space-y-6">
                  <!-- Email Field -->
                  <div class="space-y-2">
                    <label class="text-slate-300 text-sm font-medium block">
                      <div class="flex items-center space-x-2 mb-1">
                        <span class="text-cyan-400">✉️</span>
                        <span>Email Address</span>
                      </div>
                      <input
                        v-model="loginForm.email"
                        type="email"
                        required
                        placeholder="admin@hydrovision.com"
                        class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      />
                    </label>
                  </div>

                  <!-- Password Field -->
                  <div class="space-y-2">
                    <label class="text-slate-300 text-sm font-medium block">
                      <div class="flex items-center space-x-2 mb-1">
                        <span class="text-cyan-400">🔒</span>
                        <span>Password</span>
                      </div>
                      <input
                        v-model="loginForm.password"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        placeholder="••••••••"
                        class="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      />
                    </label>
                    <div class="flex items-center justify-between">
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-1"
                      >
                        <span>{{ showPassword ? '👁️' : '👁️‍🗨️' }}</span>
                        <span>{{ showPassword ? 'Hide' : 'Show' }} Password</span>
                      </button>
                      <button
                        type="button"
                        @click="handleForgotPassword"
                        class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>

                  <!-- Remember Me -->
                  <div class="flex items-center space-x-2">
                    <input
                      v-model="loginForm.remember"
                      type="checkbox"
                      id="remember"
                      class="w-4 h-4 rounded border-slate-700 bg-slate-800/50 text-cyan-500 focus:ring-cyan-500/50 focus:ring-offset-slate-900"
                    />
                    <label for="remember" class="text-slate-300 text-sm">
                      Remember me for 30 days
                    </label>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    :disabled="isLoggingIn"
                    class="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span v-if="isLoggingIn" class="animate-spin">⟳</span>
                    <span>{{ isLoggingIn ? 'Signing in...' : 'Sign In to Dashboard' }}</span>
                    <span v-if="!isLoggingIn">→</span>
                  </button>

                  <!-- Divider -->
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-slate-700/50"></div>
                    </div>
                    <div class="relative flex justify-center text-xs">
                      <span class="px-2 bg-slate-800 text-slate-500">Or continue with</span>
                    </div>
                  </div>

                  <!-- Social Login -->
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      @click="handleSocialLogin('google')"
                      class="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-700/50 transition-colors"
                    >
                      <span>🔍</span>
                      <span class="text-slate-300">Google</span>
                    </button>
                    <button
                      type="button"
                      @click="handleSocialLogin('microsoft')"
                      class="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-700/50 transition-colors"
                    >
                      <span>💼</span>
                      <span class="text-slate-300">Microsoft</span>
                    </button>
                  </div>

                  <!-- Demo Credentials -->
                  <div class="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50">
                    <p class="text-sm text-slate-400 mb-2">Demo Credentials:</p>
                    <div class="text-xs text-slate-500 space-y-1">
                      <p>Email: <span class="text-cyan-400">admin@hydrovision.com</span></p>
                      <p>Password: <span class="text-cyan-400">demo123</span></p>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Form Footer -->
              <div class="p-4 border-t border-slate-700/50 bg-slate-900/50">
                <p class="text-center text-sm text-slate-500">
                  By signing in, you agree to our
                  <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors">Terms</a>
                  and
                  <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</a>
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const showLogin = ref(false)
const showPassword = ref(false)
const isLoggingIn = ref(false)
const menuRef = ref(null)
const toggleRef = ref(null)

// Login form data
const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

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

const handleLogin = async () => {
  isLoggingIn.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('Login attempt:', loginForm.value)
  // Here you would typically make an API call to your backend
  
  // Reset form
  loginForm.value = {
    email: '',
    password: '',
    remember: false
  }
  
  showLogin.value = false
  isLoggingIn.value = false
  
  // Show success message (you could add a toast notification here)
  alert('Login successful! Welcome to HydroVision Dashboard')
}

const handleForgotPassword = () => {
  alert('Password reset feature coming soon!')
}

const handleSocialLogin = (provider) => {
  console.log(`Social login with ${provider}`)
  alert(`${provider} login integration coming soon!`)
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

// Close login modal on Escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showLogin.value) {
    showLogin.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
</style>