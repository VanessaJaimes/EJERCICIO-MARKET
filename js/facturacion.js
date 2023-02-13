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
          validateId(id){
            const expRegID = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/g
            return expRegID.test(id)
          },
          validateNIT(nit){
            const expRegNIT = /(^[0-9]+-{1}[0-9]{1})/g
            return expRegNIT.test(nit)
          },
          generateInformation(productSales,productSell,resumes,code){
            //LLeno los repuestos que se han gastado en el usuario.
            // console.log('repuestos directos:',productSales)
            // console.log('repuestos de reparaciones',productSell)
            const vehicleParts=[]
            let data=[] //Esta es la info que va para la factura
            if(productSales){
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
            }
            if(productSell){
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
            }
            
            if(resumes){
                 data={
                    name:resumes[0].name ,
                    dateOfAdmission:resumes[0].dateOfAdmission,
                    deadLine:resumes[0].deadLine,
                    failure:resumes[0].failure,
                    inCharge:resumes[0].inCharge,
                    vehicleParts
                }
                data[code]=resumes[0].id||resumes[0].NIT
                
            }else if(!resumes && productSales){
                 data={
                    name: productSales[0].fullName,
                    date:productSales[0].date,
                    vehicleParts
                }
                data[code]=productSales[0].id||productSales[0].NIT
                
            }
            localStorage.setItem("data",JSON.stringify(data))
            this.id=''
            this.nit=''
            location.href="./factura.html"
            
            
            

          },
          findAccountsId(){
            if(!this.validateId(this.id)) return
            // console.log("Entro a los ID")
            this.productSales=this.productSalesTotal?.filter(el=>el.id===Number(this.id))
            this.productSell=this.productSellTotal?.filter(el=>el.id===Number(this.id))
            this.resumes=this.resumesTotal?.filter(el=>el.id===this.id)
            if(this.productSales?.length!=0 || this.productSell?.length!=0 ||this.resumes?.length!=0 ){
                //Si entra aquí es porque hay algo por facturar
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
            if(!this.validateNIT(this.nit)) return
            // console.log("Entró a lo de los NIT")
            this.productSales=this.productSalesTotal?.filter(el=>el.NIT===this.nit)
            this.productSell=this.productSellTotal?.filter(el=>el.NIT===this.nit)
            this.resumes=this.resumesTotal?.filter(el=>el.NIT===this.nit)
            if(this.productSales?.length!=0 || this.productSell?.length!=0 ||this.resumes?.length!=0 ){
                //Si entra aquí es porque hay algo por facturar
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
            if(this.productSalesTotal===null && this.productSellTotal===null && this.resumesTotal===null){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Nuestros registros están vacíos, sin ellos no podremos generar facturas',
                  })
                  return
            }
            (this.id!='')?this.findAccountsId():this.findAccountsNIT()
         }
          

    },
    mounted(){
        this.productSalesTotal=JSON.parse(localStorage.getItem("productSales"))
        this.productSellTotal=JSON.parse(localStorage.getItem("productSell"))
        this.resumesTotal=JSON.parse(localStorage.getItem("resumes"))
    }
  }).mount('#facturacion')