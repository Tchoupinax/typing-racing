<template>
  <div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nickname
            </th>
            <th scope="col" class="px-6 py-3">
              Score (Word Per Second)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score of scores" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ score.nickname }}
            </th>
            <td class="px-6 py-4">
              {{ score.score_wpm }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
type State = {
  scores: Array<{ nickname: string, score_wpm: number }>
}

export default{
  data(): State {
    return {
      scores: []
    }
  },
  mounted() {
    this.fetchScores();
  },
  methods: {
    async fetchScores() {
      const data = await $fetch('/api/rankings')
      this.scores = data;
    }
  }
}
</script>