var app = new Vue({
  el: "#app",
  data: {
    selected: null,
    amount: 0,
    productsSelected: [],
    date: "",
    ID: "",
    NIT: "",

    inventory: [
      { name: "aceite", amount: 10, price: 130000 },
      { name: "empaque", amount: 100, price: 56000 },
      { name: "llanta", amount: 20, price: 198400 },
      { name: "bateria", amount: 100, price: 289900 },
      { name: "discos frenos", amount: 40, price: 650000 },
    ],

    is: {
      id: false,
      nit: false,
    },

    price: 0,
  },

  methods: {
    showID() {
      this.is = {
        id: true,
        nit: false,
      };
      this.NIT = "";
    },

    showNIT() {
      this.is = {
        id: false,
        nit: true,
      };
      this.ID = "";
    },

    addReplacement() {
      let nameProducts = this.inventory.map(({ name }) => name);
      // console.log(nameProducts);
      const regExpNIT = /(^[0-9]+-{1}[0-9]{1})/g;
      const expRegID = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/g;

      if (!this.date || this.date == "" || this.date == null) {
        Swal.fire({
          title: "Error",
          text: "Fecha Venta Repuesto inválido",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
      if (
        !this.selected ||
        this.selected == "" ||
        this.selected == null ||
        !nameProducts.includes(this.selected)
      ) {
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

      // cedula
      if (
        nameProducts.includes(this.selected) &&
        this.amount > 0 &&
        this.date &&
        this.ID &&
        expRegID.test(this.ID)
      ) {
        let isAvailable = this.inventory.filter((item) => {
          if (item.name === this.selected) {
            if (this.amount <= item.amount) {
              this.price = item.price;
              return item;
            }
          }
        });

        if (isAvailable.length > 0) {
          this.inventory.forEach((el) => {
            if (el.name === this.selected) {
              return (el.amount -= this.amount);
            }
          });
          // console.log(this.inventory, this.amount);
          localStorage.setItem("inventory", JSON.stringify(this.inventory));

          this.productsSelected.push({
            id: parseInt(this.ID),
            name: `${this.selected}`,
            amount: parseInt(`${this.amount}`),
            date: new Date(`${this.date}`).toLocaleDateString("es-CO"),
            price: parseInt(`${this.price}`),
            totalPrice: parseInt(`${this.price * this.amount}`),
          });

          localStorage.setItem(
            "productSell",
            JSON.stringify(this.productsSelected)
          );

          this.amount = 0;
          this.selected = null;
          this.ID = "";
          this.NIT = "";
          this.date = "";
          this.is = {
            id: false,
            nit: false,
          };

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

        // console.log(this.productsSelected);

        // NIT
      } else if (
        nameProducts.includes(this.selected) &&
        this.amount > 0 &&
        this.date &&
        this.NIT &&
        regExpNIT.test(this.NIT)
      ) {
        let isAvailable = this.inventory.filter((item) => {
          if (item.name === this.selected) {
            if (this.amount <= item.amount) {
              this.price = item.price;
              return item;
            }
          }
        });

        if (isAvailable.length > 0) {
          this.inventory.forEach((el) => {
            if (el.name === this.selected) {
              return (el.amount -= this.amount);
            }
          });
          // console.log(this.inventory, this.amount);
          localStorage.setItem("inventory", JSON.stringify(this.inventory));

          this.productsSelected.push({
            NIT: this.NIT,
            name: `${this.selected}`,
            amount: parseInt(`${this.amount}`),
            date: new Date(`${this.date}`).toLocaleDateString("es-CO"),
            price: parseInt(`${this.price}`),
            totalPrice: parseInt(`${this.price * this.amount}`),
          });

          localStorage.setItem(
            "productSell",
            JSON.stringify(this.productsSelected)
          );

          this.amount = 0;
          this.selected = null;
          this.ID = "";
          this.NIT = "";
          this.date = "";
          this.is = {
            id: false,
            nit: false,
          };
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
      } else {
        Swal.fire({
          title: "Error",
          text: "Verifique que el Numero de identificacion o NIT sea valido al formato Colombiano",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return false;
      }
    },
  },

  created() {
    let productSell = JSON.parse(localStorage.getItem("productSell"));
    let inventory = JSON.parse(localStorage.getItem("inventory"));

    if (productSell != null) {
      this.productsSelected = productSell;
    }
    if (inventory != null) {
      this.inventory = inventory;
    }
  },
});
