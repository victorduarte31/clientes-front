import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  erro: boolean;
  novoUsuario: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormularioLogin();
  }

  criarFormularioLogin() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  CadastrarNovoUsuario($event: MouseEvent) {
    $event.preventDefault();
    this.novoUsuario = true;
  }
}
