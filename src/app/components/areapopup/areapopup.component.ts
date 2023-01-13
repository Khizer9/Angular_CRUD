import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaApiService } from 'src/app/services/area-api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-areapopup',
  templateUrl: './areapopup.component.html',
  styleUrls: ['./areapopup.component.css'],
})
export class AreapopupComponent implements OnInit {
  submitted: boolean = false;
  // onDelete: any;
  constructor(
    public areaApi: AreaApiService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public areaObj: any
  ) {}

  areaForm = this.fb.group({
    areaID: [0],
    cityID: ['', Validators.required],
    name: ['', Validators.required],
    shortDesc: [''],
    active: [false],
  });

  ngOnInit(): void {
    if (this.areaObj.isEdit) {
      this.updateData();
      this.areaForm.controls.cityID.setValue(this.areaObj.selectedArea.cityID);
    } else {
      return;
    }
  }

  initForm() {
    this.areaForm = this.fb.group({
      areaID: [0],
      cityID: ['', Validators.required],
      name: ['', Validators.required],
      shortDesc: [''],
      active: [false],
    });
  }

  saveData() {
    debugger;
    if (!this.areaObj.isEdit) {
      this.areaApi.areasArray.push({
        areaID: this.areaApi.areasArray.length + 1,
        name: this.areaForm.controls.name.value,
        shortDesc: this.areaForm.controls.shortDesc.value,
        active: this.areaForm.controls.active.value,
        cityID: this.areaForm.controls.cityID.value,
      });
      console.log(this.areaApi.areasArray);
    } else {
      const index = this.areaApi.areasArray.findIndex(
        (area) => area.areaID == this.areaForm.controls.areaID.value
      );
      if (index !== -1) {
        this.areaApi.areasArray[index] = {
          areaID: this.areaForm.controls.areaID.value,
          name: this.areaForm.controls.name.value,
          shortDesc: this.areaForm.controls.shortDesc.value,
          active: this.areaForm.controls.active.value,
          cityID: this.areaForm.controls.cityID.value,
        };
        console.log(this.areaApi.areasArray[index]);
        console.log(this.areaApi.areasArray);
      } else {
        console.log('Area not found');
      }
    }

    this.initForm();
    localStorage.setItem('area', JSON.stringify(this.areaApi.areasArray));
    console.log(localStorage);

    // this.areaApi.getData();
    // console.log(this.areaApi.getData());
    // this.submitted = true;
    // if (this.areaForm.invalid) {
    //   return;
    // } else {
    // if (this.areaObj.isEdit) {
    //   // this.areaApi.updateAreas(
    //   //   this.areaForm.value,
    //   //   this.areaForm.controls.AreaID.value as any
    //   // );
    // } else this.areaApi.addAreas(this.areaForm.value);
  }

  deleteArea() {
    this.areaApi.deleteArea(this.areaForm.controls.areaID.value);
  }

  updateData() {
    this.areaForm.patchValue(this.areaObj.selectedArea);
  }
}
