<template>
  <div>
    <div>Bot Name: {{ bot_name }}</div>
    <div>Bot Rating: {{ bot_rating }}</div>
  </div>
  <router-view />
</template>

<script>
import $ from "jquery";
import { ref } from "vue";

export default {
  name: "App",
  setup: () => {
    let bot_name = ref("");
    let bot_rating = ref("");

    $.ajax({
      url: "http://127.0.0.1:3000/pk/getbotinfo/",
      type: "get",
      success: (resp) => {
        bot_name.value = resp.name;
        bot_rating.value = resp.rating;
      },
    });

    return {
      bot_name,
      bot_rating,
    };
  },
};
</script>

<style>
body {
  background-image: url("/src/assets/background.jpg");
  background-size: cover;
}
</style>
