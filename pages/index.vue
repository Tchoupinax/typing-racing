<template>
  <div class="mx-auto flex max-w-3xl flex-col items-center">
    <div
      v-if="text.length > 0"
      class="w-full rounded-2xl border border-surface-200 bg-white p-6 shadow-card sm:p-8"
    >
      <p class="font-mono text-lg leading-relaxed text-surface-700 sm:text-xl">
        <span class="text-track-600">{{ previousText }}</span>
        <span class="relative">
          <span class="text-track-600">{{ currentWordTypedPart }}</span>
          <span
            class="border-b-2 border-track-500 bg-track-50/50"
            :class="{
              'border-red-400 bg-red-50/50': invalidWrittenText !== '',
            }"
          >
            {{ currentWord.replace(currentWordTypedPart, "") }}
          </span>
        </span>
        {{ followingText }}
      </p>
    </div>

    <div
      v-else
      class="flex w-full items-center justify-center rounded-2xl border border-surface-200 bg-surface-50/50 py-16"
    >
      <span class="font-mono text-surface-500">Loading text…</span>
    </div>

    <div v-if="text.length > 0" class="mt-8 w-full max-w-2xl">
      <input
        v-model="writtenText"
        type="text"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        class="font-mono w-full rounded-xl border-2 bg-white px-4 py-3 text-lg text-surface-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-track-400/50 sm:text-xl"
        :class="
          invalidWrittenText !== ''
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50'
            : 'border-surface-200 focus:border-track-500'
        "
        placeholder="Start typing here…"
        @keyup="keyTyped"
      />

      <div class="mt-4 flex items-center gap-3">
        <div
          class="relative h-3 flex-1 overflow-hidden rounded-full bg-surface-200"
        >
          <div
            id="bar"
            class="h-full rounded-full bg-track-500 transition-all duration-300 ease-out"
            style="width: 0%"
          />
        </div>
        <span
          class="min-w-[3rem] text-right font-mono text-sm font-medium text-surface-600"
        >
          {{ progressionPercentage }}%
        </span>
      </div>
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
  started: boolean;
  progressionPercentage: number;
};

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
      started: false,
      progressionPercentage: 0,
    };
  },
  computed: {
    previousText() {
      if (this.text.length === 0) return "";
      return (
        this.text.split(" ").slice(0, this.wordIndexPassed).join(" ") + " "
      );
    },
    currentWordTypedPart() {
      return this.validWrittenText;
    },
    currentWord() {
      return this.text.split(" ")[this.wordIndexPassed];
    },
    followingText() {
      if (this.text.length === 0) return "";
      return this.text
        .replace(this.previousText, "")
        .replace(this.currentWord, "");
    },
  },
  mounted() {
    this.fetchText();
  },
  methods: {
    keyTyped($e: KeyboardEvent & { target: HTMLInputElement }) {
      if (!this.started) {
        this.started = true;
        this.startingTime = new Date();
      }
      if (this.finished) return;

      if (!this.currentWord?.includes($e.target.value.trim())) {
        this.invalidWrittenText =
          this.invalidWrittenText + $e.target.value.slice(-1);
        return;
      }

      this.invalidWrittenText = "";
      this.validWrittenText = this.writtenText;

      const percentage = Math.floor(
        ((this.previousText.length + this.currentWordTypedPart.length) /
          this.text.length) *
          100,
      );
      this.progressionPercentage = percentage;
      const bar = document.getElementById("bar");
      if (bar) bar.style.width = percentage + "%";

      if (`${this.currentWord} ` === $e.target.value) {
        this.wordIndexPassed++;
        this.writtenText = "";
        this.validWrittenText = "";
      } else if (this.previousText + this.validWrittenText === this.text) {
        const duration = Math.floor(
          new Date().getTime() / 1000 - this.startingTime.getTime() / 1000,
        );
        this.finished = true;
        window.setTimeout(() => {
          const wpm = Math.floor(this.text.split(" ").length / (duration / 60));
          let nickname = prompt(
            `Finished in ${duration} seconds (${wpm} wpm)! GG! What is your name?`,
          );
          while (nickname == null || nickname.length === 0) {
            nickname = prompt(
              `Finished in ${duration} seconds (${wpm} wpm)! GG! What is your name?`,
            );
          }
          $fetch("/api/rankings/new", {
            method: "POST",
            body: { nickname, score_wpm: wpm },
          });
        }, 1);
      }
    },
    async fetchText() {
      const data = await $fetch<{ text: string }>("/api/texts/random");
      this.text = data.text;
    },
  },
};
</script>
