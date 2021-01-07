import { Component, OnInit } from '@angular/core';
import { VisualizarActividadesService } from './visualizar-actividades.service';

@Component({
  selector: 'app-visualizar-actividades',
  templateUrl: './visualizar-actividades.component.html',
  styleUrls: ['./visualizar-actividades.component.css']
})
export class VisualizarActividadesComponent implements OnInit {
  actividades: any[] = [];
  clientes: any[] = [];
  filtros: any = {
    idCliente: null,
    mes: null,
    anio: null
  };

  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  anios = [];

  constructor(private service: VisualizarActividadesService) { }
  ngOnInit(): void {
    let date = new Date();
    this.filtros.mes = date.getMonth();
    this.filtros.anio = date.getFullYear();
    this.iniciarAnios();

    this.obtenerClientes();
  }

  obtenerActividades() {
    this.service.obtenerActividades(this.filtros).subscribe((actividades: any[]) => {
      this.actividades = actividades;
    });
  }

  obtenerClientes() {
    this.service.getClientes().subscribe((clientes: any[]) => {
      this.clientes = clientes
    });
  }

  obtenerNombreMes() {
    return this.monthNames[this.filtros.mes];
  }

  iniciarAnios() {
    let year = new Date().getFullYear();
    for (let index = new Date().getFullYear(); index > (year - 2); index--) {
      this.anios.push(index);
    }
  }

  obtenerActividad(actividad) {
    let result = '';
    switch (actividad.ACTIVIDAD) {
      case 1:
        result = 'Capacitación';
        break;
      case 2:
        result = 'Visita';
        break;
      case 3:
        result = 'Asesoría';
        break;
    }

    return result;
  }

}
