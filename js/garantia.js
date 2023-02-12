var app = new Vue({
  el: "#app",
  data: {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    deadLine: "",
    id: "",
    name: "",
    saveData: [],
    prnt: false,
  },
  methods: {
    submitForm() {
      //Comprobar si falta algunos checkbos por verificar y dar aviso de lo faltante
      if (
        !this.checkbox1 ||
        !this.checkbox2 ||
        !this.checkbox3 ||
        this.name == "" ||
        this.id == "" ||
        this.deadLine ==""
      ) {
        Swal.fire({
          title:
            "Por favor acabar con el mantenimiento o revisiones para entrega del vehículo o verifique si los datos estan llenos",
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
        //se comprueba si está listo el vehículo con un aviso y dandole la garantía de tres meses
        const date = this.deadLine ? new Date(this.deadLine) : new Date();
        const threemonths = new Date(date.getTime() + 90 * 24 * 60 * 1000 * 60);

        Swal.fire({
          title: "Entrega del vehículo realizada",
          text:
            "Hola " +
            this.name +
            " con número de identificación " +
            this.id +
            ", su vehículo tiene una garantía de 3 meses a partir de " +
            date.toLocaleDateString() +
            " la cual termina " +
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
        //Validación en CC o NIT
        if (this.id.toString().length < 8) {
          Swal.fire({
            title: "La identificación o el NIT debe tener al menos 8 dígitos",
            icon: "error",
          });
        }
      }
    },
    prt() {
      this.prnt = !this.prnt;
    },
    resetForm() {
      this.name = "";
      this.id = "";
      this.deadLine = "";
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = false;
    },

    saveWarranty() {
      const guardData = this.submitForm();
      console.log(this.saveWarranty);
      if (!guardData) {
        return; //Si los datos no son correctos no haga nada.
      }
      const dataLocal = {
        name: this.name,
        id: this.id,
        deadLine: this.deadLine,
        checkbox1:this.checkbox1,
        checkbox2:this.checkbox2,
        checkbox3:this.checkbox3,
      };
      this.saveData.push(dataLocal);
      localStorage.setItem("saveData",JSON.stringify(this.saveData)); //Actualizo en el LocalStorage la data.
      this.successfulAlert();
      this.resetForm();
      console.log(this.saveData); //Saco por consola la base de datos con los registros
    },
  },
  mounted(){
    this.resumes=JSON.parse(localStorage.getItem("resumes"))
    if(this.resumes===null){
      this.resumes=[]
    }
  }
});
