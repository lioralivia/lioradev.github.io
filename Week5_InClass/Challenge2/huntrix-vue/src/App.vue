<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios'
  const group = "HUNTRIX";
  const selectedMember = ref(null)

const members = ref([
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
    ],
    city: 'Seoul',
    temp: undefined,
    tempError: false
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
    ],
    city: 'Los Angeles',
    temp: undefined,
    tempError: false
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
    ],
    city: 'Moscow',
    temp: undefined,
    tempError: false
  }
])


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
    return members.value
  }else{
    for (let member of members){
      if (member.name.toLowerCase().includes(searching)){
        searchlist.push(member.value)
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
async function fetchWeather(member) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(member.city)}&units=metric&appid=${API_KEY}`
 
 try {
    const response = await axios.get(url)
    member.temp = Math.round(response.data.main.temp)
    member.tempError = false

  } catch (error) {
    console.error('Weather fetch failed:', error)
    member.temp = undefined
    member.tempError = true
  }
}

async function fetchAllWeather() {
  await Promise.all(
    members.value.map((member) => fetchWeather(member)))
}

onMounted(() => {
  fetchAllWeather()
})

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
        <p class="city-temp">
          <strong>{{ member.city }}</strong>

          <span v-if="member.tempError">
            - N/A
          </span>

          <span v-else-if="member.temp === undefined">
            - Loading...
          </span>

          <span v-else>
            - {{ member.temp }}°C
          </span>
        </p>

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

.city-temp {
  margin: 0.25rem 0 1rem;
  font-size: 0.9rem;
  color: #666;
}

</style>
