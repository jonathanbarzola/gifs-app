import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    return [...this._historial]
  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    // Si el arreglo "historial" NO incluye el query entonces agrega esa query.
    if ( !this._historial.includes( query ) ) {

      // Agrega el parametro al arreglo de historial
      this._historial.unshift( query );

      // Mantiene el arreglo "historial" con máximo 10 elementos
      this._historial = this._historial.splice(0, 10);

    }

    console.log(this._historial);
  }

  constructor() {}
}
