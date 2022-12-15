import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityApiService } from 'src/app/services/city-api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  constructor(
    public cityApi: CityApiService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataObj: any
  ) {}
  type = this.fb.group({
    cityID: [0],
    province_StateID: ['', Validators.required],
    name: ['', Validators.required],
    shortDesc: [''],
    active: [false],
  });
  ngOnInit() {
    if (this.dataObj.isEdit) {
      this.updateData();
    }else{
      return;
    }
  }

  addCityData() {
    if (this.dataObj.isEdit) {
      this.cityApi.updateCities(this.type.value,this.type.controls.cityID.value as number);
    }
    else{
      this.cityApi.addCities(this.type.value);
    }
  }
  updateData() {
    this.type.patchValue(this.dataObj.selectedCity);
  }
  
}
