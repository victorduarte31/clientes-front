import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServicoPrestado} from "../servico-prestado/servicoPrestado";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ServicoPrestadoBusca} from "../servico-prestado/servico-prestado-list/servicoPrestadoBusca";

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: ServicoPrestado) : Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(environment.urlApi + "servicos-prestados", servicoPrestado);
  }

  pesquisar(nome: string, mes: string) : Observable<Array<ServicoPrestadoBusca>> {
    const param = new HttpParams().set("nome", nome).set("mes", mes);

    const url = environment.urlApi + "servicos-prestados?" + param.toString();
    return this.http.get<Array<ServicoPrestadoBusca>>(url);

  }

}
