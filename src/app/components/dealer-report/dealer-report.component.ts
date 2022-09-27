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
import { ToggleButtonGlobalVariable } from 'src/app/services/toggle-button-global-variable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fs from 'file-saver';
import { GlobalVariable } from 'src/app/services/global-variable.service';
import { DealerDetailComponent } from '../dealer-detail/dealer-detail.component';
import { EditDealerComponent } from '../edit-dealer/edit-dealer.component';
@Component({
  selector: 'app-dealer-report',
  templateUrl: './dealer-report.component.html',
  styleUrls: ['./dealer-report.component.scss']
})
export class DealerReportComponent implements OnInit {
  userName:any;showBigHeader: boolean;
  showSmallHeader: boolean;
  profilePicture:any;
//  url='http://164.52.208.77:3001/';
  public userArray: User[] = [];
  public dealerArray: Dealer[] = [];
  public headers: string[] = [];
  user_id: any;
  token: any;
  DATA: any;templateCSVHeaders:any;
  path:any;isSpinnerShow=true;
  dealerList: any;countryList:any;stateList:any;cityList:any;
  selectedCountryName:any="";selectedStateName:any="";selectedCityName:any="";
  dealerSearchFilterForm: FormGroup;
  sourcePath =
    "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf";
  fileName = "sample.pdf";
  url="https://ss2.equationswork.us:3001/";
  templateData:any;
  // constructor(){
  //   this.http.get('assets/csv.csv', {responseType: 'text'})
  //   .subscribe(
  //       data => {
  //           let csvToRowArray = data.split("\n");
  //           for (let index = 1; index < csvToRowArray.length - 1; index++) {
  //             let row = csvToRowArray[index].split(",");
  //             this.userArray.push(new User( parseInt( row[0], 10), row[1], row[2].trim()));
  //           }
  //           console.log(this.userArray);
  //       },
  //       error => {
  //           console.log(error);
  //       }
  //   );
  // }
  constructor(private globalService:GlobalVariable,private router: Router, private http: HttpClient, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) {
    this.http.get('assets/csv/test.csv', { responseType: 'text' })
      .subscribe(
        data => {
          // let csvToRowArray = data.split("\n");
          // for (let index = 1; index < csvToRowArray.length - 1; index++) {
          //   let row = csvToRowArray[index].split(",");
          // //  this.userArray.push(new User( parseInt( row[0], 10), row[1], row[2].trim()));
          //  this.dealerArray.push(new Dealer( row[0], row[1], row[2],row[3], row[4], row[5],row[6],row[7]));
          // }
          // console.log(this.dealerArray);
          if (data != null && data.length > 0) {
            this.templateCSVHeaders = data.split('\n');
            this.templateCSVHeaders = this.templateCSVHeaders.filter((x:any) => x.trim() !== '');
            for (const item of this.templateCSVHeaders) {
              this.headers.push(item.trim());
            }

            let arrHeader = [];
            arrHeader.push(this.headers[0].split(','));
            console.log(this.headers[0]);
            console.log(arrHeader);
          } else {
            this.headers = [];
          }
        },
        error => {
          console.log(error);
        }


      );
  }
  title = 'mte-test';
  
