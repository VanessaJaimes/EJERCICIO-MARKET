var app = new Vue({
    el: "#app",
    data: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      dateInput: "",
      result: "",
      ids: JSON.parse(localStorage.getItem("resumes")),
    },
    methods: {
      submitForm() {
        
        
        if (!this.checkbox1 || !this.checkbox2 || !this.checkbox3) {
          this.result.innerHTML = swal("","Por favor acabar con el mantenimiento o revisiones para entrega del vehículo","error");
        } else {
            let date = this.ids[0].deadLine ? new Date(this.ids[0].deadLine): new Date();
            let threemonths = new Date(date.getTime() + 90 * 24 * 60 * 1000 * 60);
            let id = this.ids;
            for (let i = 0; i < this.ids.length; i++) {
              this.result = swal("Entrega del vehículo realizada","Hola " + id[i].name +" tiene garantía para el vehículo " + id[i].id + " de reparación y respuestos durante 3 meses la cual comienza " + id[i].deadLine + " y finaliza " + threemonths.toLocaleDateString(),"success");
          } 
            }
      },

    }
  });