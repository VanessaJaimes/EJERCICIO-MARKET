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
        this.result.innerHTML = Swal.fire({
          title:
            "Por favor acabar con el mantenimiento o revisiones para entrega del vehículo",
          icon: "error",
          color: "#716add",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else {
        let date = this.ids[0].deadLine
          ? new Date(this.ids[0].deadLine)
          : new Date();
        let threemonths = new Date(date.getTime() + 90 * 24 * 60 * 1000 * 60);
        let id = this.ids;
        for (let i = 0; i < this.ids.length; i++) {
          this.result = Swal.fire({
            title: "Entrega del vehículo realizada",
            text:
              "Hola " +
              id[i].name +
              " tiene garantía para el vehículo " +
              id[i].id +
              " de reparación y respuestos durante 3 meses la cual comienza " +
              id[i].deadLine +
              " y finaliza " +
              threemonths.toLocaleDateString(),
            icon: "success",
            color: "#716add",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      }
      Init();
    },
  },
});