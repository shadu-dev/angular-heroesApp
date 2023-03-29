import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigate(['./auth/login'])
            }
          })
        );
      //   if (this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por auth guards - canActivate')
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this.authService.verificaAutenticacion();
      //   if (this.authService.verificaAutenticacion()){
    //     return true;
    //   }
    //   console.log('Bloqueado por auth guards')
    // return false;
  }
}
