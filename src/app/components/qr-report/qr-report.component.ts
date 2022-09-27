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
import { ThrowStmt } from '@angular/compiler';
import { QrDetailsComponent } from '../qr-details/qr-details.component';

@Component({
  selector: 'app-qr-report',
  templateUrl: './qr-report.component.html',
  styleUrls: ['./qr-report.component.scss']
})
export class QrReportComponent implements OnInit {
  userName:any;
  profilePicture:any;
  showBigHeader: boolean;
  offset:number=0;
  pageSize: number;
  pageNo: number;
  showSmallHeader: boolean;isSpinnerShow=true;
  url="https://ss2.equationswork.us:3001/";
  qrSearchFilterForm: FormGroup;
  displayedColumns = ['syncDate', 'qrID', 'customerID', 'customerName', 'productID', 'productName', 'isUsed','isSuspected','escalatedCount', 'action1'];
  currentDate = new Date();
  qrList:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  qrDataSource: MatTableDataSource<Element>;
  constructor(private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0); this.pageSize = 10;
    this.pageNo = 0;
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.initForm();
    this.getQRs();
    this.qrDataSource= new MatTableDataSource<Element>();
    
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
    this.qrSearchFilterForm = new FormGroup({
      'syncStartDate':  new FormControl('', [Validators.required]),
      'syncEndDate':  new FormControl('', [Validators.required]),
      'scanStartDate':  new FormControl('', [Validators.required]),
      'scanEndDate':  new FormControl('', [Validators.required]),
      'productNameID':  new FormControl('', [Validators.required]),
      'scannedCustomerNameID':  new FormControl('', [Validators.required]),
      'problamaticQR':  new FormControl('', [Validators.required]),
      'isScanned':  new FormControl('', [Validators.required]),
    },



    );
  }
  get f() { return this.qrSearchFilterForm.controls; }
  get today() { return new Date() }
  searchFilterQR(){

  }
  resetSearchFilter(){
 this.initForm();
  }
  deleteQR(qrId:any){

  }
  getQRs() {

   
    this.service.getQRList(this.offset).subscribe((res) => {
      this.isSpinnerShow=false;
   
      this.qrList = res.data;
      this.qrDataSource = new MatTableDataSource<any>(this.qrList);
      this.qrDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.qrDataSource.sort = this.sort;
      this.qrDataSource.paginator = this.paginator;

    }
    ,
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.qrList=undefined;
        this.qrDataSource = new MatTableDataSource<any>(this.qrList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.qrDataSource.sort = this.sort;
        this.qrDataSource.paginator = this.paginator;
      
      }

      else if(err == "Internal server error")
      this.toastr.warning("Internal server error!");    
      else{
        this.isSpinnerShow=false;
        this.toastr.warning("Oops...Something went wrong!"); 
      }
           
     }
    );
  }
  openQRDetails(){
    const dialogRef = this.dialog.open(QrDetailsComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  pageEvents(event: any) {
    console.log(event.pageIndex);
    console.log(event.pageSize);
    if(event.pageIndex > this.pageNo) {
      console.log("event.pageIndex");
      this.offset=this.offset+20;
     
   
    this.service.getQRList(this.offset).subscribe((res) => {
      this.isSpinnerShow=false;
   
      this.qrList = [...this.qrList,...res.data];
      console.log(this.qrList)
      this.qrDataSource = new MatTableDataSource<any>(this.qrList);
      this.qrDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.qrDataSource.sort = this.sort;
      this.qrDataSource.paginator = this.paginator;

    }
    ,
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.qrList=undefined;
        this.qrDataSource = new MatTableDataSource<any>(this.qrList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.qrDataSource.sort = this.sort;
        this.qrDataSource.paginator = this.paginator;
      
      }

      else if(err == "Internal server error")
      this.toastr.warning("Internal server error!");    
      else{
        this.isSpinnerShow=false;
        this.toastr.warning("Oops...Something went wrong!"); 
      }
           
     }
    );
    } else {
      console.log("event.pageSize");
    }
    // The code that you want to execute on clicking on next and previous buttons will be written here.
 }
}
