import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicoPrestadoFormComponent} from "./servico-prestado-form/servico-prestado-form.component";
import {ServicoPrestadoListComponent} from "./servico-prestado-list/servico-prestado-list.component";
import {LayoutComponent} from "../layout/layout.component";

const routes: Routes = [
  {
    path: 'servico-prestado', component: LayoutComponent, children: [
      {path: '', redirectTo: '/servico-prestado/lista', pathMatch: 'full'},
      {path: 'form', component: ServicoPrestadoFormComponent},
      {path: 'lista', component: ServicoPrestadoListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule {
}