const { createApp } = Vue

  createApp({
    data() {
      return {
        is: {
            id: false,
            nit: false,
          },
        id:'',
        nit:'',
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
          validateNIT(){
            //TODO: Validaciones del NIT desde el JS.
          },
          generateInformation(productSales,productSell,resumes,code){
            //LLeno los repuestos que se han gastado en el usuario.
            const vehicleParts=[]
            productSell?.forEach(product => {
                vehicleParts.push(
                        {
                         name:product.name,
                         amount:product.amount,
                         price:product.price,
                         totalPrice:product.totalPrice
                        }
                    )
            });
            productSales?.forEach(product => {
                vehicleParts.push(
                        {
                         name:product.name,
                         amount:product.amount,
                         price:product.price,
                         totalPrice:product.totalPrice
                        }
                    )
            });
            const data={
                name:resumes[0]?.name || productSales[0]?.fullName,
                dateOfAdmission:resumes[0]?.dateOfAdmission,
                deadLine:resumes[0]?.deadLine,
                failure:resumes[0]?.failure,
                inCharge:resumes[0]?.inCharge,
                vehicleParts
            }
            data[code]=resumes[0]?.id||resumes[0]?.NIT||productSales[0]?.id||productSales[0]?.NIT

            console.log(data)

          },
          findAccountsId(){
            console.log("Entro a los ID")
            this.productSales=this.productSalesTotal?.filter(el=>el.id===this.id)
            this.productSell=this.productSellTotal?.filter(el=>el.id===this.id)
            this.resumes=this.resumesTotal?.filter(el=>el.id===this.id)
            if(this.productSales?.length!=0 || this.productSell?.length!=0 ||this.resumes?.length!=0 ){
                this.generateInformation(this.productSales,this.productSell,this.resumes,"id")
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El número digitado no tiene cuentas pendientes',
                  })
            }      
         },
         findAccountsNIT(){
            console.log("Entró a lo de los NIT")
            this.productSales=this.productSalesTotal?.filter(el=>el.NIT===this.nit)
            this.productSell=this.productSellTotal?.filter(el=>el.NIT===this.nit)
            this.resumes=this.resumesTotal?.filter(el=>el.NIT===this.nit)
            if(this.productSales?.length!=0 || this.productSell?.length!=0 ||this.resumes?.length!=0 ){
                this.generateInformation(this.productSales,this.productSell,this.resumes,"NIT")
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El número digitado no tiene cuentas pendientes',
                  })
            }      
         },
         billing(){
            (this.id!='')?this.findAccountsId():this.findAccountsNIT()
         }
          

    },
    mounted(){
        this.productSalesTotal=JSON.parse(localStorage.getItem("productSales"))
        this.productSellTotal=JSON.parse(localStorage.getItem("productSell"))
        this.resumesTotal=JSON.parse(localStorage.getItem("resumes"))
    }
  }).mount('#facturacion')