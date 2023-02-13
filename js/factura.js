const { createApp } = Vue

  createApp({
    data() {
      return {
        data:{}

      }
    },
    mounted(){
        this.data=JSON.parse(localStorage.getItem("data"))
    }
  }).mount('#factura')