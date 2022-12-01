import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  
  buscar( termino: string ): void {
    this.gifsService.buscarGifs( termino )
  }
  
  borrarHistorial() {
    this.gifsService.borrarHistorial()
  }

  get historial() {
    return this.gifsService.historial;
  }
  
  constructor( private gifsService: GifsService ) {}
}
