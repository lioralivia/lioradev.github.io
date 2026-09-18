<script setup>
import { ref, computed, watch } from 'vue';
  const group = "HUNTRIX";
  const selectedMember = ref(null)

const members = [
  {
    id: 1,
    name: 'Rumi',
    role: 'Leader, Vocal',
    img: '/huntrix_photos/rumi.jpg',
    profile: [
      'Zodiac Sign: Aries',
      'Chinese Zodiac Sign: Goat',
      'Oldest of the three members in HUNTRIX',
      'Taekwondo Black Belt',
      'Loves cats',
      'Her favorite ramen flavor is Spicy Chicken.'
    ]
  },
  {
    id: 2,
    name: 'Mira',
    role: 'Rapper',
    img: '/huntrix_photos/mira.jpg',
    profile: [
      'Zodiac Sign: Taurus',
      'Chinese Zodiac Sign: Monkey',
      'Dancing since 4 years old',
      'Choreography for most of HUNTRIX songs',
      'Mira can play drums',
      'Her favorite ramen flavor is roast beef.'
    ]
  },
  {
    id: 3,
    name: 'Zoey',
    role: 'Dancer',
    img: '/huntrix_photos/zoey.jpg',
    profile: [
      'Zodiac Sign: Sagittarius',
      'Chinese Zodiac Sign: Rooster',
      'Her hobbies are drawing and skateboarding.',
      'She can play the bass',
      "Wrote most of HUNTRIX songs' rap parts",
      'Her favorite ramen flavor is pork with soy sauce.'
    ]
  }
]

//  const words = ref(['Life', 'is', 'Good'])
//  const otherWords = ref(['I', 'feel', 'like', 'dying'])
// function joinedWords(){
//   console.log("function joinedWords()")
//   return words.value.join(' ')
// }
// const joinedOtherWords = computed (() =>{
//   console.log("Computed property joinedOtherWords()")
//   return otherWords.value.join(' ')
// })

const searchQuery = ref('')
const search = computed(() => {
  let searching = searchQuery.value.trim().toLowerCase();
  let searchlist = [];
  // selectedMember.value = null;
  if (searching.length == 0){
    return members
  }else{
    for (let member of members){
      if (member.name.toLowerCase().includes(searching)){
        searchlist.push(member)
      }
    }
    return searchlist
  }
})
function showProfile(member) {
  selectedMember.value = member
}
function stopshowProfile(){
  selectedMember.value = null;
}
watch(searchQuery, () => {
  selectedMember.value = null;
});

</script>

<template>
  <main class="container">
    <h1> {{group}} Member Explorer</h1>
    <p>
      Search: <input type="text" name="name" v-model="searchQuery">
    </p>

    <p v-if="search.length == 0">
      No members found for {{ searchQuery }}
    </p>
    <ol v-else>
      <p>Results: {{ search.length }} of {{ members.length }}</p>
      <li v-for="member of search" :key="member.id">
        <button :class="{active: selectedMember && selectedMember.id === member.id}" v-if="selectedMember" @click="stopshowProfile()">
          {{ member.name }} – {{ member.role }}
        </button>
        <button :class="{active: selectedMember && selectedMember.id === member.id}" v-else @click="showProfile(member)">
          {{ member.name }} – {{ member.role }}
        </button>

        <br>
        <img :src="member.img" :title="member.name" width="100px" >
      </li>
    </ol>
    <section v-if="selectedMember" class="profile">
      <h2>{{ selectedMember.name }}'s Profile</h2>
      <ul>
        <li 
          v-for="(info, idx) in selectedMember.profile" :key="idx">
          {{ info }}
        </li>
      </ul>
    </section>


    <!-- <hr>
    <h3>Function call 1 : {{ joinedWords() }} </h3>
    <h3>Function call 2 : {{ joinedWords() }} </h3>
    <h3>Function call 3 : {{ joinedWords() }} </h3>
    <h3>Function computed call 1 : {{ joinedOtherWords }} </h3>
    <h3>Function computed call 2 : {{ joinedOtherWords }} </h3>
    <h3>Function computed call 3 : {{ joinedOtherWords }} </h3> -->
  </main>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}
.active {
  background-color: purple;
  color: white;
}

</style>
