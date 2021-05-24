import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientesFormComponent} from "./clientes-form/clientes-form.component";
import {ClientesListComponent} from "./clientes-list/clientes-list.component";
import {LayoutComponent} from "../layout/layout.component";
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {
    path: 'clientes', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: '/clientes/lista', pathMatch: 'full'},
      {path: 'form', component: ClientesFormComponent},
      {path: 'form/:id', component: ClientesFormComponent},
      {path: 'lista', component: ClientesListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
