import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {EventDriverService} from "../../state/event.driver.service";
import {ProductActionsTypes} from "../../state/product.state";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {

  productFormGroup!: FormGroup; // Use non-null assertion
  submitted:boolean=false;

  constructor(
    private formBuilder: FormBuilder, private productsService:ProductsService,
    private eventDriverService:EventDriverService,

  ) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [false, Validators.required],
    });
  }

  onSaveProduct() {
    this.submitted=true;
    if(this.productFormGroup!.invalid) return;
    this.productsService.save(this.productFormGroup!.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED})
        alert("Success Saving Product");
      })
  }
}
