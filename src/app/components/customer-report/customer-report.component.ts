import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { GlobalVariable } from 'src/app/services/global-variable.service';
@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent implements OnInit {
  user_id: any;  showBigHeader: boolean;
  showSmallHeader: boolean;
  token: any;
  DATA: any;
  userName:any;
  profilePicture:any;isSpinnerShow=true;
  url="https://ss2.equationswork.us:3001/";
  customerList: any;
  customerSearchFilterForm: FormGroup;
  displayedColumns = ['date', 'customerID', 'customerName', 'phoneNumber', 'lastActiveDate', 'escalatedCount', 'escalatedDate', 'action1'];
  currentDate = new Date();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  customerDataSource: MatTableDataSource<Element>;
  constructor(private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr:ToastrService) {
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.user_id = localStorage.getItem('user_id');
    this.token = localStorage.getItem('token');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.initForm();
   this.getCustomers();
    this.customerDataSource = new MatTableDataSource<Element>();
    this.customerDataSource.paginator = this.paginator;
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
  initForm() {
    this.customerSearchFilterForm = new FormGroup({
      // 'registrationStartDate':  new FormControl('', [Validators.required]),
      // 'registrationEndDate':  new FormControl('', [Validators.required]),    
      // 'lastActiveStartDate':  new FormControl('', [Validators.required]),
      // 'lastActiveEndDate':  new FormControl('', [Validators.required]),
      'startDate':  new FormControl('', [Validators.required]),
      'endDate':  new FormControl('', [Validators.required]),
      'lastActiveDate':  new FormControl('', [Validators.required]), 
      'lastActiveEndDate':  new FormControl('', [Validators.required]), 
      'hasEscalatedIssue':  new FormControl(),
      'isActive': new FormControl(),
      'customerNameID':  new FormControl('', [Validators.required]),
      'phoneNumber':  new FormControl('', [Validators.required]),
      'customerLocation':  new FormControl('', [Validators.required]),
    },
    );
  }
  get f() { return this.customerSearchFilterForm.controls; }
  get today() { return new Date() }
  resetSearchFilter(){
    this.customerSearchFilterForm.reset();
    this.initForm();
    this.getCustomers();
  }
  getCustomers() {

    this.service.getCustomerList().subscribe((res) => {
      this.isSpinnerShow=false;
      this.customerList = res.data;
      this.customerDataSource = new MatTableDataSource<any>(this.customerList);
      this.customerDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.customerDataSource.sort = this.sort;
      this.customerDataSource.paginator = this.paginator;

    }
    ,
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.customerList=undefined;
        this.customerDataSource = new MatTableDataSource<any>(this.customerList);
        let searchText = (<HTMLInputElement>document.getElementById("search")).value;
        this.customerDataSource.sort = this.sort;
        this.customerDataSource.paginator = this.paginator;
      
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
  searchFilterCustomer(){
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
     
      "startDate": this.customerSearchFilterForm.controls['startDate'].value,
      "endDate": this.customerSearchFilterForm.controls['endDate'].value,
      "lastActiveDate": this.customerSearchFilterForm.controls['lastActiveDate'].value,
      "lastActiveEndDate": this.customerSearchFilterForm.controls['lastActiveEndDate'].value,
      "customerNameID": this.customerSearchFilterForm.controls['customerNameID'].value,     
      "phoneNumber": this.customerSearchFilterForm.controls['phoneNumber'].value,
      "location": this.customerSearchFilterForm.controls['customerLocation'].value,
      "hasEscalatedIssue":false,
      "isActive":false,
    }

    this.service.searchFilterCustomer(data).subscribe((res) => {
      this.customerList = res.data;
      this.customerDataSource = new MatTableDataSource<any>(this.customerList);
      this.customerDataSource.paginator = this.paginator;

    }    ,
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.customerList=undefined;
        this.customerDataSource = new MatTableDataSource<any>(this.customerList);
        this.customerDataSource.sort = this.sort;
        this.customerDataSource.paginator = this.paginator;
      
      }
      else if(err == "Internal server error")
      this.toastr.warning("Internal server error!");  
      else
      this.toastr.warning("Oops...Something went wrong!");       
     });

  }
  openCustomerDetails(customerID:any){
    this.router.navigate(['/Customer-Details'],{ queryParams: { customerID: customerID } });
  }
  deleteCustomer(customerId: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(customerId);
    })
  }
  requestDelete(customerId: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    this.service.deleteCustomer(customerId).subscribe((res) => {
      this.toastr.success('Customer Deleted!');
      
      this.getCustomers();
    });
  }

  logout() {
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
}
