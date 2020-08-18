<template>
  <div class="Header">
    <router-link to="/">
      <h1>Utrecht in Perspectief</h1>
    </router-link>
    <button
      v-if="this.$route.name === 'Detail' ||this.$route.name === 'Colofon' "
      class="button"
      v-on:click="goBack()"
    >terug</button>

    <div class="role-selector">
      <!-- Move input outside of .switch label -->
      <input type="checkbox" checked id="role-checkbox" />
      <span class="toggle-text">1669</span>
      <!-- Add for attribute that matches id of check input -->
      <label class="switch" for="role-checkbox">
        <span class="slider round"></span>
      </label>
      <span class="toggle-text">1684</span>
    </div>

    <router-link :to="{name: 'Colofon', params:{ id: this.$route.params.id}}">
      <button v-if="this.$route.name !== 'Colofon'" class="button">Colofon</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goBack() {
      this.$router.go(-1);
      // window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
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
  background-color: #3b3f54;
  height: 50px;
}
.button:hover {
  background-color: #30988a;
}

/* TOGGLE */
input {
  display: none;
}

/* Color labels green by default */
.role-selector input + span {
  color: #30988a;
}
.role-selector input + * + * + span {
  color: #3b3f54;
}

/* Color labels when input is checked */
.role-selector input:checked + span {
  color: #3b3f54;
}
.role-selector input:checked + * + * + span {
  color: #30988a;
}

.role-selector {
  display: inline-flex;
  background-color: #dacbb2;
  align-items: center;
  height: 50px;
}

.toggle-text {
  margin: 0 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #3b3f54;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #30988a;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + span + .switch .slider {
  background-color: #3b3f54;
}

input:focus + span + .switch .slider {
  box-shadow: 0 0 1px #ffffff;
}

input:checked + span + .switch .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>