import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products : Array<Product>=[];
  public keyword : string = "";
  constructor(private productService : ProductService) {
  }
    ngOnInit() {
        this.getProducts();
    }

    getProducts () {
     this.productService.getProducts(1, 3)
        .subscribe({
          next : data => {
            this.products=data;
          },
          error : err => {
            console.log(err);
          }
        })



      //this.products$=this.productService.getProducts();
    }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
        .subscribe({
      next : data => {
        product.checked =! product.checked;
      }
    })
  }

  handleDelete(product: Product) {
    if (confirm("Etes-vous sûre?"))
    this.productService.deleteProduct(product)
      .subscribe({
        next : data => {
          //this.getProducts()
          this.products=this.products.filter(p=>p.id!=product.id);
        }
      })
  }

  searchProduct() {
    this.productService.searchProduct(this.keyword).subscribe({
      next : data => {
        this.products=data;
      }
    })
  }
}
