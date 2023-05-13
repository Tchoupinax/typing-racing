<template>
  <div>
    <slot />

    <footer class="absolute bottom-0 left-0 flex justify-center w-full">
      <div class="flex items-center justify-between w-2/3 p-2 xl:w-1/2">
        <div>
          <nuxt-link
            class="ml-4 text-xl"
            :class="{
              'font-semibold': $route.name === 'index',
              'font-thin': $route.name !== 'index'
            }"
            to="/"
          >
            Home
          </nuxt-link>
          <nuxt-link
            class="ml-4 text-xl"
            :class="{
              'font-semibold': $route.name === 'ranking',
              'font-thin': $route.name !== 'ranking'
            }"
            to="/ranking"
          >
            Rankings
          </nuxt-link>
        </div>

        <a href="https://github.com/Tchoupinax/typing-racing" target="_blank" class="cursor-pointer">
          <img src="/images/GitHub_Logo.png" class="h-8 mr-4" />
        </a>
      </div>
    </footer>
  </div>
</template>
