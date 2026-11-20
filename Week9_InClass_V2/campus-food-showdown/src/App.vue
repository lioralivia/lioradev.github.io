<script setup>
import { ref, computed } from 'vue'
import SnackCard from './components/SnackCard.vue'
import Leaderboard from './components/Leaderboard.vue'

const snacks = ref([
  { id: 1, name: 'Bubble Tea', emoji: '🧋', votes: 0 },
  { id: 2, name: 'Pizza', emoji: '🍕', votes: 0 },
  { id: 3, name: 'Fries', emoji: '🍟', votes: 0 },
  { id: 4, name: 'Ice Cream', emoji: '🍦', votes: 0 }
])

// TODO Part B: Write voteForSnack(snackId) to add one vote to the matching snack.
function voteForSnack(snackId) {
  // Your code here
  const snack = snacks.value.find(item => item.id === snackId)
  if(snack)
    snack.votes += 1
}

// TODO Part C: Compute rankedSnacks in descending order of votes.
// Important: do not sort snacks.value directly!
const rankedSnacks = computed(() => {
  const sorted =  snacks.value.toSorted((a, b) => b.votes - a.votes);
  return sorted;
});

// TODO Part D: Compute the sum of votes across all snacks.
const totalVotes = computed(() => {
  return snacks.value.reduce((sum,snack) => sum + snack.votes, 0);
}) // Replace this

// TODO Part E: Reset every snack's vote count to zero.
function resetVotes() {
  // Your code here
  snacks.value.forEach(snack => {
    snack.votes = 0;
  });
}

function winner() {
  let highest = 0;
  let highest_name = null;
  for (let snack of snacks.value){
    if (snack.votes > highest){
      highest_name = snack.name;
      highest = snack.votes;
    }
  }
  return highest_name.toLowerCase();
}
</script>

<template>
  <main>
    <h1>🍕 Campus Food Showdown!</h1>
    <p class="subtitle">Vote for the snack that deserves to win Campus Favorite.</p>

    <div class="topline">
      <p><strong>Total Votes:</strong> {{ totalVotes }}</p>
      <button class="secondary" @click="resetVotes">Reset Votes</button>
    </div>

    <!-- TODO Part D: Show 'No votes yet!' or 'Currently leading: NAME!' -->
    <p class="status">{{ totalVotes == 0 ? "No votes yet!" : "Currently leading " + winner() + "!"}}</p>

    <section class="cards">
      <!-- TODO Parts A & B: Render SnackCard with v-for, :key, :snack, and @vote -->
       <SnackCard 
        v-for="snack in snacks"
        :snack="snack"
        @vote="voteForSnack"
       />
    </section>

    <!-- TODO Part C: Pass :ranked-snacks to Leaderboard -->
    <Leaderboard 
      v-bind:rankedSnacks="rankedSnacks"
      :rankedSnacks = "rankedSnacks()"
    />
  </main>
</template>
