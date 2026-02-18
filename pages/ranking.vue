<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="mb-6 text-2xl font-semibold text-surface-900">Leaderboard</h1>

    <div
      class="overflow-hidden bg-white border rounded-2xl border-surface-200 shadow-card"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50/80">
              <th scope="col" class="px-5 py-4 font-semibold text-surface-700">
                #
              </th>
              <th scope="col" class="px-5 py-4 font-semibold text-surface-700">
                Nickname
              </th>
              <th scope="col" class="px-5 py-4 font-semibold text-surface-700">
                WPM
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(score, index) in scores"
              :key="score.nickname + score.score_wpm"
              class="transition-colors border-b border-surface-100 last:border-0 hover:bg-surface-50/50"
            >
              <td class="px-5 py-4 font-mono text-surface-500">
                {{ index + 1 }}
              </td>
              <td class="px-5 py-4 font-medium text-surface-900">
                {{ score.nickname }}
              </td>
              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center rounded-full bg-track-100 px-2.5 py-0.5 font-mono text-sm font-medium text-track-700"
                >
                  {{ score.score_wpm }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="scores.length === 0"
        class="py-12 font-medium text-center text-surface-500"
      >
        No scores yet. Be the first to race!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type State = {
  scores: Array<{ nickname: string; score_wpm: number }>;
};

export default {
  data(): State {
    return {
      scores: [],
    };
  },
  mounted() {
    this.fetchScores();
  },
  methods: {
    async fetchScores() {
      const data =
        await $fetch<Array<{ nickname: string; score_wpm: number }>>(
          "/api/rankings",
        );
      this.scores = data;
    },
  },
};
</script>
