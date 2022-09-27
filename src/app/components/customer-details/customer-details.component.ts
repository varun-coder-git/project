import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatSort } from '@angular/material/sort';
import { GlobalVariable } from 'src/app/services/global-variable.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  
  displayedColumns = ['date', 'complaintID', 'productID','productName', 'reportedQRCode', 'action'];
  customerId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  customerComplaintProductDataSource: MatTableDataSource<Element>;
  user_id: any;
  token: any;
  DATA: any;
  showBigHeader: boolean;
  showSmallHeader: boolean;
  customerDetails: any;isSpinnerShow=true;
  customerComplaintProductDetails: any;
  url="https://ss2.equationswork.us:3001/";
  userName:any;
  profilePicture:any;
  constructor(private globalService:GlobalVariable,private router: Router, private route:ActivatedRoute,private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) {
    this.customerId = window.history.state.customerID;
    this.route.queryParams.subscribe(params => {
      this.customerId = JSON.parse(params["customerID"]);})
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
    this.customerComplaintProductDetails= new MatTableDataSource<Element>();
    this.viewCustomerDetailsById();
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
  viewCustomerDetailsById() {
    let obj2 = { 'customerID': this.customerId }
    let obj3 = {
      ...this.DATA, ...obj2
    }
    this.service.viewCustomerDetailsById(this.customerId).subscribe((res) => {
      this.isSpinnerShow=false;
      this.customerDetails = res.data[0];
      this.customerComplaintProductDetails = res.data[1];
      this.getCustomerComplaintProductDetails();
    },
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.toastr.warning("No Data to display!"); 
      
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
  getCustomerComplaintProductDetails(){
    this.customerComplaintProductDataSource = new MatTableDataSource<any>(this.customerComplaintProductDetails);
    this.customerComplaintProductDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };
    this.customerComplaintProductDataSource.sort = this.sort;
    this.customerComplaintProductDataSource.paginator = this.paginator;
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

}
