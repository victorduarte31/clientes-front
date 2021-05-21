import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../clientes/cliente";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  buscarTodosOsClientes() : Observable<Array<Cliente>> {
    return this.http.get<Array<Cliente>>(environment.urlApi + "clientes");
  }

  salvarCliente(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(environment.urlApi + "clientes", cliente);
  }

  buscarClientePorId(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>(environment.urlApi + "clientes" + `/${id}`);
  }

  atualizarCliente(id: number, cliente: Cliente) :Observable<any> {
    return this.http.put(environment.urlApi + "clientes" + `/${id}`, cliente);
  }

  deletarCliente(id: number) : Observable<any> {
    return this.http.delete(environment.urlApi + "clientes" + `/${id}`)
  }

}
