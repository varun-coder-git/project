import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { ToggleButtonGlobalVariable } from 'src/app/services/toggle-button-global-variable';
import { GlobalVariable } from 'src/app/services/global-variable.service';

@Component({
  selector: 'app-sidenav-navbar',
  templateUrl: './sidenav-navbar.component.html',
  styleUrls: ['./sidenav-navbar.component.scss']
})
export class SidenavNavbarComponent implements OnInit {
  showBigHeader: boolean;
  showSmallHeader: boolean;
  userName:any;
  someLatValue = 18.782551;
  desiredRadiusInMeters = 3500;
  profilePicture:any;
   map:any; heatmap:any;
  lat:any;coordinateList:any;
  lng:any;currentLocation:any="NA";isSpinnerShow=true;
   //map: google.maps.Map ;
  //heatmap: google.maps.visualization.HeatmapLayer;
  url="https://ss2.equationswork.us:3001/";
  cardUrl="https://ss2.equationswork.us:3001";
  dashboardCardsData:any;
  constructor(private globalService:GlobalVariable,private router: Router, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
   this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.getDashboardAnalytics();
   // this.initMap();
   this.get();
   this.getCoordinates();
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
 createCMSUser(){
   
    const dialogRef = this.dialog.open(HeaderComponent, {
      width: '70%',
      maxHeight: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  getCoordinates() {

    this.service.genuinityHeatmap().subscribe((res) => {
      this.isSpinnerShow=false;
  
      this.coordinateList = res.data;
  
      
    
  
    }
    ,
    
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
     });
  
  
  }

  get() {  
    let getAddress:any;
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition((position: any) => {  
            if (position) {  
                this.lat = position.coords.latitude;  
                this.lng = position.coords.longitude;  
               getAddress = (this.lat, this.lng)  
                console.log(position.coords.latitude);
                this.lat=position.coords.latitude;
                this.lng=position.coords.longitude;
               console.log(getAddress)
               
                    let geocoder = new google.maps.Geocoder;  
                    let latlng = {  
                        lat: this.lat,  
                        lng: this.lng  
                    };  
                    geocoder.geocode({  
                        'location': latlng  
                    }, (results) => {  
                        if (results[0]) {  
                            this.currentLocation = results[0].formatted_address;  
                            console.log(this.currentLocation);  
                        } else {  
                          this.currentLocation="NA"
                            console.log('Not found');  
                        }  
                    });  
                
            }  
        })  
    }  
} 
  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance;

    // here our in other method after you get the coords; but make sure map is loaded

    const coords: google.maps.LatLng[]=this.getPoints(); // can also be a google.maps.MVCArray with LatLng[] inside  
//     this.heatmap.setOptions({radius: this.getHeatmapRadius()});
// this.heatmap.setMap(this.map); 
    this.heatmap = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: coords,
        radius:70,
        
    });

    
  const infowindow = new google.maps.InfoWindow({
    content: "hello",
  });

  this.coordinateList.addListener("click", () => {
    infowindow.open();
  });
}



 getHeatmapRadius(){
  let metersPerPx = 156543.03392 * Math.cos(this.someLatValue * Math.PI / 180) / Math.pow(2,this.map.getZoom());
  return this.desiredRadiusInMeters / metersPerPx;
//  this.coordinateList.addListener("click", () => {
//     infowindow.open(marker.get("map"), marker);
//   });
};

 getPoints() {
  let coords:google.maps.LatLng[]=[];
  for(let i=0;i<this.coordinateList.length;i++){
      coords.push(new google.maps.LatLng(this.coordinateList[i].latitude, this.coordinateList[i].longitude))
  }
  console.log("cooords",coords)
  return coords;
  // return [
  //   new google.maps.LatLng(18.79, 76.545368),new google.maps.LatLng(18.782551, 76.445368),
  //   new google.maps.LatLng(19.782745, 77.444586),
  //   new google.maps.LatLng(17.782551, 71.445368),
  //   new google.maps.LatLng(18.782745, 74.444586),
  //   new google.maps.LatLng(18.782551, 26.445368),
  //   new google.maps.LatLng(19.782745, 97.444586),
  // ];
}
  getDashboardAnalytics(){
    this.service.getDashboardAnalytics().subscribe((res) => {
      this.isSpinnerShow=false;
     this.dashboardCardsData=res.data;
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
}
