import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService: AuthService,private router:Router){

  }
  formSignUp = new FormGroup({
    name:new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    email : new FormControl('',[Validators.email]),
    phone: new FormControl(''),
  });

  onSubmit(){
    const formData = {
      name: this.formSignUp.value.name ?? '',
      password: this.formSignUp.value.password ?? '',
      email: this.formSignUp.value.email ?? '',
      sdt: this.formSignUp.value.phone ?? ''
  };
  this.authService.checkExistence(formData.email, formData.name).subscribe((existence: any) => {
    if (existence.emailExists || existence.nameExists) {
      alert('Email hoặc tên đã tồn tại');
    } else {
      this.authService.signUp(formData).subscribe((data: any) => {
        // Xử lý phản hồi từ server
        alert(data.message);
        this.router.navigate(['/login']);
      });
    }
  });

  }
}
