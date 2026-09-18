<script setup>
import {ref} from 'vue';
import axios from 'axios'
const myCity = ref('Pyongyang')
let currentTemp = ref("");
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

async function checkWeather(){
  console.log("[Start] checkWeather for: ", myCity.value)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity.value}&units=metric&appid=${API_KEY}`
  console.log(url)
  try{
    const response = await axios.get(url);
    console.log(response.data.main.temp)
    currentTemp.value = response.data.main.temp
  }catch(error){
    console.log("Weather API call failed", error)
  }
  console.log("[End] checkWeather")
}

</script>

<template>
  <h1>Mini Weather App</h1> <br>
  City: <input type="text" v-model="myCity"></input> <br> <br>
  <button @click="checkWeather()">
    Get Temperature (Celcius)
  </button>
  <h2>Temperature in Celcius:</h2>
  <p>{{ currentTemp }}</p>
  <img v-if = "currentTemp > 25" src="/weather_photos/hot.jpg" width="120px">
  <img v-if = "currentTemp <= 25 & currentTemp > 9" src="/weather_photos/okay.jpg" width="120px">
  <img v-if = "currentTemp <= 9" src="/weather_photos/cold.jpg" width="120px">

</template>

<style scoped>

</style>
