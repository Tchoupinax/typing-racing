<template>
  <div
    class="min-h-screen flex flex-col bg-surface-50 font-sans text-surface-800"
  >
    <header
      class="sticky top-0 z-40 border-b border-surface-200/80 bg-white/90 backdrop-blur-sm"
    >
      <div
        class="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6"
      >
        <NuxtLink
          to="/"
          class="text-xl font-semibold tracking-tight text-surface-900"
        >
          typing<span class="text-track-500">.racing</span>
        </NuxtLink>
        <nav class="flex items-center gap-1">
          <NuxtLink
            to="/"
            class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            :class="
              $route.name === 'index'
                ? 'bg-track-50 text-track-700'
                : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
            "
          >
            Race
          </NuxtLink>
          <NuxtLink
            to="/ranking"
            class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            :class="
              $route.name === 'ranking'
                ? 'bg-track-50 text-track-700'
                : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
            "
          >
            Rankings
          </NuxtLink>
          <NuxtLink
            to="/add"
            class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            :class="
              $route.name === 'add'
                ? 'bg-track-50 text-track-700'
                : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
            "
          >
            Add text
          </NuxtLink>
          <a
            href="https://github.com/Tchoupinax/typing-racing"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-2 rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-700"
            aria-label="GitHub"
          >
            <img src="/images/GitHub_Logo.png" class="h-6" alt="GitHub" />
          </a>
        </nav>
      </div>
    </header>

    <main class="flex-1 px-4 pb-24 pt-6 sm:px-6">
      <slot />
    </main>

    <footer class="border-t border-surface-200 bg-white py-3">
      <div
        class="mx-auto flex max-w-4xl items-center justify-center gap-2 px-4 text-sm text-surface-500"
      >
        <span>Open source clone of</span>
        <a
          href="https://play.typeracer.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-track-600 hover:text-track-700 hover:underline"
        >
          typeracer.com
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&family=JetBrains+Mono:wght@400;500;600&display=swap",
    },
  ],
});
</script>
