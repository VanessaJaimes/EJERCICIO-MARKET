var app = new Vue({
  el: "#app",
  data: {
    selected: null,
    amount: 0,
    productsSelected: [],
    date: "",
    ID: "",

    inventory: [
      { name: "aceite", amount: 10, price: 30000 },
      { name: "empaque", amount: 100, price: 2500 },
      { name: "llanta", amount: 20, price: 100000 },
      { name: "bateria", amount: 100, price: 50000 },
      { name: "discos frenos", amount: 40, price: 30000 },
    ],
  },

  methods: {
    addReplacement() {
      if (
        this.ID === "" ||
        this.ID === undefined ||
        this.ID === null ||
        !this.ID ||
        this.selected === null ||
        this.selected === undefined ||
        this.amount <= 0 ||
        this.date === ""
      ) {
        alert("Por favor todos los campos son obligatorios");
      }

      if (
        (this.selected === "aceite" ||
          this.selected === "empaque" ||
          this.selected === "llanta" ||
          this.selected === "bateria" ||
          this.selected === "discos frenos") &&
        this.amount > 0 &&
        this.date
      ) {
        this.productsSelected.push({
          name: `${this.selected}`,
          amount: `${this.amount}`,
          date: new Date(`${this.date}`).toLocaleDateString("es-CO"),
        });

        console.log(this.productsSelected);
      }

      // if (this.selected === "empaque" && this.amount > 0) {
      //   this.productsSelected.push({
      //     name: `${this.selected}`,
      //     amount: `${this.amount}`,
      //   });

      //   console.log(this.productsSelected);
      // }

      // if (this.selected === "llanta" && this.amount > 0) {
      //   this.productsSelected.push({
      //     name: `${this.selected}`,
      //     amount: `${this.amount}`,
      //   });

      //   console.log(this.productsSelected);
      // }

      // if (this.selected === "bateria" && this.amount > 0) {
      //   this.productsSelected.push({
      //     name: `${this.selected}`,
      //     amount: `${this.amount}`,
      //   });

      //   console.log(this.productsSelected);
      // }
      // if (this.selected === "discos frenos" && this.amount > 0) {
      //   this.productsSelected.push({
      //     name: `${this.selected}`,
      //     amount: `${this.amount}`,
      //   });

      //   console.log(this.productsSelected);
      // }
    },
  },
});
