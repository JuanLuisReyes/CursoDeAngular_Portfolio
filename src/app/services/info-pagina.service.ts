import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.service';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  info_cargada = false;
  equipo: any[] = [];

  constructor( private http: HttpClient) {

      this.cargarInfo();
      this.cargarEquipo();

   }

   private cargarInfo(){
      //Lectura de Json

      this.http.get("assets/data/data-pagina.json")
      .subscribe( (resp: InfoPagina ) => {
      
      this.info_cargada = true;
      this.info = resp;
      console.log(resp);
    });

   }

   
   private cargarEquipo(){

    //Lectura de Json

    this.http.get('https://curso-angular-f53e6.firebaseio.com/equipo.json')
    .subscribe( (resp: any[] ) => {
    
    this.equipo = resp;
    console.log(resp);
  });

 }

}
