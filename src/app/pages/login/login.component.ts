import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private authService: AuthService, private router:Router){}
  formLogin = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')

  })
  onSubmit(){
    const formData = new FormData();
    formData.append("name", this.formLogin.value.name ?? '')
    formData.append('password', this.formLogin.value.password ?? '');
    this.authService.login(formData).subscribe( async(data: any)=>{  
         this.authService.setToken(data.token);

         const user= await this.authService.getUser();
         if(user.isAdmin === 1 ){
          this.router.navigate(['/admin']);
         }
         else{
          this.router.navigate(['/']);
         }
    })
  }
}
