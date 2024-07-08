import { Component, OnInit, inject } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../products.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../cart.service'; // Import the CartService
import { NgxPaginationModule } from 'ngx-pagination';

export interface Product {
  _id: string,
  category: string,
  name: string,
  image: string,
  price: number,
  price_sales?: number,
}

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, RouterLink, NgxPaginationModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  itemsPerPage: number = 6;
  p: number = 1;
  products: Product[] = [];
  displayedProducts: Product[] = [];
  pages: any[] = [];
  
  private http = inject(HttpClient);

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProduct().subscribe((data: any) => {
      this.products = data;
      this.setPagination();
      this.updateDisplayedProducts();
    });
  }

  addToCart(product: Product) {
    const qty = 1;
    const id = product._id;
    
    const hadProduct = this.cartService.getCartState().find((product) => product.id == id);
    if (hadProduct) {
      const productExisted = this.cartService.getCartState().find((item) => item.id == id);
      productExisted.qty += qty;
      this.cartService.dispatch({
        type: "updateCart",
        payload: productExisted,
      });
    } else {
      const productToAdd = {
        id: id,
        name: product.name,
        imgProduct: `/assets/img/product/${product.image}`,
        price: product.price_sales ? product.price_sales : product.price,
        qty: qty
      };
      this.cartService.dispatch({
        type: 'addToCart',
        payload: productToAdd
      });
    }
  }

  setPagination() {
    const totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (v, k) => ({ pageIndex: k + 1 }));
  }

  onPageIndexClicked(pageIndex: number, event: Event) {
    event.preventDefault();
    this.p = pageIndex;
    this.updateDisplayedProducts();
  }

  prevPage(event: Event) {
    event.preventDefault();
    if (this.p > 1) {
      this.p--;
      this.updateDisplayedProducts();
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
    if (this.p < this.pages.length) {
      this.p++;
      this.updateDisplayedProducts();
    }
  }

  updateDisplayedProducts() {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }
}
