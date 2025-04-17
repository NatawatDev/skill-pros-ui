<template>
  <div>
    <BaseInput
      name="email"
      :value="email"
      label="Email"
      type="text"
      validate="required|email"
      @input="handleSearchInput"
    />

    <BaseInput
      name="password"
      :value="password"
      label="Password"
      type="password"
      validate="required|min:8"
      @input="val => password = val"
    />

  </div>
</template>

<script setup lang="ts">
const password = ref<string>('')
const email = ref<string>('')

function handleSearchInput(value) {
  email.value = value
  console.log(value)
}
</script>

<style scoped>

</style>