const { createApp } = Vue

createApp({
    data() {
      return {
        name:'',
        id:'',
        dateOfAdmission:'', //Fecha ingreso vehículo
        failure:'', //Falla del vehículo
        deadLine:'',
        inCharge:'', //Encargado de la reparación

        spareParts:'ok',
        resumes:[], //Esta es la base de datos con las hojas de vida

        //Variable habilitar NIT o Cédula
        is: {
          id: false,
          nit: false,
        }

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
        const fullFields=(this.name!="" && this.id !='' && this.dateOfAdmission!="" && this.failure!=""
          && this.deadLine!="" && this.inCharge!="")
        if(!fullFields){
          this.errorAlert("Recuerde digitar todos los campos del formulario")
          return false
        }
        //Validación en CC o NIT
        if(this.id.toString().length<8){
          this.errorAlert("La identificación o el NIT debe tener al menos 8 dígitos")
          return false
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
        this.dateOfAdmission=''
        this.failure=''
        this.deadLine=''
        this.inCharge=''
        this.spareParts='ok'
      },
      registerResume(){
        const correctData=this.validateData()
        if(!correctData){
          return //Si los datos no son correctos no haga nada.
        }
        const resume={
          name:this.name,
          id:this.id,
          dateOfAdmission:this.dateOfAdmission,
          failure:this.failure,
          deadLine:this.deadLine,
          inCharge:this.inCharge, 

        }
        this.resumes.push(resume)
        localStorage.setItem("resumes",JSON.stringify(this.resumes)) //Actualizo en el LocalStorage la data.
        this.successfulAlert()

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