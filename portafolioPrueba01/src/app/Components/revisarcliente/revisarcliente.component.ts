import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-revisarcliente',
  templateUrl: './revisarcliente.component.html',
  styleUrls: ['./revisarcliente.component.css']
})
export class RevisarclienteComponent implements OnInit {

  cliente : Cliente;

  constructor( private clienteService: ClienteService , private router: Router) { }

  ngOnInit(): void {
    var profesionalId;
    if (sessionStorage.getItem('USR_IDPERFIL')) {
    profesionalId = sessionStorage.getItem('USR_IDPERFIL');
      
    }

    this.clienteService.getClientes(profesionalId).subscribe( 
      res => this.getClientes(res),
      err => console.error(err)
    );
    
  }
  getClientes(res){
  
    this.cliente = res;
    console.log(res);
  }

}
