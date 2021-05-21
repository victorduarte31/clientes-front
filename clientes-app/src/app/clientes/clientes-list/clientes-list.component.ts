import { Component, OnInit } from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../../service/cliente.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
  providers: [ConfirmationService]
})
export class ClientesListComponent implements OnInit {

  clientes: Array<Cliente> = [];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.buscarTodosOsClientes();
  }

  buscarTodosOsClientes() {
    this.clienteService.buscarTodosOsClientes().subscribe(response => {
      this.clientes = response;
    }, () => {
      this.toastr.error('Falha na requisição!');
    });
  }

  EditarCliente(id: number) {
    this.router.navigate(['clientes-form', id]);
  }

  confirmarDelecao(event: Event, cliente: Cliente) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Deseja deletar o cliente ${cliente.nome}?`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-danger',
      icon: 'fas fa-bomb',
      accept: () => {
        this.clienteService.deletarCliente(cliente.id).subscribe(() => {
          this.toastr.success("Cliente deletado com sucesso!")
          this.buscarTodosOsClientes();
        }, error => {
          this.toastr.error(error.error.errorsApi);
        })
      },
    })
  }
}
