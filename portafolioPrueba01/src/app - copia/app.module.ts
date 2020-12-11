import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { ClienteService } from './Components/clientes/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { FormComponent } from './Components/clientes/form.component';
import { FormsModule } from '@angular/forms';
import { ProfesionalesComponent } from './Components/profesionales/profesionales.component';
import { ProfesionalService } from './Components/profesionales/profesional.service';
import { FormProfComponent } from './Components/profesionales/form-prof.component';
import { CliComponent } from './Components/cli/cli.component';
import { ProfComponent } from './Components/prof/prof.component';
import { CrearcapacitacionComponent } from './Components/crearcapacitacion/crearcapacitacion.component';
import { PlanificarvisitaComponent } from './Components/planificarvisita/planificarvisita.component';
import { RevisarclienteComponent } from './Components/revisarcliente/revisarcliente.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    HomeComponent,
    AdministradorComponent,
    FormComponent,
    ProfesionalesComponent,
    FormProfComponent,
    CliComponent,
    ProfComponent,
    CrearcapacitacionComponent,
    PlanificarvisitaComponent,
    RevisarclienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ClienteService, ProfesionalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
