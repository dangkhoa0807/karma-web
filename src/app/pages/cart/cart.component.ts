import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CartService } from '../../cart.service';
interface Product{
  id: string | object,
  imgProduct: string,
  name : string,
  price : number,
  qty: number
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include FormsModule
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCartState();
  }

  increaseQuantity(product: Product) {
    const productExisted = this.cartService.getCartState().find((item) => item.id == product.id);
      productExisted.qty += 1;
      this.cartService.dispatch({
        type: "updateCart",
        payload: productExisted,
      });
  }

  decreaseQuantity(product: Product) {
    const productExisted = this.cartService.getCartState().find((item) => item.id == product.id);
    productExisted.qty -= 1;
    this.cartService.dispatch({
      type: "updateCart",
      payload: productExisted,
    });
  }

  updateTotal(product: Product) {
    // Hàm này có thể được sử dụng để cập nhật tổng giá trị nếu cần
    this.cartService.updateCartState(this.cart);
  }

  removeProduct(productId: number) {
    // this.cart = this.cart.filter(product => product.id !== productId);
    // this.cartService.updateCartState(this.cart);
  }
}
