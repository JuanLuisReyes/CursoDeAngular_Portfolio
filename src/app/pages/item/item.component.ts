import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { itemInfomation } from '../../interfaces/info-item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  Producto: itemInfomation;
  id: string;

  constructor( private route: ActivatedRoute, public ProductosService: ProductosService) { 

    this.route.params
    .subscribe( parametros => {
      
      this.ProductosService.getProducto(parametros['id']).subscribe( (productos: itemInfomation) =>{
        this.id = parametros['id'];
        this.Producto = productos;
        console.log(productos);

      });

    });

  }

  ngOnInit(): void {
  }

}
