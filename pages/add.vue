<template>
  <div class="flex items-center justify-center w-screen h-screen bg-white">
    <div class="container px-4 mx-auto my-4 lg:px-20">
      <div class="w-full p-8 my-4 mr-auto shadow-2xl md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 rounded-2xl">
        <div class="flex">
          <h1 class="text-3xl font-bold uppercase">Add a new text</h1>
        </div>
        <div class="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
          <select
            v-model="form.language"
            class="w-full p-3 mt-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
          </select>
          <select
            v-model="form.complexity"
            class="w-full p-3 mt-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
          >
            <option value="MEDIUM">MEDIUM</option>
            <option value="SMALL">SMALL</option>
            <option value="HIGH">HIGH</option>
          </select>
          </div>
          <div class="my-4">
            <textarea 
              placeholder="Text"
              class="w-full h-32 p-3 mt-2 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:shadow-outline"
              v-model="form.text"
            ></textarea>
          </div>
          <div class="w-1/2 my-2 lg:w-1/4">
            <button 
              @click="submitText"
              class="w-full p-3 text-sm font-bold tracking-wide text-gray-100 uppercase bg-blue-900 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">


export default {
  data() {
    return {
      form: {
        complexity: 'MEDIUM',
        language: 'EN',
        text: ''
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('typing-racing-authorization')) {
      const password = prompt('Password?');
      if (password) {
        localStorage.setItem('typing-racing-authorization', password)
      }
    }
  },
  methods: {
    submitText() {
      $fetch('/api/texts/insert', {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('typing-racing-authorization') ?? "_"
        },
        body: { ...this.form }
      })
    }
  }
}
</script>