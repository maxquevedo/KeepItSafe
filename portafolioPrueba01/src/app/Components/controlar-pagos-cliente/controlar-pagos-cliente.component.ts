import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  constructor(private service: ControlarPagosClienteService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.mes = new Date().getMonth();

    this.obtenerPagos();
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
      this.obtenerPagos();
    });
  }

  validarPago(factura) {
    let request = {
      factura: factura
    };
    this.service.validarPago(request).subscribe((response: any[]) => {
      this.obtenerPagos();
    });
  }

  bsModalRef: BsModalRef;
  verDetalle(factura) {
    const initialState = {
      factura: factura,
      title: 'Detalle factura',
      closeBtnName: 'Cerrar'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
  }

}


@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="list-group">
        <div class="list-group-item list-group-item-action flex-column align-items-start" *ngFor="let detalle of detalleFactura">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{detalle.DETALLE_VALOR}} UF</h5>
          </div>
          <ul>
            <li>
                {{detalle.DETALLE_DESCRIPCION}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})

export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  factura: any;
  detalleFactura: any[] = [];

  constructor(public bsModalRef: BsModalRef,
    private service: ControlarPagosClienteService
  ) { }

  ngOnInit() {
    this.obtenerDetalleFactura();
  }

  obtenerDetalleFactura = async () => {
    let request = {
      factura: this.factura
    };
    this.service.obtenerDetalleFactura(request).subscribe((detalle: any[]) => {
      this.detalleFactura = detalle;
    }, async (error) => {
      this.detalleFactura = [];
    });
  };
}
