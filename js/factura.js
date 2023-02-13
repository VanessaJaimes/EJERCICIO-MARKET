const { createApp } = Vue

  createApp({
    data() {
      return {
        data:{}

      }
    },
    methods:{
      addFormat(money){
        return money.toLocaleString('es-ES',{style:'currency',currency:'COP',maximumFractionDigits: 0})
      }
      
    },
    computed:{
      getIva(){
        return 19
      },
      getTotal(){
        let total=0
        this.data.vehicleParts.forEach(el => {
          total+= el.totalPrice
        })
        return total
      }
    },
    created(){
        this.data=JSON.parse(localStorage.getItem("data"))
    }
  }).mount('#factura')