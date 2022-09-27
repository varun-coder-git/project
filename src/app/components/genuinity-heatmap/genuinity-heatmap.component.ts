import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalVariable } from 'src/app/services/global-variable.service';

@Component({
  selector: 'app-genuinity-heatmap',
  templateUrl: './genuinity-heatmap.component.html',
  styleUrls: ['./genuinity-heatmap.component.scss']
})

export class GenuinityHeatmapComponent implements OnInit {
  userName:any;
  showBigHeader: boolean;
  showSmallHeader: boolean;
  profilePicture:any;coordinates:any;
  url="https://ss2.equationswork.us:3001/";
  lat :any;coordinateList:any;isSpinnerShow=true;
  lng:any;currentLocation:any="NA";
  latLngBounds:{
    north: 85.0, 
    south: -85.0, 
    west: -180.0, 
    east: 180.0
  }
  map:any; heatmap:any;
  someLatValue = 18.782551;
  desiredRadiusInMeters = 3500;
  constructor( private globalService:GlobalVariable,private router: Router, private service: ApiService, private dialog: MatDialog, private toastr: ToastrService) {
  
   }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userName = localStorage.getItem('userName');
    this.profilePicture = localStorage.getItem('profilePicture');
    this.showBigHeader = this.globalService.showBigHeader;
    this.showSmallHeader = this.globalService.showSmallHeader;
    // this.geoLocationService.getPosition().subscribe(
    //   (pos: any) => {
    //       this.coordinates = {
    //         latitude:  +(pos.coords.latitude),
    //         longitude: +(pos.coords.longitude)
    //       };
    //   });
  this.get();
 this.getCoordinates();
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
                // this.apiloader.load().then(() => {  
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
                            // console.log(this.assgin);  
                        } else {  
                            console.log('Not found');  
                        }  
                    });  
                // });  
            }  
        })  
    }  
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
}
  getHeatmapRadius(){
    let metersPerPx = 156543.03392 * Math.cos(this.someLatValue * Math.PI / 180) / Math.pow(2,this.map.getZoom());
    return this.desiredRadiusInMeters / metersPerPx;
  };

   getPoints() {
   
     let coords:google.maps.LatLng[]=[];
    for(let i=0;i<this.coordinateList.length;i++){
        coords.push(new google.maps.LatLng(this.coordinateList[i].latitude, this.coordinateList[i].longitude))
    }
    console.log(coords)
    return coords;
    // return [

    //  //  new google.maps.LatLng(18.79, 76.545368),
    //   //new google.maps.LatLng(18.782551, 76.445368),
    //   // new google.maps.LatLng(19.782745, 77.444586),
    //   // new google.maps.LatLng(17.782551, 71.445368),
    //   // new google.maps.LatLng(18.782745, 74.444586),
    //   // new google.maps.LatLng(18.782551, 26.445368),
    //   // new google.maps.LatLng(19.782745, 97.444586),
     
    // ];
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
