<template>
  <div class="flex flex-col mx-32">
    <div class="my-16 text-2xl">
      <span class="text-green-300">
        {{ previousText }}
      </span>
      <span class="underline">
        <span class="m-0 text-green-300">{{ currentWordTypedPart }}</span>{{ currentWord.replace(currentWordTypedPart, "") }}
      </span>
      {{ followingText }} 
    </div>

    <input
      @keyup="keyTyped"
      v-model="writtenText"
      class="p-2 border-4 rounded-md"
      :class="{
        'border-red-600 border-4': invalidWrittenText !== ''
      }"
    />
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
    }
  },
  mounted() {
    this.fetchText();
  },
  methods: {
    keyTyped($e) {
      if (!this.currentWord.includes($e.target.value.trim())) {
        this.invalidWrittenText = this.invalidWrittenText + $e.target.value.slice(-1)
        return
      }
   
      this.invalidWrittenText = ""
      this.validWrittenText = this.writtenText

      if (`${this.currentWord} ` === $e.target.value) {
        this.wordIndexPassed++;

        this.writtenText = ""
        this.validWrittenText = ""
      } else if (this.previousText + this.validWrittenText === this.text) {
        const duration = new Date().getSeconds() - this.startingTime.getSeconds();
        alert(`Finished in ${duration} seconds!`)
      }
    },
    async fetchText() {
      const data = await $fetch('/api/texts/random')
      this.text = data.text;
    }
  }
}
</script>