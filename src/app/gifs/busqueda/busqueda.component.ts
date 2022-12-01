import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  
  // Decorador ViewChild que sirve para llamar a un elemento HTML y acceder a sus  props
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {}

  buscar() {

    // Asigna el valor del input a la variable "valor"
    const valor = this.txtBuscar.nativeElement.value;

    if ( valor.trim().length === 0 ) return;
    
    // Llama al método buscarGifs y le asigna el valor actual del input
    this.gifsService.buscarGifs(valor)
    
    // Reinicia el valor del input
    this.txtBuscar.nativeElement.value = ''
  }
}
