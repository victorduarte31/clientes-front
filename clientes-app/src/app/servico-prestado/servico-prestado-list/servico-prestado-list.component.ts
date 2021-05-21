import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicoPrestadoService} from "../../service/servico-prestado.service";
import {ServicoPrestadoBusca} from "./servicoPrestadoBusca";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-servico-prestado-list',
  templateUrl: './servico-prestado-list.component.html',
  styles: []
})
export class ServicoPrestadoListComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];

  listaServicoPrestado: Array<ServicoPrestadoBusca> = [];
  servicoPrestadoPesquisaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private servicoPrestadoService: ServicoPrestadoService,
              private toastr: ToastrService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {
    this.criaFormulario();
  }

  criaFormulario() {
    this.servicoPrestadoPesquisaForm = this.fb.group({
      nome: ['', [Validators.required]],
      mes: ['', [Validators.required]]
    })
  }


  realizarBusca() {
    this.servicoPrestadoService.pesquisar(this.servicoPrestadoPesquisaForm.get('nome').value, this.servicoPrestadoPesquisaForm.get('mes').value).subscribe(response => {
      this.listaServicoPrestado = response;

      if (this.listaServicoPrestado.length == 0) {
        this.toastr.error("Não foram encontrados registros.")
      }

    }, error =>this.toastr.error(error.error.errorsApi))
  }


}
