import { Component, inject } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Product } from '../store/store.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  route :ActivatedRoute = inject(ActivatedRoute);
  product :Product |undefined;
  constructor(private productsService: ProductsService){
    const productID = this.route.snapshot.params["_id"];
    this.productsService.getProductById(productID).subscribe((data:any)=>{
      this.product = data;
      console.log(data);
    
    })
    
  }
}
