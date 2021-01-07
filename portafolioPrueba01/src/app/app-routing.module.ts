import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { HomeComponent } from './Components/home/home.component';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { FormComponent } from './Components/clientes/form.component';
import { ProfesionalesComponent } from './Components/profesionales/profesionales.component';
import { FormProfComponent } from './Components/profesionales/form-prof.component';
import { CliComponent } from './Components/cli/cli.component';
import { ProfComponent } from './Components/prof/prof.component';
import { CrearcapacitacionComponent } from './Components/crearcapacitacion/crearcapacitacion.component';
import { PlanificarvisitaComponent } from './Components/planificarvisita/planificarvisita.component';
import { RevisarclienteComponent } from './Components/revisarcliente/revisarcliente.component';
import { CrearcasodeasesoriaComponent } from './Components/crearcasodeasesoria/crearcasodeasesoria.component';
import { IngresaractividaddemejoraComponent } from './Components/ingresaractividaddemejora/ingresaractividaddemejora.component';
import { RevisaractividadmejoraComponent } from './Components/revisaractividadmejora/revisaractividadmejora.component';
import { SolicitarasesoriaComponent } from './Components/solicitarasesoria/solicitarasesoria.component';
import { ReportaraccidenteComponent } from './Components/reportaraccidente/reportaraccidente.component';
import { CrearcheklistComponent } from './Components/crearcheklist/crearcheklist.component';
import { ResponderchecklistComponent } from './Components/responderchecklist/responderchecklist.component';
import { ReporteclienteComponent } from './Components/reportecliente/reportecliente.component';
import { ReporteglobalComponent } from './Components/reporteglobal/reporteglobal.component';
import { AsignarComponent} from './Components/asignar/asignar.component';
import { VerasesoriasComponent} from './Components/verasesorias/verasesorias.component';
import { VercapacitacionesComponent} from './Components/vercapacitaciones/vercapacitaciones.component';
import { ListarasesoriasComponent } from './Components/verasesorias/listarasesorias/listarasesorias.component';
import { ListarcapacitacionesComponent} from './Components/vercapacitaciones/listarcapacitaciones/listarcapacitaciones.component';
import { ControlarPagosClienteComponent } from './Components/controlar-pagos-cliente/controlar-pagos-cliente.component';
import { CalcularAccidentabilidadComponent } from './Components/calcular-accidentabilidad/calcular-accidentabilidad.component';
import { VisualizarActividadesComponent } from './Components/visualizar-actividades/visualizar-actividades.component';
import { RespondermejoraComponent} from './Components/respondermejora/respondermejora.component';
import { SolicitarcapacitacionComponent } from './Components/solicitarcapacitacion/solicitarcapacitacion.component';
import { from } from 'rxjs';

const routes: Routes = [
{path: 'vercapacitaciones', component: VercapacitacionesComponent},
{path: 'solicitarcapacitacion', component: SolicitarcapacitacionComponent },
{path: 'listarcapacitaciones', component: ListarcapacitacionesComponent},  
{path: 'listarasesorias', component: ListarasesoriasComponent},  
{path: 'respondermejora', component: RespondermejoraComponent},
{path: 'verasesorias', component: VerasesoriasComponent},
{path: 'reporteGlobal', component: ReporteglobalComponent },
{path: 'clientes', component: ClientesComponent },
{path: 'reporteClientes', component: ReporteclienteComponent  },
{path: 'home', component: HomeComponent },
{path: 'Admin', component: AdministradorComponent},
{path: 'clientes/form', component: FormComponent },
{path: 'clientes/form/:id_cliente', component: FormComponent },
{path: 'profesionales', component: ProfesionalesComponent },
{path: 'profesionales/form-prof', component: FormProfComponent },
{path: 'profesionales/form-prof/:Profesional', component: FormProfComponent },
{path: 'Cliente', component: CliComponent},
{path: 'Profesional', component: ProfComponent},
{path: 'crearcapacitacion', component: CrearcapacitacionComponent},
{path: 'planificarvisita', component: PlanificarvisitaComponent},
{path: 'revisarcliente', component: RevisarclienteComponent},
{path: 'crearasesoria', component: CrearcasodeasesoriaComponent},
{path: 'ingresarmejora', component: IngresaractividaddemejoraComponent},
{path: 'revisarmejora', component: RevisaractividadmejoraComponent},
{path: 'solicitarasesoria', component: SolicitarasesoriaComponent},
{path: 'reportaraccidente', component: ReportaraccidenteComponent},
{path: 'crearchecklist', component: CrearcheklistComponent},
{path: 'responderchecklist', component: ResponderchecklistComponent},
{path: 'controlar-pagos', component: ControlarPagosClienteComponent},
{path: 'calcular-accidentabilidad', component: CalcularAccidentabilidadComponent},
{path: 'asignar', component: AsignarComponent},
{path: 'visualizar-actividades', component: VisualizarActividadesComponent},
{path: 'asignar/:id', component: AsignarComponent},
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: '**', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
