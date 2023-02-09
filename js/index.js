var app = new Vue({
    el: "#app",
    data: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      dateInput: "",
      result: ""
    },
    methods: {
      submitForm() {
        if (!this.checkbox1 || !this.checkbox2 || !this.checkbox3) {
          this.result.innerHTML = swal("","Por favor acabar con el mantenimiento o revisiones para entrega del vehículo","error");
        } else {
            let date = this.dateInput ? new Date(this.dateInput): new Date();
            let tresmes = new Date(date.getTime() + 90 * 24 * 60 * 1000 * 60);
           this.result = swal("Entrega del vehículo realizada","Tiene garantía de reparación y respuestos durante 3 meses a partir de la fecha de compra " + date.toLocaleDateString() + " la cual finaliza " + tresmes.toLocaleDateString(),"success");
        }
      }
    }
  });