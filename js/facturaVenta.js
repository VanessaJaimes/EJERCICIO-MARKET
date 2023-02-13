var app = new Vue({
    el: "#app",
    data: {
      sale: JSON.parse(
        localStorage.getItem(
          "productSales",
          JSON.stringify(this.productsSelected)
        )
      ),
    },
    methods: {
    },
  });