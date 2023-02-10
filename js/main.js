var app = new Vue({
  el: "#app",
  data: {
    selected: null,
    amount: 0,
    productsSelected: [],
    date: "",
    ID: "",
    NIT: "",
    name:"",
    inventory: [
      { name: "aceite", amount: 10, price: 30000 },
      { name: "empaque", amount: 100, price: 2500 },
      { name: "llanta", amount: 20, price: 100000 },
      { name: "bateria", amount: 100, price: 50000 },
      { name: "discos frenos", amount: 40, price: 30000 },
    ],

    is: {
      id: false,
      nit: false,
    },
  },

  methods: {
    addReplacement() {
      if (!this.date || this.date == "" || this.date == null) {
        Swal.fire({
          title: "Error",
          text: "Fecha Venta Repuesto inválido",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      if (!this.selected || this.selected == "" || this.selected == null) {
        Swal.fire({
          title: "Error",
          text: "Seleccione un repuesto",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      if (
        !this.amount ||
        this.amount == "" ||
        this.amount == null ||
        this.amount <= 0
      ) {
        Swal.fire({
          title: "Error",
          text: "La cantidad debe ser mayor a cero",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }

      // if-cedula
      if (
        (this.selected === "aceite" ||
          this.selected === "empaque" ||
          this.selected === "llanta" ||
          this.selected === "bateria" ||
          this.selected === "discos frenos") &&
        this.amount > 0 &&
        this.date &&
        this.ID
      ) {
        let isAvailable = this.inventory.filter((item) => {
          if (item.name === this.selected) {
            if (this.amount <= item.amount) {
              return item;
            }
          }
        });

        if (isAvailable.length > 0) {
          this.productsSelected.push({
            id: parseInt(this.ID),
            nameReplacement: `${this.selected}`,
            amount: parseInt(`${this.amount}`),
            date: new Date(`${this.date}`).toLocaleDateString("es-CO"),
          });

          localStorage.setItem(
            "productSell",
            JSON.stringify(this.productsSelected)
          );

          this.amount = 0;
          this.selected = null;
          // this.ID = "";
          // this.NIT = "";
          // this.date = "";
          // this.is = {
          //   id: false,
          //   nit: false,
          // };

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Repuesto agregado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No hay cantidades disponibles solicitadas",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        console.log(this.productsSelected);
      } else if (
        (this.selected === "aceite" ||
          this.selected === "empaque" ||
          this.selected === "llanta" ||
          this.selected === "bateria" ||
          this.selected === "discos frenos") &&
        this.amount > 0 &&
        this.date &&
        this.NIT
      ) {
        let isAvailable = this.inventory.filter((item) => {
          if (item.name === this.selected) {
            if (this.amount <= item.amount) {
              return item;
            }
          }
        });

        if (isAvailable.length > 0) {
          this.productsSelected.push({
            NIT: this.NIT,
            nameReplacement: `${this.selected}`,
            amount: parseInt(`${this.amount}`),
            date: new Date(`${this.date}`).toLocaleDateString("es-CO"),
          });

          localStorage.setItem(
            "productSell",
            JSON.stringify(this.productsSelected)
          );

          this.amount = 0;
          this.selected = null;
          // this.ID = "";
          // this.NIT = "";
          // this.date = "";
          // this.is = {
          //   id: false,
          //   nit: false,
          // };
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Repuesto agregado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No hay cantidades disponibles solicitadas",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          return false;
        }

        console.log(this.productsSelected);
      }
    },
  },

  created() {
    let productSell = JSON.parse(localStorage.getItem("productSell"));

    if (productSell != null) {
      this.productsSelected = productSell;
    }
    if(JSON.parse(localStorage.getItem("is"))===null) return

    this.is=JSON.parse(localStorage.getItem("is"))
    if(this.is.id){
      this.ID=localStorage.getItem("id")
    }
    if(this.is.nit){
      this.NIT=localStorage.getItem("id")
    }
    this.name=localStorage.getItem("name")
    this.date=localStorage.getItem("deadLine")
    

  },
});
