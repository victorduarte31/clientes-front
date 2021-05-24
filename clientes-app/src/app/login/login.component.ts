import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Usuario} from './usuario';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  erro: boolean;
  novoUsuario: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.criarFormularioLogin();
  }

  criarFormularioLogin() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  preparaCadastro($event: MouseEvent) {
    $event.preventDefault();
    this.loginForm.reset();
    this.novoUsuario = true;
  }

  logar() {
    this.authService.logar(this.loginForm.getRawValue() as Usuario).subscribe(response => {
      localStorage.setItem("token", response.token);
      this.router.navigate(['home']);
    }, error => {
      this.toastr.error("Usuario/Senha inválidos!");
    });
  }

  registrar() {
    this.authService.cadastrarUsuario(this.loginForm.getRawValue() as Usuario).subscribe(response => {
      this.toastr.success('Usuario cadastrado com sucesso!');
      this.novoUsuario = false;
    }, error => this.toastr.error(error.error.errorsApi));
  }

}
