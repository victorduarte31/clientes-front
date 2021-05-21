import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServicoPrestadoRoutingModule} from './servico-prestado-routing.module';
import {ServicoPrestadoFormComponent} from './servico-prestado-form/servico-prestado-form.component';
import {ServicoPrestadoListComponent} from './servico-prestado-list/servico-prestado-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxMaskModule} from "ngx-mask";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ServicoPrestadoRoutingModule,
    NgxMaskModule,
    TableModule,
  ],
  exports: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListComponent
  ]
})
export class ServicoPrestadoModule {
}
