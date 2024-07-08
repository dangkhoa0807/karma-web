import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Product } from '../store/store.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../category.service';
import { Category } from '../admin-categories/admin-categories.component';
import { RouterLink,Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule,],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit {
  formProduct =new FormGroup({
    _id : new FormControl(''),
    category : new FormControl(''),
    name : new FormControl(''),
    image : new FormControl(),
    price : new FormControl(""),
    priceSales : new FormControl("")
  })
  categories : Category[] =[];
  products: Product[] = [];
  product: Product=  {
    _id: "",
    category: "",
    name: "",
    image: "",
    price: 0,
    price_sales: undefined,
  }
  ;
  constructor(private productService: ProductsService,
              private categoryService: CategoryService,
              private router: Router
            ){

  }
  ngOnInit(){
    this.getProducts();
    this.getCategories();
  }
  getProducts(){
    this.productService.getAllProduct().subscribe((data: any) => {
      this.products = data;
    });
  }
  getCategories(){
    this.categoryService.getAllCategory().subscribe((data: any) =>{
      this.categories=data;
      
    });
  }
  showDetail(id: any) {
    this.productService.getInforProductById(id).subscribe((data: any) => {
      this.product = data;
      this.formProduct.patchValue({
        _id: this.product._id,
        category: this.product.category,
        name: this.product.name,
        price: this.product.price.toString(),  // Convert number to string
        priceSales: this.product.price_sales ? this.product.price_sales.toString() : '',  // Convert number to string or set to empty string
      });
    });
  }
  
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formProduct.patchValue({ image: file });
      this.formProduct.get('image')!.updateValueAndValidity();
    }
  }
  async updateProduct(){
    const formData = new FormData();
    formData.append("_id", this.formProduct.value._id ?? '')
    formData.append('name', this.formProduct.value.name ?? '');
    formData.append('price', this.formProduct.value.price?.toString() ?? '');
    formData.append('price_sales', this.formProduct.value.priceSales?.toString() ?? '');
    formData.append('category', this.formProduct.value.category ?? '');
    
    const imageFile = this.formProduct.get('image')!.value;
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    try {
      const response = await this.productService.updateProduct(formData,formData.get("_id")).subscribe(
        {next :(data :any)=>{
          if(data.status == 200){
            alert ('thành công');
            window.location.reload();
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
  deleteProduct(id :string | object){
    this.productService.deleteProduct(id).subscribe(
      {next :(data :any)=>{
        if(data.status == 200){
          alert (data.message);
          window.location.reload();
        }
      }}
    );
  }
}
