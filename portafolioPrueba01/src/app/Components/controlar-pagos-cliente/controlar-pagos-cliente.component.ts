import { Component, OnInit } from '@angular/core';
import { ControlarPagosClienteService } from './controlar-pagos-cliente.service';

@Component({
  selector: 'app-controlar-pagos-cliente',
  templateUrl: './controlar-pagos-cliente.component.html',
  styleUrls: ['./controlar-pagos-cliente.component.css']
})
export class ControlarPagosClienteComponent implements OnInit {
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  mes: number;
  facturas: any[] = [];
  constructor(private service: ControlarPagosClienteService) { }

  ngOnInit(): void {
    this.mes = new Date().getMonth();
  }

  obtenerNombreMes() {
    return this.monthNames[this.mes];
  }

  obtenerPagos() {
    let request = {
      mes: this.mes
    };

    this.service.obtenerPagos(request).subscribe((response: any[]) => {
      this.facturas = response;
    });
  }

  mostrarGenerarFacturas() {
    return this.mes == new Date().getMonth();
  }

  generarFacturas() {
    let request = {
      mes: this.mes
    };

    this.service.generarFacturas(request).subscribe((response: any[]) => {
      this.facturas = response;
    });
  }

  validarPago(factura) {
    let request = {
      factura: factura
    };
    this.service.validarPago(request).subscribe((response: any[]) => {
      this.facturas = response;
    });
  }

}