  displayedColumns = ['date', 'city', 'country', 'dealerID', 'fullName', 'location', 'phoneNumber', 'action1', 'action2'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Element>;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.user_id = localStorage.getItem('userID');
    this.token = localStorage.getItem('userToken');
    this.DATA = {
      'user_id': this.user_id,
      'token': this.token
    }
    this.initForm();
    this.getDealers();
    this.getCountries();
    this.downloadTemplateCSV();
    this.dataSource = new MatTableDataSource<Element>();
    this.dataSource.paginator = this.paginator;
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
  getCountries(){
    this.service.getCountries().subscribe((res) => {
     this.countryList=res.data;
    });
  }
  
  initForm() {
    this.dealerSearchFilterForm = new FormGroup({
      'startDate':  new FormControl('', [Validators.required]),
      'endDate':  new FormControl('', [Validators.required]),
      'dealerNameID':  new FormControl('', [Validators.required]),
     
      'dealerCountry':  new FormControl('', [Validators.required]),
      'dealerState': new FormControl('', [Validators.required]),
      'dealerCity': new FormControl('', [Validators.required]),
      'dealerPhoneNumber':  new FormControl('', [Validators.required]),
      'dealerLocation':  new FormControl('', [Validators.required]),
    },



    );
  }
  get f() { return this.dealerSearchFilterForm.controls; }
  get today() { return new Date() }
  getDealers() {

    this.service.getDealersList().subscribe((res) => {
      this.isSpinnerShow=false;

      this.dealerList = res.data;
      this.dataSource = new MatTableDataSource<any>(this.dealerList);
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
      
        return data[sortHeaderId];
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    },
    
  
  (err ) =>
   {

    if(err == "Data Not Found"){
      this.toastr.warning("Internal server error!");
    
    }
    else if(err == "Internal server error")
    this.toastr.warning("Internal server error!");  
    else{
      this.toastr.warning("Oops...Something went wrong!");   
      this.isSpinnerShow=false;
    }
        
   }
    );
  }
  openDetails(){
    const dialogRef = this.dialog.open(DealerDetailComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  editDealer(){
    const dialogRef = this.dialog.open(EditDealerComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  onCountryChange(event:any){
    
    let countryId=event.target.value;
    
    this.service.getStateByCountryId(countryId).subscribe(res => {
       this.stateList=res.data;
    })

    for(let i=1;i<this.countryList.length;i++){
    
      if(countryId == this.countryList[i].country_id){
        this.selectedCountryName=this.countryList[i].country_name;
        console.log(this.selectedCountryName);
      }
     
    }
  
  }
  onStateChange(event:any){
    
    let stateId=event.target.value;
    
    this.service.getCityByStateId(stateId).subscribe(res => {
       this.cityList=res.data;
    })
    for(let i=0;i<this.stateList.length;i++){
      if(stateId == this.stateList[i].state_id){
        this.selectedStateName=this.stateList[i].state_name;
        console.log(this.selectedStateName);
      }
     
    }
  }
  onCityChange(event:any){
    
    let cityId=event.target.value;
    for(let i=0;i<this.cityList.length;i++){
      if(cityId == this.cityList[i].city_id){
        this.selectedCityName=this.cityList[i].city_name;
        console.log(this.selectedCityName);
      }
     
    }

  }
  handleFileSelect(event: any) {
    // var files = evt.target.files; // FileList object
    // var file = files[0];
    let file = event.target.files[0];
    console.log(file);
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (event: any) => {
      let csv = event.target.result; // Content of CSV file
      console.log(csv);

      let header = [];
      header.push(csv.split('\n'));
      //console.log("header:", header);

     console.log("header: ",header[0][0])
      //this.toastr.success("CSV Compared successfully!");
console.log(this.templateCSVHeaders)
      if(this.templateCSVHeaders == header[0][0]){
      //this.toastr.success("CSV Compared successfully!");
      let formData = new FormData();

		
			formData.append('file1',file);
      console.log("CSV file:",file)
      console.log("uploaded file:",formData)
      this.service.importDealerCSV(formData).subscribe(res => {
			 // console.log("Document uploaded successfully");
       console.log(res.downloadPath);
       let path=res.downloadPath;
        this.toastr.success("CSV file uploaded successfully!<br/>"+res.successDataCount+" records uploaded successfully!<br/>"+res.failedDataCount+" records failed uploading!",'', {  enableHtml: true });
       let pathFile= this.url+path.substr(2);
       file=undefined;
        try {
            fs.saveAs(pathFile, "filename.xlsx");
            
        }
        catch (e) {
            console.log(e)
        }
        // const link = document.createElement('a');
       
        // link.setAttribute('href', 'https://image.shutterstock.com/image-photo/burgundy-snails-helix-roman-snail-260nw-705845932.jpg');
        // link.setAttribute('download', "nature.jpg");
    
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
  //       const downloadLink = document.createElement('a');
  //  downloadLink.download = "file.png";
  //  downloadLink.href = "https://image.shutterstock.com/image-photo/burgundy-snails-helix-roman-snail-260nw-705845932.jpg";
  //  downloadLink.click();
        this.getDealers();
			})
      }
      else{
        this.toastr.warning("Uploaded CSV doesn't match with template CSV!");
      }
      
    }
  }
  updateDealerStatus(status: any, dealer_id: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      
      'status': status,
      'dealer_id': dealer_id
    }
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure ?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) {
        this.service.updateDealerStatus(data).subscribe((res) => {
          this.toastr.success('Dealer status updated!');
          this.getDealers();
        });
      }
    })
  }
  searchFilterDealer(){


    let data = {
      
      "startDate": this.dealerSearchFilterForm.controls['startDate'].value,
      "endDate": this.dealerSearchFilterForm.controls['endDate'].value,
      "dealerNameID": this.dealerSearchFilterForm.controls['dealerNameID'].value,
      "phoneNumber":this.dealerSearchFilterForm.controls['dealerPhoneNumber'].value,
      "city":this.selectedCityName,
      "state": this.selectedStateName,
      "location": this.dealerSearchFilterForm.controls['dealerLocation'].value,
      "country": this.selectedCountryName,
     

    }

    this.service.searchFilterDealer(data).subscribe((res) => {
      this.dealerList = res.data;
      this.dataSource = new MatTableDataSource<any>(this.dealerList);
      this.dataSource.paginator = this.paginator;

    },
    
    (err ) =>
     {
  
      if(err == "Data Not Found"){
        this.dealerList=undefined;
        this.dataSource = new MatTableDataSource<any>(this.dealerList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      
      }
      else if(err == "Internal server error")
      this.toastr.warning("Internal server error!");  
      else
      this.toastr.warning("Oops...Something went wrong!");       
     });


  }
  downloadTemplateCSV(){
    this.service.downloadTemplateCSV().subscribe((res) => {
      this.templateData = res.data;
      this.path=this.templateData
      this.path = this.url+this.path;
    });
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
  resetSearchFilter(){
    this.dealerSearchFilterForm.reset();
    this.selectedCityName="";
    this.selectedStateName="";
    this.selectedCountryName="";
    this.cityList=undefined;
    this.stateList=undefined;
    this.initForm();
    this.getDealers();
  }
  deleteDealer(customerId: any) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: 'Are you sure you want to delete?'
    })
    dialogRef.afterClosed().subscribe((showSnackBar: boolean) => {
      if (showSnackBar) this.requestDelete(customerId);
    })
  }
  requestDelete(dealerId: any) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let data = {
      'user_id': user_id,
      'token': token,
      'dealerID': dealerId,
   
    }
    console.log("obj", data);
    this.service.deleteDealer(dealerId).subscribe((res) => {
      this.toastr.success('Dealer Deleted!');
      
      this.getDealers();
    });
  }

}
export interface Element {
  date: string;
  dealer_id: string;
  dealer_name: string;
  phone_number: string;
  location: string;
  country: string;
  city: string;
}

