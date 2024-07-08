import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url= "http://localhost:3000/admin/";
  apiUrl = 'http://localhost:3000/admin/update/category';
  constructor(private httpService: HttpClient) { }
  getAllCategory() {
    return this.httpService.get(this.url+"api/categories");
  }
  getCategoryById(id : any){
    
    return this.httpService.get(this.url+"api/category/"+id);
  }
  updateCategory(id: string, name: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('id', id);
    body.set('name', name);
    
    return this.httpService.post(this.apiUrl, body.toString(), { headers });
  }
  creteCate(name: string) :Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('name', name);
    
    
    return this.httpService.post('http://localhost:3000/admin/add/category',body, {headers})
  }
  deleCate(id: object) :Observable<any>{
    return this.httpService.delete(this.url + "delete/category?_id="+id);
  }
}
