import {RouterModule, Route} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {NotFoundComponent} from './views/errors/not-found/not-found.component';
import {Dashboard1Component} from './views/dashboards/dashboard1/dashboard1.component';
import {MapDiretoComponent} from "./views/map-direto/map-direto.component";
import {ConfiguraProcessoComponent} from "./views/configura-processo/configura-processo.component";
import {MapAssociativoComponent} from "./views/map-associativo/map-associativo.component";
import {MapAssociativoConjuntoComponent} from "./views/map-associativo-conjunto/map-associativo-conjunto.component";
import {SobreComponent} from "./views/sobre/sobre.component";
import {ArtigoComponent} from "./views/artigo/artigo.component";


const routes: Route[] = [
    {path: '', pathMatch: 'full', redirectTo: 'config'},
    {
        path: 'map', children: [
        {path: 'direto/:grupo', component: MapDiretoComponent},
        {path: 'associativo/:grupo/:politica', component: MapAssociativoComponent},
        {path: 'associativo-conjunto/:grupo/:politica/:vias', component: MapAssociativoConjuntoComponent},
    ]
    },
    {path: 'config', component: ConfiguraProcessoComponent},
    {path: 'sobre', component: SobreComponent},
    {path: 'artigo', component: ArtigoComponent},
    {
        path: 'dashboards', children: [
        {path: 'v1', component: Dashboard1Component},
    ]
    },

    {path: '**', component: NotFoundComponent},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
