import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/info-products';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  Producto: Producto[];
  ProductosFiltrados: Producto[] = [];

  constructor( private http: HttpClient) { 
  
    this.cargarProductos();
  
  }

  private cargarProductos(){

    return new Promise( (resolve, rejects) => {

      this.http.get('https://curso-angular-f53e6.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        
        console.log( resp );
        this.Producto = resp;
        this.cargando = false;
        resolve();
      
      });
  

    });
      
  }

  getProducto(id: string){

    return this.http.get(`https://curso-angular-f53e6.firebaseio.com/productos/${id}.json`);

  }

  buscarProductos(termino: string){

    if(this.Producto.length === 0){
      this.cargarProductos().then( () => { 

        this.filtrarProductos( termino );

      });
    }else{
        this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string){

    this.ProductosFiltrados = [];
    termino = termino.toLowerCase();
    
    this.Producto.forEach( prod => {

      const tituloLower = prod.titulo.toLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.ProductosFiltrados.push(prod);
      }

  });

  }

}
