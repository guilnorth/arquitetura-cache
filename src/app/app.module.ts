import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes.service';

import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './views/errors/error.module';

/** Services **/
import { CacheMapDiretoService } from  './services/cache-map-direto.service'

// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { CpuService } from './services/cpu.service';
import { ProcessorService } from './services/processor.service';
import { CacheMapAssociativoService } from './services/cache-map-associativo.service';
import { CacheMapAssociativoConjuntoService } from './services/cache-map-associativo-conjunto.service';
import { LogProcessamentoService } from './services/log-processamento.service';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    AppRoutes,
    RouterModule,
    FormsModule,
    SharedModule,
    ViewsModule,
    ErrorModule,
    HttpClientModule,

  ],
  providers: [CacheMapDiretoService, CpuService, ProcessorService, CacheMapAssociativoService, CacheMapAssociativoConjuntoService, LogProcessamentoService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
