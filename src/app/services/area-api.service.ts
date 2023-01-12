import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AreaApiService {
  // areas: any[]=[];
  areasCopy: any[]=[];
  response: any;
  city: any;

  areasArray:any[]= [];

  constructor(private http: HttpClient) {
  }
 getData(){

 }

  // getAllAreas() {
  //   this.http.get('http://localhost:5000/api/v2.0/area').subscribe((data) => {
  //     this.areas = data;
  //     this.areasCopy = this.areas;
  //     console.log(this.areas);
  //   },(error) => console.log(error));
  // }

  getCity(){
    this.http.get('http://localhost:5000/api/v2.0/city').subscribe((data)=>{
      this.city = data;
      console.log(this.city);
    })
  }

  // addAreas(data: any) {
  //   this.http
  //     .post('http://localhost:5000/api/v2.0/area', data)
  //     .subscribe((result) => {
  //       console.log(result);
  //       this.response = result;
  //       alert('Successfully added');
  //       this.getAllAreas();
  //       // console.log(this.response);
  //     });
  // }

  // updateAreas(data: any, areaID: number) {
  //   this.http
  //     .put('http://localhost:5000/api/v2.0/area/' + areaID, data)
  //     .subscribe((result) => {
  //       alert('Successfully updated');
  //       this.getAllAreas();
  //       console.log(result);
  //     });
  // }

  // deleteAreas(areaID: number) {
  //   this.http
  //     .delete('http://localhost:5000/api/v2.0/area/' + areaID)
  //     .subscribe((data) => {
  //       alert('Successfully deleted');
  //       this.getAllAreas();
  //       console.log(data);
  //     });
  // }

}