// const ELEMENT_DATA: Element[] = [
//   {date: "26-11-2021", dealer_id: '23232', dealer_name: 'Timothy Kroon', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "25-10-2021", dealer_id: '23232', dealer_name: 'Ryan Noude', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "16-10-2021", dealer_id: '23232', dealer_name: 'Gerald Johns', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "4-6-2021", dealer_id: '23232', dealer_name: 'Doug Crawford', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "5-9-2021", dealer_id: '23232', dealer_name: 'Sheldon Lyne', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "26-11-2021", dealer_id: '23232', dealer_name: 'Timothy Kroon', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "26-11-2021", dealer_id: '23232', dealer_name: 'Timothy Kroon', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "26-11-2021", dealer_id: '23232', dealer_name: 'Timothy Kroon', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},
//   {date: "26-11-2021", dealer_id: '23232', dealer_name: 'Timothy Kroon', phone_number: '+27 87 150 1501',location:'Park Suites',country:'Kenya',city:'Nairobi'},


// ];
export class User {
  id: number;
  name: String;
  lastName: String;

  constructor(id: number, name: String, lastName: String) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
  }
}
export class Dealer {
  first_name: String;
  last_name: String;
  phone_number: String;
  email: String;
  address: String;
  city: String;
  dob: String;
  zipcode: String;


  constructor(first_name: String, last_name: String, phone_number: String, email: String, address: String, city: String, dob: String, zipcode: String) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.email = email;
    this.address = address;
    this.city = city;
    this.dob = dob;
    this.zipcode = zipcode;
  }
}

