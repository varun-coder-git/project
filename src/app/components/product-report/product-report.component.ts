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
import { GlobalVariable } from 'src/app/services/global-variable.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit {
  productSearchFilterForm: FormGroup;
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];
  showBigHeader: boolean;
  showSmallHeader: boolean;
  userName:any;
  profilePicture:any;
  productList:any;isSpinnerShow=true;
  url="https://ss2.equationswork.us:3001/";
  displayedColumns = ['created_on', 'product_id', 'product_name', 'qrCount', 'totalScan', 'suspectedScan', 'deception','scanDate', 'action1'];
  currentDate = new Date();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productDataSource: MatTableDataSource<Element>;
  constructor(private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.initForm();
    this.productDataSource= new MatTableDataSource<Element>();
    this.getProducts();
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
   openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
  logout() {
    console.log("Logout working!!");

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to logout?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userID');
        localStorage.removeItem('profilePicture');
       
   
     
      this.router.navigate(['/']);
      }
    })



  }
  initForm() {
    this.productSearchFilterForm = new FormGroup({
      'syncStartDate':  new FormControl('', [Validators.required]),
      'syncEndDate':  new FormControl('', [Validators.required]),
      'scanStartDate':  new FormControl('', [Validators.required]),
      'scanEndDate':  new FormControl('', [Validators.required]),
      'productNameID':  new FormControl('', [Validators.required]),
      'productLocation':  new FormControl('', [Validators.required]),
      'isActive':  new FormControl('', [Validators.required]),
      'isScanned':  new FormControl('', [Validators.required]),
    },



    );
  }
  get f() { return this.productSearchFilterForm.controls; }
  get today() { return new Date() }

  resetSearchFilter(){
    this.productSearchFilterForm.reset();
 this.initForm();
 this.getProducts();
  }
  openProductDetails(){
   
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  editProductDetails(){
   
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '90%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  getProducts() {

    this.service.getProductList().subscribe((res) => {
      this.isSpinnerShow=false;

  
      this.productList = res.data;
      this.productDataSource = new MatTableDataSource<any>(this.productList);
      this.productDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.productDataSource.sort = this.sort;
      this.productDataSource.paginator = this.paginator;

    }
    ,
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.productList=undefined;
        this.productDataSource = new MatTableDataSource<any>(this.productList);
        this.productDataSource.sort = this.sort;
        this.productDataSource.paginator = this.paginator;
      
      }
      else if(err == "Internal server error")
      this.toastr.warning("Internal server error!");  
      else{
        this.toastr.warning("Oops...Something went wrong!");   
        this.isSpinnerShow=false;
      }
     });

  
  }

  deleteProduct(productId:any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(productId);
    })
  }
  requestDelete(productId: any) {
    // let user_id = localStorage.getItem('user_id');
    // let token = localStorage.getItem('token');

    // let data = {
    //   'user_id': user_id,
    //   'token': token,
    //   'dealerID': dealerId,
   
    // }
    //console.log("obj", data);
    this.service.deleteProduct(productId).subscribe((res) => {
      this.toastr.success('Product Deleted!');
      
      this.getProducts();
    });
  }
  searchFilterProduct(){


    let data = {
      
      "startDate": this.productSearchFilterForm.controls['syncStartDate'].value,
      "endDate": this.productSearchFilterForm.controls['syncEndDate'].value,
      "productNameID": this.productSearchFilterForm.controls['productNameID'].value,
      "isActive":this.productSearchFilterForm.controls['isActive'].value,
      // "city":this.selectedCityName,
      // "state": this.selectedStateName,
      // "location": this.ProductSearchFilterForm.controls['ProductLocation'].value,
      // "country": this.selectedCountryName,
     

    }

    this.service.searchFilterProduct(data).subscribe((res) => {
      this.productList = res.data;
      this.productDataSource= new MatTableDataSource<any>(this.productList);
      this.productDataSource.paginator = this.paginator;

    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.productList=undefined;
        this.productDataSource = new MatTableDataSource<any>(this.productList);
        this.productDataSource.sort = this.sort;
        this.productDataSource.paginator = this.paginator;
      
      }
      else if(err == "Internal server error")
      this.toastr.warning("Internal server error!");  
      else
      this.toastr.warning("Oops...Something went wrong!");       
     });


  }

}
