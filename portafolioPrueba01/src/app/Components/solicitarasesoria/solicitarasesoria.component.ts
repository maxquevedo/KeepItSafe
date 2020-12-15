import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import { ProfesionalService } from '../profesionales/profesional.service';
import { Profesional } from '../profesionales/profesional';
import { Router, ActivatedRoute } from '@angular/router';
import { Asesoria } from '../verasesorias/verasesorias';

@Component({
  selector: 'app-solicitarasesoria',
  templateUrl: './solicitarasesoria.component.html',
  styleUrls: ['./solicitarasesoria.component.css']
})
export class SolicitarasesoriaComponent implements OnInit {

  profesionales: Profesional;
  clientes: Cliente;
  asesoria: Asesoria;
  params = this.activedRoute.snapshot.params;
  usuario = sessionStorage.getItem('USR_NOMBRECOMPLETO');
  

  ase: Asesoria ={
    ASE_ID:"",
    ASE_CANTIDAD:"",
    ASE_DISP:"",
    ASE_TIPOP:"",
    ASE_ID_USUARIO: sessionStorage.getItem('USR_IDPERFIL'),
    ASE_ID_PRO: "",
    ASE_FECHA:""

  };

  constructor(private clienteService: ClienteService, private profesionalService: ProfesionalService, private activedRoute: ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    this.getProfcli();
    console.log(this.params);
    console.log(sessionStorage);
  }
  getProfcli(){
    this.profesionalService.getProfCli().subscribe( 
      res => this.getpro(res),
      err => console.error(err)
    );
  };
  getpro(res){
    this.profesionales = res;
    let id_pro= res.PRO_ID;
    console.log("desde getcliente",this.profesionales);
  };

  guardarAsesoria(){
    var formateado = JSON.stringify({
      "id":this.asesoria.ASE_ID,
      "cantidad":this.asesoria.ASE_CANTIDAD,
      "disp":this.asesoria.ASE_DISP,
      "tipo":this.asesoria.ASE_TIPOP,
      "id_usuario":this.asesoria.ASE_ID_USUARIO,
      "id_pro":this.asesoria.ASE_ID_PRO,
      "fechaasesoria":this.asesoria.ASE_FECHA,
  });
    console.log(formateado);
  }

}
