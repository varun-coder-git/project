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
import { FeedbackDetailsComponent } from '../feedback-details/feedback-details.component';

@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.scss']
})
export class ComplaintReportComponent implements OnInit {
  url="https://ss2.equationswork.us:3001/";
  userName:any;
  profilePicture:any;
  complaintList: any;  showBigHeader: boolean;
  showSmallHeader: boolean;
  complaintSearchFilterForm: FormGroup;
  displayedColumns = ['date', 'complaintID', 'customerID', 'customerName', 'productID', 'productName', 'reportedQRCode', 'reportDate','action1'];
  currentDate = new Date();isSpinnerShow=true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  complaintDataSource: MatTableDataSource<Element>;
  constructor(private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
      this.getComplaints();
    this.initForm();
    this.complaintDataSource = new MatTableDataSource<Element>();
    this.complaintDataSource.paginator = this.paginator;
  }
  openFeedbackDetails(){
    const dialogRef = this.dialog.open(FeedbackDetailsComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
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
      if (showSnackBar)  {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userID');
        localStorage.removeItem('profilePicture');
       
   
     
      this.router.navigate(['/']);
      }
    })



  }
  initForm() {
    this.complaintSearchFilterForm = new FormGroup({
      'reportedStartDate':  new FormControl('', [Validators.required]),
      'reportedEndDate':  new FormControl('', [Validators.required]),
      'dealerName':  new FormControl('', [Validators.required]),
      'customerNameID':  new FormControl('', [Validators.required]),
      'productNameID':  new FormControl('', [Validators.required]),
      'location':  new FormControl('', [Validators.required]),
      
    },



    );
  }
  get f() { return this.complaintSearchFilterForm.controls; }
  get today() { return new Date() }
  getComplaints() {
   
    this.service.getComplaints().subscribe((res) => {
     this.isSpinnerShow=false;

      this.complaintList = res.data;
      this.complaintDataSource = new MatTableDataSource<any>(this.complaintList);
      this.complaintDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.complaintDataSource.sort = this.sort;
      this.complaintDataSource.paginator = this.paginator;

    }
    ,
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.complaintList=undefined;
        this.isSpinnerShow=false;
        this.complaintDataSource = new MatTableDataSource<any>(this.complaintList);
        this.complaintDataSource.sort = this.sort;
        this.complaintDataSource.paginator = this.paginator;
      
      }
      else if(err == "Internal server error"){
        this.isSpinnerShow=false;
        this.toastr.warning("Internal server error!"); 
      }
      
      else{
        this.isSpinnerShow=false;
        this.toastr.warning("Oops...Something went wrong!");  
      }
           
     });

  
  }
  searchFilterComplaint(){


    let data = {
 
      "startDate": this.complaintSearchFilterForm.controls['reportedStartDate'].value,
      "endDate": this.complaintSearchFilterForm.controls['reportedEndDate'].value,
      "dealerName": this.complaintSearchFilterForm.controls['dealerName'].value,
      "customerNameID": this.complaintSearchFilterForm.controls['customerNameID'].value,
      "productNameID": this.complaintSearchFilterForm.controls['productNameID'].value,
      "location": this.complaintSearchFilterForm.controls['location'].value,
     
     

    }

    this.service.searchFilterComplaint(data).subscribe((res) => {
      this.complaintList = res.data;
      this.complaintDataSource = new MatTableDataSource<any>(this.complaintList);
      this.complaintDataSource.paginator = this.paginator;

    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.complaintList=undefined;
        this.complaintDataSource = new MatTableDataSource<any>(this.complaintList);
        this.complaintDataSource.sort = this.sort;
        this.complaintDataSource.paginator = this.paginator;
      
      }
      else if(err == "Internal server error")
      this.toastr.warning("Internal server error!");  
      else
      this.toastr.warning("Oops...Something went wrong!");       
     });


  }
 resetSearchFilter(){
  this.complaintSearchFilterForm.reset();

  this.initForm();
  this.getComplaints();
  }
  deleteComplaint(complaintId:any){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(complaintId);
    })
  }
  requestDelete(complaintId: any) {
    
    
    this.service.deleteComplaint(complaintId).subscribe((res) => {
      this.toastr.success('Feedback Deleted!');
     this.getComplaints();
    });
  }
}
