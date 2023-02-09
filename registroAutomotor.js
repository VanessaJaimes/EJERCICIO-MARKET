const { createApp } = Vue

createApp({
    data() {
      return {
        name:'',
        id:null,
        dateOfAdmission:null, //Fecha ingreso vehículo
        failure:null, //Falla del vehículo
        deadLine:null,
        inCharge:'' //Encargado de la reparación

      }
    }
  }).mount('#app')