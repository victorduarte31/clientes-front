import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../login/usuario';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TokenUser} from '../login/tokenUser';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const tokenExpired = this.jwtHelper.isTokenExpired(token);
      return !tokenExpired;
    }
    return false;
  }

  obterToken(): string {
    const tokenUser = localStorage.getItem('token');

    if (tokenUser) {
      return tokenUser;
    } else {
      return null;
    }
  }

  getUsuarioLogado() {
    const tokenUser = this.obterToken();
    if (tokenUser) {
      return this.jwtHelper.decodeToken(tokenUser).sub;
    }
    return null;
  }

  cadastrarUsuario(loginForm: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(environment.urlApi + 'usuarios', loginForm);
  }

  logar(loginForm: Usuario): Observable<TokenUser> {
    return this.http.post<TokenUser>(environment.tokenUrl, loginForm);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
