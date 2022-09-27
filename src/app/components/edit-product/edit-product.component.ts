import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from 'src/app/services/global-variable.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  url="https://ss2.equationswork.us:3001/";
  userName:any;
  showBigHeader: boolean;
  showSmallHeader: boolean;
  profilePicture:any;
  toppings = new FormControl();
  urlProduct:any;
  productCategoryList:any;productSpeciesList:any;
  toppingList: string[] = ['Livestock', 'Horses', 'Pets', 'Others'];
  isURL:any=false;ispdfURL:any=false;
  imageFileName:any;
  pdfFileName:any;
  iconList = [
    { type: 'png', icon: 'fa fa-file-image-o' },
    { type: 'gif', icon: 'fa fa-file-image-o' },
    { type: 'pdf', icon: 'fa fa-file-pdf-o' },
    { type: 'jpg', icon: 'fa fa-file-image-o' },
    { type: 'jpeg', icon: 'fa fa-file-image-o' },
    { type: 'mp4', icon: 'fa fa-file-video-o' },
    { type: 'mpeg', icon: 'fa fa-file-video-o' },
    { type: 'jfif', icon: 'fa fa-file-image-o' },
    { type: 'doc', icon: 'fa fa-file-word-o' },
    { type: 'docx', icon: 'fa fa-file-word-o' },
    { type: 'xlsx', icon: 'fa fa-file-excel-o' },
    { type: 'xls', icon: 'fa fa-file-excel-o' },
    { type: 'txt', icon: 'fa fa-file-text' },
    { type: 'pptx', icon: 'fa fa-file-powerpoint-o' },
    { type: 'ppt', icon: 'fa fa-file-powerpoint-o' },
    { type: 'csv', icon: 'fa fa-file-text' },
  ];
  thumbnailArray: string[] = [];
  productImageFile:any;productDocumentFile:any;
  addProductForm:FormGroup;
  selectedProductCategory:any;selectedProductSpecies:any;
  selectedProductDocuments:any;
  constructor(private dialogRef: MatDialogRef<EditProductComponent>,private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) { }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.initForm();
    this.getProductCategory();
    this.getProductSpecies();

  }
  sideBarToggleFunction() {
    if (this.showBigHeader == false) {

      this.showBigHeader = true;
      this.showSmallHeader = false;
      this.globalService.showBigHeader=this.showBigHeader;
      this.globalService.showSmallHeader=this.showSmallHeader;

    }
    else {

      this.showBigHeader = false;
      this.showSmallHeader = true;
      this.globalService.showBigHeader=this.showBigHeader;
      this.globalService.showSmallHeader=this.showSmallHeader;
    }
  }
  initForm(){
    this.addProductForm = new FormGroup({
      'productName':  new FormControl(null, [Validators.required]),
      'productCode':  new FormControl('', [Validators.required]),
      'productCategory':  new FormControl('', [Validators.required]),
      'productSpecies':  new FormControl('', [Validators.required]),
      'packageSize':  new FormControl('', [Validators.required]),
      'activeIngredients':  new FormControl('', [Validators.required]),
      'isURL':  new FormControl( "",[Validators.required]),
      'descriptionLinks':  new FormControl('', ),
    });
  }
  getProductCategory(){
    this.service.getProductCategory().subscribe((res) => {
      this.productCategoryList=res.data;
     });
  }
  onClose(){
    this.dialogRef.close();
  }
  getErrorProductName() {
  
    
    return this.addProductForm.controls['productName'].hasError('required') ? 'Product Name is required!' : '';
  }
  getErrorProductCode() {
  
    
    return this.addProductForm.controls['productCode'].hasError('required') ? 'Product Code is required!' : '';
  }
  getErrorProductCategory() {
  
    
    return this.addProductForm.controls['productCategory'].hasError('required') ? 'Product Category is required!' : '';
  }
  getErrorProductSpecies() {
  
    
    return this.addProductForm.controls['productSpecies'].hasError('required') ? 'Product Species is required!' : '';
  }
  getProductImgError(){
    return this.addProductForm.controls['isURL'].hasError('required') ? 'Product Image is required!' : '';
  }
  getErrorProductSize() {
  
    
    return this.addProductForm.controls['packageSize'].hasError('required') ? 'Package Size is required!' : '';
  }
  getErrorProductIngredients() {
  
    
    return this.addProductForm.controls['activeIngredients'].hasError('required') ? 'Active Ingredients is required!' : '';
  }
  getProductSpecies(){
    this.service.getProductSpecies().subscribe((res) => {
      this.productSpeciesList=res.data;
     });
  }
  addProduct(){

    
    if (this.addProductForm.invalid) {
      return;
    }


    else{
      let fileArray:any=[];
      for(let i=0;i<this.selectedProductDocuments.length;i++)
      fileArray.push(this.selectedProductDocuments[i]);

      let user_id:any=localStorage.getItem("userID");
      let token:any=localStorage.getItem("userToken");

      
      
        let formData = new FormData();
        formData.append("token",token);
        formData.append("user_id",user_id);
		    
       formData.append("productCode",this.addProductForm.controls['productCode'].value);
        formData.append("productName",this.addProductForm.controls['productName'].value);
        formData.append("productCategory",this.addProductForm.controls['productCategory'].value);
        formData.append("productSpecies",this.addProductForm.controls['productSpecies'].value);
        formData.append("productPackage",this.addProductForm.controls['packageSize'].value);
        formData.append("productIngredients",this.addProductForm.controls['activeIngredients'].value);
        formData.append("productDescription",this.addProductForm.controls['descriptionLinks'].value);
        formData.append("file",this.productImageFile);
        for(let i=0;i<this.selectedProductDocuments.length;i++){
          formData.append("file1",this.selectedProductDocuments[i]);
        }
      //  }
       // formData.append("file1",this.productDocumentFile);
        
        console.log(formData);

       // this.spinner.show();
        this.service.addProduct(formData).subscribe(res => {
  
          if (res.status) {
            this.toastr.success('Product added successfully!');
                     
            this.addProductForm.reset();
            for (let control in this.addProductForm.controls) {
              this.addProductForm.controls[control].setErrors(null);
            }
            this.isURL=false;
            this.ispdfURL=false;
        //     this.addProductForm.markAsPristine();
        // this.addProductForm.markAsUntouched();
          }
  
        }
        )
      
  
        
    }
    
 
  }
  resetForm(){
    this.addProductForm.reset();
    for (let control in this.addProductForm.controls) {
      this.addProductForm.controls[control].setErrors(null);
    }
    // this.initForm();
    this.isURL=false;
    this.ispdfURL=false;
  }
  logout() {
    console.log("Logout working!!");

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to logout?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar)  {
        localStorage.removeItem('userToken');
          localStorage.removeItem('userName');
          localStorage.removeItem('userID');
          localStorage.removeItem('profilePicture');
         
     
       
        this.router.navigate(['/']);
      }
    })



  }
  onSelectFile(event:any) {
    console.log(event.target.files[0])
    console.log(event.target.files[0].size)
    this.imageFileName=event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {

      if(event.target.files[0].size < 5242880){
    
       this.productImageFile=event.target.files[0];
       this.selectedProductDocuments=event.target.files;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    
      reader.onload = (event) => { // called once readAsDataURL is completed

        this.urlProduct = reader.result;
        console.log(this.url);
       
        this.isURL=true;
      }
    }
    else{
      //this.toastrService.warning("File size should not be more than 5MB!");
    }
  }
  }
  getFileExtension(filename: any) {
    let ext = filename.split('.').pop();
    let obj = this.iconList.filter(row => {
      if (row.type === ext) {
        return true;
      }
      else
        return false;
    });
    if (obj.length > 0) {
      let icon = obj[0].icon;
      return icon;
    } else {
      return '';
    }
  }
  onSelectFileDocument(event:any) {
    this.thumbnailArray=[];
    if(event.target.files.length>3){
      this.toastr.warning("Maximum 3 attchments are allowed!")
    }
    else{
      console.log(event.target.files[0].name)
    console.log(event.target.files[0].size)
    // this.pdfFileName=event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {

      
    
      this.selectedProductDocuments=event.target.files;
      console.log(this.selectedProductDocuments);
      for(let i=0;i<this.selectedProductDocuments.length;i++){
        this.thumbnailArray.push(event.target.files[i].name)
      }
   // console.log(this.selectedProductDocuments)
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
    
      reader.onload = (event) => { // called once readAsDataURL is completed

        //this.urlProduct = reader.result;
        console.log(this.url);
       
        this.ispdfURL=true;
      
    }}
    else{
      //this.toastrService.warning("File size should not be more than 5MB!");
    }
    }
   
  }
  

}
