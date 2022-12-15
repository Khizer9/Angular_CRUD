import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityApiService } from 'src/app/services/city-api.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent {
  cities: any;
  constructor(public cityApi: CityApiService, private dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.cityApi.getLocalProvince();
    this.cityApi.getCities();
  }

  addNewCity(cityObj: any, isEdit: boolean) {
    this.dialogRef.open(PopupComponent, {
      height: '500px',
      width: '500px',
      data: {
        selectedCity: cityObj,
        isEdit: isEdit
      }
    });
  }
}

export class City {
  cityID: number = 0;
  province_StateID: number = 0;
  name: string = '';
  shortDesc?: string;
  active: boolean = false;
}
