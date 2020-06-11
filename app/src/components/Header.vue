<template>
  <div class="Header">
    <router-link to="/">
      <h1>Utrecht in Perspectief</h1>
    </router-link>

    <router-link :to="{name: 'DrieLuik', params:{ id: this.$route.params.id}}">
      <button v-if="this.$route.name === 'Detail'" class="button">terug</button>
    </router-link>

    <router-link :to="{name: 'DrieLuik', params:{ id: this.$route.params.id}}">
      <button v-if="this.$route.name === 'Colofon'" class="button">terug</button>
    </router-link>

    <router-link :to="{name: 'Colofon', params:{ id: this.$route.params.id}}">
      <button v-if="this.$route.name !== 'Colofon'" class="button">Colofon</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.Header {
  display: inline-flex;
  color: #fff;
  background-color: #3b3f54;
  justify-content: space-around;
  align-items: center;
}

.button {
  background-color: #30988a;
}
</style>