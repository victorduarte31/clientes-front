import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientesRoutingModule} from './clientes-routing.module';
import {ClientesFormComponent} from './clientes-form/clientes-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ClientesListComponent} from './clientes-list/clientes-list.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";


@NgModule({
  declarations: [
    ClientesFormComponent,
    ClientesListComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    ConfirmPopupModule
  ],
  exports: [
    ClientesFormComponent,
    ClientesListComponent
  ]
})
export class ClientesModule {
}
