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


const routes: Routes = [
{path: 'clientes', component: ClientesComponent },
{path: 'home', component: HomeComponent },
{path: 'administrador', component: AdministradorComponent},
{path: 'clientes/form', component: FormComponent },
{path: 'clientes/form/:id_cliente', component: FormComponent },
{path: 'profesionales', component: ProfesionalesComponent },
{path: 'profesionales/form-prof', component: FormProfComponent },
{path: 'profesionales/form-prof/:id_profesional', component: FormProfComponent },
{path: 'cli', component: CliComponent},
{path: 'prof', component: ProfComponent},
{path: 'crearcapacitacion', component: CrearcapacitacionComponent},
{path: 'planificarvisita', component: PlanificarvisitaComponent},
{path: 'revisarcliente', component: RevisarclienteComponent},
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: '**', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
