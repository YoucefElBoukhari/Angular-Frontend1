import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductActionsTypes} from "../../state/product.state";
import {EventDriverService} from "../../state/event.driver.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit{
  productId!:number;
  productFormGroup!:FormGroup;
  protected submitted:boolean=false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private eventDriverService:EventDriverService,
    private fb: FormBuilder) {
    this.productId = activatedRoute.snapshot.params['id']; // Use square brackets for 'id'
  }

  ngOnInit() : void {
    this.productsService.getProduct(this.productId)
      .subscribe(product=>{
        this.productFormGroup=this.fb.group({
          name:[product.name, Validators.required],
          price:[product.price, Validators.required],
          quantity:[product.quantity, Validators.required],
          selected:[product.selected, Validators.required],
          available:[product.available, Validators.required],
        })
    })
  }

  onUpdateProduct() {
    this.productsService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED})
        alert("Success Product updated");
      });
  }
}
