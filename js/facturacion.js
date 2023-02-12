const { createApp } = Vue

  createApp({
    data() {
      return {
        is: {
            id: false,
            nit: false,
          },
        id:'',
        //Arreglos de todas las ventas y de todas las hojas de vida generadas
        productSalesTotal:[],
        productSellTotal:[],
        resumesTotal:[],
        //Arreglos con todas las ventas y las hojas de vida del id digitado.
        productSales:[],
        productSell:[],
        resumes:[]
      }
    },
   
    methods:{
        showID() {
            this.is = {
              id: true,
              nit: false,
            }
          },
      
          showNIT() {
            this.is = {
              id: false,
              nit: true,
            }},
          validateId(){
            //TODO: Validaciones del ID desde el JS.
          },
          findAccounts(){
            this.productSales=this.productSalesTotal.filter(el=>el.id===this.id)
            this.productSell=this.productSellTotal.filter(el=>el.id===this.id)
            this.resumes=this.resumesTotal.filter(el=>el.id===this.id)
            if(this.productSales.length!=0 || this.productSell.length!=0 ||this.resumes.length!=0 ){
                //Si ingresa aquí es porque hay algo por facturar.
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El número digitado no tiene cuentas pendientes',
                  })
            }      
         },
          

    },
    mounted(){
        this.productSalesTotal=JSON.parse(localStorage.getItem("productSales"))
        this.productSellTotal=JSON.parse(localStorage.getItem("productSell"))
        this.resumesTotal=JSON.parse(localStorage.getItem("resumes"))
    }
  }).mount('#facturacion')