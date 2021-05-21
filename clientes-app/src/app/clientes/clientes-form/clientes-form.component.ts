import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Cliente} from "../cliente";
import {ToastrService} from "ngx-toastr";
import {ClienteService} from "../../service/cliente.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  clientesForm: FormGroup;
  id: number;

  constructor(private clienteService: ClienteService,
              private activateRoute: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.criarFormulario()
    this.id = this.activateRoute.params["value"]["id"];
    if (this.id) {
      this.clienteService.buscarClientePorId(this.id).subscribe(response => {
        this.clientesForm.setValue(response);
      }, error => {
        this.toastr.error(error.error.errorsApi);
      })
    }
  }

  criarFormulario() {
    this.clientesForm = this.fb.group({
      id: new FormControl({value: '', disabled: true}),
      dataCadastro: new FormControl({value: '', disabled: true}),
      nome: ['', [Validators.required]],
      cpf: ['', Validators.required]
    })
  }

  cadastrarCliente() {
    this.clienteService.salvarCliente(this.clientesForm.getRawValue() as Cliente).subscribe(response => {
      this.toastr.success('Cliente cadastrado com sucesso!');
      this.clientesForm.reset();
    }, error => {
      this.toastr.error(error.error.errorsApi);
      this.clientesForm.reset();
    })
  }

  atualizarCliente() {
    this.clienteService.atualizarCliente(this.id, this.clientesForm.getRawValue() as Cliente).subscribe(response => {
      this.toastr.success('Cliente atualizado com sucesso!');
    }, error => {
      this.toastr.error(error.error.errorsApi);
    })
  }

  redirectBack() {
    this.location.back();
  }
}
