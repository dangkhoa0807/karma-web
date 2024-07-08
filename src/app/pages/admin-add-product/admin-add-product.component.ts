import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Category } from '../admin-categories/admin-categories.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../products.service';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: [''],
      price: [null],
      priceSales: [null],
      category: [''],
      image: [null]
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')!.updateValueAndValidity();
    }
  }

  async createProduct(): Promise<void> {
    const formData = new FormData();
    formData.append('name', this.productForm.value.name ?? '');
    formData.append('price', this.productForm.value.price?.toString() ?? '');
    formData.append('price_sales', this.productForm.value.priceSales?.toString() ?? '');
    formData.append('category', this.productForm.value.category ?? '');
  
    const imageFile = this.productForm.get('image')!.value;
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    try {
      const response = await this.productService.createProduct(formData).subscribe(
        {next :(data :any)=>{
          if(data.status ==200){
            alert ('thành công');
            this.router.navigate(['/admin']);
          }
        }}
      );
      // if (response.status === 200) {
      //   this.router.navigate(['/admin']);
      // }
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi gửi request');
    }
  }
}
