<template>
  <div class="example">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .example
    margin: 20px 0;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.1);
    transition: all .2s ease-in-out;
    &:hover
      box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.1), 5px 5px 25px rgba(0, 0, 0, .15);
</style>