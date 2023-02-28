const { createApp } = Vue

createApp({
    data() {
      return {
        name:'', 
        id:'', 
        nit:'', 
        dateOfAdmission:'', //Fecha ingreso vehículo
        failure:'', //Falla del vehículo
        deadLine:'',
        inCharge:'', //Encargado de la reparación

        spareParts:'ok', //Variable que habilita la redirrecicón.
        resumes:[], //Esta es la base de datos con las hojas de vida

        //Variable habilitar NIT o Cédula
        is: {  
          id: false,
          nit: false,
        },
        workDone:'',

      }
    },
    methods:{
      //Métodos para habilitar el input de ID o cédula.
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
      errorAlert(msg){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      },
      successfulAlert(){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ingreso Exitoso',
          showConfirmButton: false,
          timer: 2000
        })
      },
      validateData(){
        //Validación todos los campos llenos
        const fullFields=(this.name!="" && (this.id !='' || this.nit!='' )&& this.dateOfAdmission!="" && this.failure!=""
          && this.deadLine!="" && this.inCharge!="" && this.spareParts!="")
        if(!fullFields){
          this.errorAlert("Recuerde digitar todos los campos del formulario")
          return false
        }



        //Validación en CC o NIT
        if(this.id!=''){
          const expRegID = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/g
          if(!expRegID.test(this.id.toString())){
            this.errorAlert("Ingrese una cédula válida")
            return false
          }}
        else if(this.nit!=''){
          const expRegNIT = /(^[0-9]+-{1}[0-9]{1})/g
          if(!expRegNIT.test(this.nit.toString())){
            this.errorAlert("Ingrese un NIT con formato válido")
            return false
          }
        }
   
       


        //Validación Para que la fecha de entrega no sea una fecha antes de la fecha de ingreso.
        const dateOfAdmissionSeconds=new Date(this.dateOfAdmission).getTime()
        const deadLineSeconds=new Date(this.deadLine).getTime()
        if(deadLineSeconds-dateOfAdmissionSeconds<0){
          this.errorAlert("La fecha de entrega no puede ser antes de la fecha de ingreso del vehículo")
          return false
        }
        return true //Si no entra a ningún if, quiere decir que los datos son correctos.
      },
      resetForm(){
        this.name=''
        this.id=''
        this.nit=''
        this.dateOfAdmission=''
        this.failure=''
        this.deadLine=''
        this.inCharge=''
        this.workDone=''
       
      },
      registerResume(){
        const correctData=this.validateData()
        if(!correctData){
          return //Si los datos no son correctos no haga nada.
        }
        let propiedad=(this.id)?"id":"NIT"
        const resume={
          name:this.name, //TODO: Hay que enviar un id o un nit según se hayan ingresado los datos.
          dateOfAdmission:this.dateOfAdmission,
          failure:this.failure,
          deadLine:this.deadLine,
          inCharge:this.inCharge, 
        }
        if(this.workDone!==''){
          resume['workDone']=this.workDone
        }
        resume[propiedad]=this.id||this.nit
        this.successfulAlert()
        this.resumes.push(resume)
        localStorage.setItem("resumes",JSON.stringify(this.resumes)) //Actualizo en el LocalStorage la data.
        localStorage.setItem("is",JSON.stringify(this.is))
        localStorage.setItem("id",this.id)
        localStorage.setItem("NIT",this.nit)
        localStorage.setItem("name",this.name)
        localStorage.setItem("deadLine",this.deadLine)
        this.resetForm()
        if(this.spareParts==="ok"){
          location.href="respuestos.html"
        }
        
       
        console.log(this.resumes) //Saco por consola la base de datos con los registros

      }
    },
    mounted(){
      this.resumes=JSON.parse(localStorage.getItem("resumes"))
      if(this.resumes===null){
        this.resumes=[]
      }
    }

  }).mount('#app')