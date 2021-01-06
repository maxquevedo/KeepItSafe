import { Component, OnInit } from '@angular/core';
import { Asesoria } from './verasesorias'
import { VerasesoriasService } from './verasesorias.service'
import { formatDate, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-verasesorias',
  templateUrl: './verasesorias.component.html',
  styleUrls: ['./verasesorias.component.css']
})
export class VerasesoriasComponent implements OnInit {

  solicitud : Asesoria;
  asesoria : Asesoria;

  solicitudes:Asesoria ={

    SOL_CLI_ID:'',
    SOL_PRO_ID:'',
    SOL_TIPO:'',
    SOL_FECHA:'',

  };

  constructor( private verasesoriaService: VerasesoriasService, private datepipe:DatePipe, ) { }

  
  ngOnInit(): void {
    this.verasesoriaService.getAsesorias().subscribe( 
      res => this.getAsesorias(res),
      err => console.error(err)
    );
    this.importAsesorias();
  }

  importAsesorias(){
    this.verasesoriaService.getAsesoria().subscribe(
      res => this.asesoria = res,
      err => console.error(err)
    );
  }

  aprobar(ase){
      this.solicitudes = ase;
      console.log("desde web: ",ase);
      console.log("objet: ",this.solicitudes);
      
          var formateado = JSON.stringify({

        "id": this.solicitudes.SOL_ID,
        "tipo": this.solicitudes.SOL_TIPO,
        "id_usuario": this.solicitudes.SOL_CLI_ID,
        "id_pro": this.solicitudes.SOL_PRO_ID,
        "observacion": this.solicitudes.SOL_DESCRIPCION,
        "fecha": this.datepipe.transform(this.solicitudes.SOL_FECHA , 'dd/MM/yyyy')
        
      });
    console.log("formato: ",formateado);

    
     this.verasesoriaService.create(formateado).subscribe(
      res=> console.log("nueva solicitud",res),
      err=> console.error(err)
    )
    this.ngOnInit();
  }

  rechazar(solid,ase){
    this.solicitudes = ase;
      console.log("desde web: ",ase);
      console.log("objet: ",this.solicitudes);
      
          var formateado = JSON.stringify({

        "id": this.solicitudes.SOL_ID,
        "estado" : this.solicitudes.SOL_ESTADO
        
      });
    console.log("formato: ",formateado);

    
     this.verasesoriaService.update(solid,formateado).subscribe(
      res=> console.log("edita solicitud",res),
      err=> console.error(err)
    )
    this.ngOnInit();

  }
 

  getAsesorias(res){
    this.solicitud = res;
    //let fecha = new Date (res.ASE_FECHA.toLocaleDateString());
    //this.asesoria.ASE_FECHA = fecha;
    console.log("desde getAsesoria",res);
  }

}
