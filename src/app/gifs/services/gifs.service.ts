import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string    = 'Ujtu80OK88tAmLb1vAn9qK6LWvL26Sdk';
  private servicioURL : string    = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[]  = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // Validamos que el item 'historial' no sea nulo y le asignamos al historial el valor del localStorage
    // if ( localStorage.getItem('historial') ) {
    //   this._historial = JSON.parse( localStorage.getItem('historial')! )
    // }

  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    // Si el arreglo "historial" NO incluye el query entonces agrega esa query.
    if ( !this._historial.includes( query ) ) {

      // Agrega el parametro al arreglo de historial
      this._historial.unshift( query );

      // Mantiene el arreglo "historial" con máximo 10 elementos
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '15')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params }) 
      .subscribe( ( resp ) => {
      this.resultados = resp.data;

      // Creamos el key <resultados> y guardamos los valores del array "resultados".
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });

  }

  borrarHistorial() {
    localStorage.clear()
    this._historial = [];
    this.resultados = [];
  }
}
