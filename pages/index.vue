<template>
  <div class="flex flex-col mx-32">
    <div
      v-if="text.length > 0"
      class="p-4 my-16 text-2xl rounded-lg xl:text-3xl bg-blue-50"
    >
      <span class="text-green-500">
        {{ previousText }}
      </span>
      <span class="underline">
        <span class="m-0 text-green-500">{{ currentWordTypedPart }}</span>{{ currentWord.replace(currentWordTypedPart, "") }}
      </span>
      {{ followingText }} 
    </div>

    <input
      @keyup="keyTyped"
      v-model="writtenText"
      class="p-2 text-xl border-4 rounded-md !outline-none"
      :class="{
        'border-red-600 border-4': invalidWrittenText !== ''
      }"
    />

    <div class="relative w-full h-6 mt-4 overflow-hidden rounded-full">
      <div class="absolute w-full h-full bg-gray-200"></div>
      <div id="bar" class="relative w-0 h-full bg-green-500"></div>
      <div class="absolute top-0 left-0 z-50 flex justify-center w-full mx-auto font-bold">{{ progressionPercentage }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
type State = {
  invalidWrittenText: string;
  startingTime: Date;
  text: string;
  validWrittenText: string;
  wordIndexPassed: number;
  writtenText: string;
  finished: boolean;
  progressionPercentage: number;
}

export default {
  data(): State {
    return {
      invalidWrittenText: "",
      startingTime: new Date(),
      text: "",
      validWrittenText: "",
      wordIndexPassed: 0,
      writtenText: "",
      finished: false,
      progressionPercentage: 0,
    }
  },
  computed: {
    previousText() {
      if (this.text.length === 0) {
        return ""
      }
      
      return this.text.split(' ').slice(0, this.wordIndexPassed).join(' ') + " ";
    },
    currentWordTypedPart() {
      return this.validWrittenText;
    },
    currentWordStayingPart() {
      if (this.text.length === 0) {
        return ""
      }
      
      return this.currentWord.replace(this.currentWordTypedPart, "");
    },
    currentWord() {
      if (this.text.length === 0) {
        return ""
      }
      
      return this.text.split(' ')[this.wordIndexPassed];
    },
    followingText() {
      if (this.text.length === 0) {
        return ""
      }
      
      return this.text.replace(this.previousText, '').replace(this.currentWord, '');
    },
    followingWord() {
      if (this.text.length === 0) {
        return ""
      }
      
      return this.text.replace(this.currentWord, '');
    },
  },
  mounted() {
    this.fetchText();
  },
  methods: {
    keyTyped($e) {
      if (this.finished) {
        return;
      }

      if (!this.currentWord.includes($e.target.value.trim())) {
        this.invalidWrittenText = this.invalidWrittenText + $e.target.value.slice(-1)
        return
      }
   
      this.invalidWrittenText = ""
      this.validWrittenText = this.writtenText

      const percentage = Math.floor((this.previousText.length + this.currentWordTypedPart.length)/ this.text.length * 100);
      this.progressionPercentage = percentage;
      document.getElementById('bar')!.style.width = percentage + "%";

      if (`${this.currentWord} ` === $e.target.value) {
        this.wordIndexPassed++;

        this.writtenText = ""
        this.validWrittenText = ""
      } else if (this.previousText + this.validWrittenText === this.text) {
        const duration = Math.floor(new Date().getTime() / 1000 - this.startingTime.getTime() / 1000);
        this.finished = true
        window.setTimeout(() => {
          const wpm = Math.floor(this.text.split(' ').length / (duration / 60))
          const nickname = prompt(`Finished in ${duration} seconds (${wpm} wpm)! GG! What is you name?`)
          $fetch('/api/rankings/new', {
            method: "POST",
            body: { nickname, score_wpm: wpm }
          })
        }, 1)
      }
    },
    async fetchText() {
      const data = await $fetch('/api/texts/random')
      this.text = data.text
    }
  }
}
</script>