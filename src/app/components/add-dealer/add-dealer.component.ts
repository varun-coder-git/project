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
@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.scss']
})
export class AddDealerComponent implements OnInit {
  url="https://ss2.equationswork.us:3001/";
  userName:any;
  showBigHeader: boolean;
  showSmallHeader: boolean;
  profilePicture:any;
  constructor(private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) { }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');

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
      data: 'Are you sure ?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar)
      {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userID');
        localStorage.removeItem('profilePicture');
       
   
     
      this.router.navigate(['/']);
      }
      
    })



  }
}
