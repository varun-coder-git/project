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
import { DealerPerformanceDetailsComponent } from '../dealer-performance-details/dealer-performance-details.component';

@Component({
  selector: 'app-dealer-performance',
  templateUrl: './dealer-performance.component.html',
  styleUrls: ['./dealer-performance.component.scss']
})
export class DealerPerformanceComponent implements OnInit {
  userName:any;
  showBigHeader: boolean;
  showSmallHeader: boolean;
  profilePicture:any;data:any;dealerPerformanceList:any;
  url="https://ss2.equationswork.us:3001/";
  dealerPerformanceSearchFilterForm: FormGroup;
  displayedColumns = ['date', 'dealerID', 'dealerName', 'productID', 'productName','isScanned', 'scanByUser','scanDate','suspectCount', 'action1'];
  currentDate = new Date();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dealerPerformanceDataSource: MatTableDataSource<Element>;
  constructor(private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.initForm();
    this.getDealerPerformance();
    // this.dealerPerformanceDataSource= new MatTableDataSource<Element>();
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
  openDetails(){
    const dialogRef = this.dialog.open(DealerPerformanceDetailsComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  getDealerPerformance() {

    this.data=[
      {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      },
          {
        "date": "2021-12-30T11:11:00.000Z",
        "dealer_id": 1,
        "dealer_name": "Bhakti Shah",
        "product_id": "1",
        "prod_name": "急支糖浆",
        "isScan": "Yes",
        "isScanByUser": "No",
        "scanDate":"2022-03-29T13:29:00.000Z",
        "suspectCount":"7"
      }
      
     
    ]

    this.dealerPerformanceList = this.data;
    console.log(this.dealerPerformanceList);

    this.dealerPerformanceDataSource = new MatTableDataSource<any>(this.dealerPerformanceList);
    this.dealerPerformanceDataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
    
      return data[sortHeaderId];
    };
    this.dealerPerformanceDataSource.sort = this.sort;
    this.dealerPerformanceDataSource.paginator = this.paginator;


  
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
    this.dealerPerformanceSearchFilterForm = new FormGroup({
      'regStartDate':  new FormControl('', [Validators.required]),
      'regEndDate':  new FormControl('', [Validators.required]),
      'lastActiveStartDate':  new FormControl('', [Validators.required]),
      'lastActiveEndDate':  new FormControl('', [Validators.required]),      
      'dealerName':  new FormControl('', [Validators.required]),
      'productNameID':  new FormControl('', [Validators.required]),
      'location':  new FormControl('', [Validators.required]),
      'isActive':  new FormControl('', [Validators.required]),
      'hasEscalatedIssues':  new FormControl('', [Validators.required]),
    },



    );
  }
  get f() { return this.dealerPerformanceSearchFilterForm.controls; }
  get today() { return new Date() }
  searchFilterDealerPerformance(){

  }
  resetSearchFilter(){
 this.initForm();
  }
  deleteDealerPerformance(dealerPerformanceId:any){

  }
}
