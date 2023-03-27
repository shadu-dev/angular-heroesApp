import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: [ './agregar.component.css' ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe:Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }
  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroe(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar(){
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if(this.heroe.id) {
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.mostrarSnackBar('Registro actualizado'));
    } else {
      // crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackBar('Registro creado');
        })
      }
      
    }
    borrarHeroe(){
      
      const dialog = this.dialog.open(ConfirmarComponent, {
        width: '550px',
      data: { ...this.heroe }
      });
    
      dialog.afterClosed().subscribe(result => {
        if ( result ) {
          this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes'])
              this.mostrarSnackBar('Registro eliminado');
            })
        }
      })
  }

  mostrarSnackBar(mensaje:string ):void{
    this._snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    })
  }

}
