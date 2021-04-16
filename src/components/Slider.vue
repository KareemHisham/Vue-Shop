<template>
  <section class="slider">
    <div class="container">
      <carousel>
        <slide v-for="mobile in mobiles" :key="mobile.id">
          <img :src="mobile.data().imageUrl" alt="Product-Image" />
          <div class="info">
            <div class="name mb-3">{{ mobile.data().name }}</div>
            <div class="price mb-3">{{ mobile.data().price }} L.E</div>
          </div>
          <div class="description mb-3">{{ mobile.data().description }}</div>
          <button class="btn btn-primary" @click="addToCart(mobile.data())">
            Add to cart
          </button>
        </slide>
      </carousel>
    </div>
  </section>
</template>
<script>
export default {
  name: "slider",
  props: ["mobiles"],
  data() {
    return {
      items: {
        name: this.mobiles
      }
    };
  },
  methods: {
    addToCart(v) {
      console.log(v);
    }
  }
};
</script>
<style lang="scss" scoped>
.slider {
  img {
    width: 100%;
    margin-bottom: 15px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .info .name {
    font-weight: 500;
    font-size: 20px;
  }
}
</style>
