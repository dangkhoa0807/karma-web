import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-admin-add-categories',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './admin-add-categories.component.html',
  styleUrl: './admin-add-categories.component.css'
})
export class AdminAddCategoriesComponent {
  cateForm = new FormGroup({
    name: new FormControl("")
  });

  constructor(private categoryService: CategoryService,private router: Router) {

  }
  createCate(){
    const formData = new FormData();
    formData.append("name", this.cateForm.value.name ?? '');

    
    this.categoryService.creteCate(formData.get("name") as string).subscribe((data:any)=>{
      if(data.status ==200){
        alert (data.message);
        this.router.navigate(['/admin/categories']);
      }
      else {
        alert("Thêm sản phẩm thất bại")
      }
    })
  }
}
