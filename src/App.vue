<template>
  <Header />
  <div class="wrapper-content">
    <div class="container">
      <router-view />
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import process from '@/_config'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss"></style>
