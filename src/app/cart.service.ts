import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private initialState: any[] = [];

  constructor() {
    const storedCartState = localStorage.getItem('cartState');
    const initialState = storedCartState ? JSON.parse(storedCartState) : [];
    this.cartState$ = new BehaviorSubject<any[]>(initialState);

    
  }

  private cartState$ = new BehaviorSubject<any[]>(this.initialState);
  
  
  getCartState() {
    return this.cartState$.getValue();
  }
  updateCartState(cart: any[]){
    return this.cartState$.getValue();
    
  }

  private reducer(state: any[], action: { type: string, payload: any }): any[] {
    switch (action.type) {
      case 'addToCart':
        return [...state, action.payload];
      case 'deleToCart':
        return state.filter(item => item.id !== action.payload);
      case 'updateCart':
        return state.map(item => item.id === action.payload.id ? action.payload : item);
      default:
        return state;
    }
  }

  dispatch(action: { type: string, payload: any }) {
    const currentState = this.cartState$.getValue();
    const newState = this.reducer(currentState, action);
    
    
    
    // Cập nhật trạng thái giỏ hàng trong localStorage
    localStorage.setItem('cartState', JSON.stringify(newState));
    
    // Phát ra trạng thái mới
    this.cartState$.next(newState);
  }
}