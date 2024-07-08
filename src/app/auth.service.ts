import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { data } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:3000/"
  constructor(private http: HttpClient) {

   }
   public userInfor : any| null =  null;
   setToken(token :string){
    localStorage.setItem("token", token)
   }

   login(formdata :FormData){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    const body = new URLSearchParams();
    body.set('name', formdata.get('name') as string);
    body.set('password', formdata.get('password') as string);
    return this.http.post(this.url+'login', body.toString(),{headers})

   }
   signUp(formData: any){
      return this.http.post(this.url+'signup', formData,{
        headers: { 'Content-Type': 'application/json' }
    });
   }
   // check email, name  exits
   checkExistence(email: string, name: string) {
    return this.http.post(this.url + 'signup/check-existence', { email, name }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
   user :any= {};
   async getUser() {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const data: any = await this.http
        .get(this.url + 'auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .toPromise();
      this.user = data.user;
      return this.user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
}
