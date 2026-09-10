<script setup>

import { ref } from 'vue';

const dogs = ref([
    { name: 'healthy', age: 3 },
    { name: 'smiley', age: 7 },
    { name: 'happy', age: 1 }
]);

const dogName = ref('');
const dogAge = ref('');

function addDog() {
    if (dogName.value.length != 0 && dogAge.value.length != 0){
        let newDog = {name: dogName.value, age: dogAge.value};
        dogs.value.push(newDog);
        dogAge.value = "";
        dogName.value = "";
    }
    // TODO:
    // 1. Check that dogName and dogAge are not empty
    // 2. Add a new dog object to the dogs array
    // 3. Clear dogName
    // 4. Clear dogAge

}

</script>


<template>

    <h1>🐶 Welcome to Krazy Dog Café!</h1>

    <hr>

    <h2>Our Current Dogs</h2>

    <!-- TODO:
         Display the dogs as an ordered list.

         Example:
         Healthy is 3 years old
         Smiley is 7 years old
         Happy is 1 year old

         Remember:
         - Capitalize the first character of the dog's name.
         - Use "year" when age is 1.
         - Use "years" for all other ages.
    -->
    <ol>
        <li v-for="dog in dogs"><p v-if="dog.age == 1">{{ dog.name[0].toUpperCase() }}{{ dog.name.slice(1, dog.name.length)}} is {{ dog.age }} year old</p> <p v-else>{{ dog.name[0].toUpperCase() }}{{ dog.name.slice(1, dog.name.length)}} is {{ dog.age }} years old</p></li>
    </ol>

    <hr>

    <h2>Add a Dog</h2>
    Dog Name: 
    <input type="text" v-model="dogName">
    <br>
    Dog Age: 
    <input type="text" v-model="dogAge">
    <!-- TODO:
         Create inputs for:
         1. Dog Name
         2. Dog Age
    -->
    <br>
    <button v-on:click="addDog()">Add Dog</button>
    <!-- TODO:
         Create an Add Dog button.
         When clicked, call addDog().
    -->

</template>


<style scoped>

h1 {
    background-color: lightyellow;
}

input {
    margin: 5px;
}

button {
    margin: 5px;
}

</style>