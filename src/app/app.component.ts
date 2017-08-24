import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { RestaurantService } from './restaurant.service' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public formatted_address:string;
  public noresluts:string;
  public rstaurantname;
  public rstaurantnameList:boolean;
  public title:string;
   @ViewChild("search")
  public searchElementRef: ElementRef;
  public res;
  

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public restaurantservice:RestaurantService
   
  ) {}

  ngOnInit() {
    this.title = "Google maps nearby Rstaurantname "
    //set google maps defaults Bangalore is a Current Location
    this.zoom = 14;
    this.latitude = 12.9207073;
    this.longitude = 77.580643;
     this.restaurantPlaceApicall(this.latitude,this.longitude);
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
    // this.restaurantPlaceApicall(this.latitude,this.longitude);


    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.formatted_address = place.formatted_address;
         
          this.restaurantPlaceApicall(this.latitude,this.longitude); 
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
//call service 
public restaurantPlaceApicall(lat,lan){
  console.log(lat,lan)
  this.restaurantservice.restaurantPlaceApi(lat,lan).subscribe(
    data => {
      this.res = data;
      console.log(this.res.results.length,"Result");
      if(this.res.results.length>0){
         this.rstaurantnameList = true;
          }else{
            this.rstaurantnameList = false;
          }
      if(this.res.results){
       for(var i = 0; i < this.res.results.length; i ++ ){
         this.rstaurantnameList = true;
         alert("Hello");
        this.rstaurantname = this.res.results[i].name;
        this.formatted_address = this.res.results[i].vicinity;

      }
      }
    }
  ),
 error => {console.log(error)},
			 () => console.log('Google Place API called.')

}


}
