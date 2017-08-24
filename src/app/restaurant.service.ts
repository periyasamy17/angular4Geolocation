import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
@Injectable()
export class RestaurantService {

  constructor(private http: Http) { }

restaurantPlaceApi(lat,lan){

console.log(lan,lat,"asdads")
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lan+'&radius=500&type=restaurant&keyword=cruise&key=AIzaSyBS5VM_9o7FKZYe2kzmxQ_s5sxxtCzCm8c',{headers:headers})
			.map(res => res.json())
			.catch(this.handleError);
}

	public handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}

}
