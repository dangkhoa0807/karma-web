import { Component,Input,OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
export interface Category{
	_id: object,
	name: string
}
@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit{
  categories: Category[] = [];
  @Input() category: any= {
  }
  constructor(private categoryService: CategoryService){

  }
  ngOnInit(){
    this.getCategories()
    
  }
  getCategories(){
    this.categoryService.getAllCategory().subscribe((data: any)=>{
      this.categories= data
      
    })  
  }
  showDetail(id :any){
    
    this.categoryService.getCategoryById(id).subscribe((data: any)=>{
      this.category= data
      
    });
  }
  async updateCate() {
    try {
      await this.categoryService.updateCategory(this.category._id, this.category.name).subscribe({
        next: (data :any)=>{
          this.getCategories();
          alert("chỉnh sửa thành công")
          window.location.reload();
        }
      })
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi request");
    }
  }
  deleteCate(id: object){
    this.categoryService.deleCate(id).subscribe((data: any)=>{
      if(data.status ==200){
        alert(data.message);
        window.location.reload();
      }
    })
  }
}
