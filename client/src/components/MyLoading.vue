<template>
  <div class="loading">
    <i class="fas fa-circle-notch quick-spin"></i>
    Loading...
  </div>
</template>
<script>
export default {
  name: 'MyLoading'
}
</script>
<style lang="scss">
$orange: #FF6600;
.loading {
  font-size: 0.8rem;
  font-weight: 400;
  color: $orange;
  line-height: 1rem;
  height: 1rem;
  vertical-align: center;
  margin: 0 1rem;
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
  .quick-spin {
    -webkit-animation: fa-spin 1s infinite linear;
    animation: fa-spin 1s infinite linear;
  }
}
</style>
