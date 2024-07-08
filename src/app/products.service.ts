import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url ="http://localhost:3000/admin/"

  constructor(private httpService: HttpClient) { }
  getAllProduct() {
    return this.httpService.get(this.url+"api/products");
  }
  getProductById(id : any){
    return this.httpService.get(this.url+"api/product/"+id);
  }
  getInforProductById(id : any){
    return this.httpService.get(this.url+'api/product/'+id);
  }
  
  createProduct(formData: FormData): Observable<any> {
    return this.httpService.post(this.url+'add/product', formData);
  }
  updateProduct(formData: FormData,id :any): Observable<any> {
    return this.httpService.post(this.url+'update/product?_id='+formData.get("_id"), formData);
  }
  deleteProduct(id : any): Observable<any> {
    return this.httpService.delete(this.url+'delete/product?_id='+id);
  }
}
