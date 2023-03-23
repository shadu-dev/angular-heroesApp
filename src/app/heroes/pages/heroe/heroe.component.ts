import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private heroesService:HeroesService,
    private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => { 
        // No se puede acceder mediante notacion de punto pero si desestructurando
        return this.heroesService.getHeroe(id);
      })
    ).subscribe(heroe => this.heroe = heroe);
  }

  // Otra opcion para redirigir en lugar del routerLink directo
  // en el elemento HTML
  regresar(){
    this.router.navigate(['/heroes/listado']);
  }
}
