<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-6 text-2xl font-semibold text-surface-900">Add a new text</h1>

    <div
      class="rounded-2xl border border-surface-200 bg-white p-6 shadow-card sm:p-8"
    >
      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            for="language"
            class="mb-1.5 block text-sm font-medium text-surface-700"
          >
            Language
          </label>
          <select
            id="language"
            v-model="form.language"
            class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-surface-800 focus:border-track-500 focus:outline-none focus:ring-2 focus:ring-track-400/30"
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
          </select>
        </div>
        <div>
          <label
            for="complexity"
            class="mb-1.5 block text-sm font-medium text-surface-700"
          >
            Complexity
          </label>
          <select
            id="complexity"
            v-model="form.complexity"
            class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-surface-800 focus:border-track-500 focus:outline-none focus:ring-2 focus:ring-track-400/30"
          >
            <option value="MEDIUM">Medium</option>
            <option value="SMALL">Small</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      <div class="mt-5">
        <label
          for="text"
          class="mb-1.5 block text-sm font-medium text-surface-700"
        >
          Text
        </label>
        <textarea
          id="text"
          v-model="form.text"
          placeholder="Paste or type the text to add…"
          rows="6"
          class="w-full resize-y rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 font-mono text-sm text-surface-800 placeholder:text-surface-400 focus:border-track-500 focus:outline-none focus:ring-2 focus:ring-track-400/30"
        />
      </div>

      <div class="mt-6">
        <button
          type="button"
          class="rounded-xl bg-track-600 px-6 py-3 font-medium text-white transition-colors hover:bg-track-700 focus:outline-none focus:ring-2 focus:ring-track-500 focus:ring-offset-2"
          @click="submitText"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      form: {
        complexity: "MEDIUM",
        language: "EN",
        text: "",
      },
    };
  },
  mounted() {
    if (!localStorage.getItem("typing-racing-authorization")) {
      const password = prompt("Password?");
      if (password) {
        localStorage.setItem("typing-racing-authorization", password);
      }
    }
  },
  methods: {
    submitText() {
      $fetch("/api/texts/insert", {
        method: "POST",
        headers: {
          authorization:
            localStorage.getItem("typing-racing-authorization") ?? "_",
        },
        body: { ...this.form },
      });
    },
  },
};
</script>
