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
import { CrearcasodeasesoriaComponent } from './Components/crearcasodeasesoria/crearcasodeasesoria.component';
import { IngresaractividaddemejoraComponent } from './Components/ingresaractividaddemejora/ingresaractividaddemejora.component';
import { RevisaractividadmejoraComponent } from './Components/revisaractividadmejora/revisaractividadmejora.component';
import { SolicitarasesoriaComponent } from './Components/solicitarasesoria/solicitarasesoria.component';
import { ReportaraccidenteComponent } from './Components/reportaraccidente/reportaraccidente.component';
import { CrearcheklistComponent } from './Components/crearcheklist/crearcheklist.component';
import { ResponderchecklistComponent } from './Components/responderchecklist/responderchecklist.component';
import { LoginService } from './services/login.service';
import { PlanificarvisitaService } from './Components/planificarvisita/planificarvisita.service'
import { from } from 'rxjs';
import { ReporteclienteComponent } from './Components/reportecliente/reportecliente.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfesionalesComponent,
    FooterComponent,
    ClientesComponent,
    HomeComponent,
    AdministradorComponent,
    FormComponent,
    FormProfComponent,
    CliComponent,
    ProfComponent,
    CrearcapacitacionComponent,
    PlanificarvisitaComponent,
    RevisarclienteComponent,
    CrearcasodeasesoriaComponent,
    IngresaractividaddemejoraComponent,
    RevisaractividadmejoraComponent,
    SolicitarasesoriaComponent,
    ReportaraccidenteComponent,
    CrearcheklistComponent,
    ResponderchecklistComponent,
    ReporteclienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ClienteService, LoginService , ProfesionalService, PlanificarvisitaService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
