import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  // object to receive form data
  product: Product;
  constructor(private productSvc: ProductService,
    private alertService: AlertService) {
    if (productSvc.editIndex == -1)
        this.product = new Product();
    else
        this.product = Object.assign({},productSvc.products[productSvc.editIndex]);  

   }

  ngOnInit() {
  }

  saveProduct() {
    // A copy of the product object is created
    const toBeAdded = Object.assign({}, this.product);
    this.productSvc.add(toBeAdded);
    // alert message is displayed.
    this.alertService.success('Successfully added.');
    this.clearForm();
  }
  clearForm() {
    this.product.name ='';
    this.product.brand ='';
    this.product.price = 0;
  }
  update() {
    const toBeUpdated = Object.assign({}, this.product);
    this.productSvc.update(toBeUpdated);
    this.clearForm();
    this.alertService.success('Successfully updated.');
  }
}