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
  submitted: boolean = false;
  constructor(
    public cityApi: CityApiService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataObj: any
  ) {}
  type = this.fb.group({
    CityID: [0],
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
    this.submitted = true;
    if(this.type.invalid){
      return;
    } else{
  if (this.dataObj.isEdit) {
      this.cityApi.updateCities(this.type.value,this.type.controls.CityID.value as number);
    }
    else{
      this.cityApi.addCities(this.type.value);
    }
    }
  
  }
  updateData() {
    this.type.patchValue(this.dataObj.selectedCity);
  }
  
}
