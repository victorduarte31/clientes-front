import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../clientes/cliente";
import {ClienteService} from "../../service/cliente.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicoPrestadoService} from "../../service/servico-prestado.service";
import {ServicoPrestado} from "../servicoPrestado";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styles: [
  ]
})
export class ServicoPrestadoFormComponent implements OnInit {

  servicoPrestadoForm: FormGroup;
  clientes: Array<Cliente> = [];

  constructor(private clienteService: ClienteService,
              private servicoPrestadoService: ServicoPrestadoService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.clienteService.buscarTodosOsClientes().subscribe(response => {
      this.clientes = response;
    }, error =>  this.toastr.error(error.error.errorsApi));
  }


  private criarFormulario() {
    this.servicoPrestadoForm = this.fb.group({
      idCliente: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      data: ['', [Validators.required]],
      preco: ['', [Validators.required]]
    })
  }

  cadastrarNovoServico() {
    this.servicoPrestadoService.salvar(this.servicoPrestadoForm.getRawValue() as ServicoPrestado).subscribe(() => {
      this.toastr.success("Serviço prestado cadastrado com sucesso!");
    }, error => {
      this.toastr.error(error.error.errorsApi)
      this.servicoPrestadoForm.reset();
    });
  }

  redirectBack() {
    this.location.back();
  }
}
