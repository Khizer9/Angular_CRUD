import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../components/city/city.component';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {
  cities: City[] = [];
  localProvince: any;
  reponse: any;
  citiesCopy: any;
  constructor(private http: HttpClient) {}

  getCities() {
    this.http.get('http://localhost:5000/api/v2.0/city').subscribe(
      (data) => {
        this.cities = data as City[];
        this.citiesCopy = this.cities
        console.log(this.cities);
      },
      (error) => {
        alert(error);
      }
    );
  }
  getLocalProvince() {
    this.http
      .get('http://localhost:5000/api/v2.0/province_state')
      .subscribe((data) => {
        this.localProvince = data as string;
        // console.log(this.localProvince);
      });
  }

  addCities(data: any) {
    this.http
      .post('http://localhost:5000/api/v2.0/city', data)
      .subscribe((result: any) => {
        this.reponse = result
        alert('Saved');
        this.getCities();
        console.log(result);
      });
  }

  updateCities(data: any, cityId: number) {
    this.http
      .put('http://localhost:5000/api/v2.0/city/' + cityId, data)
      .subscribe((result: any) => {
        alert('Updated');
        this.getCities();
        console.log(result);
      });
  }

  deleteCities(cityId: number) {
    this.http
      .delete('http://localhost:5000/api/v2.0/city/' + cityId)
      .subscribe((result: any) => {
        alert('Deleted');
        this.getCities();
        console.log(result);
      });
  }
}
