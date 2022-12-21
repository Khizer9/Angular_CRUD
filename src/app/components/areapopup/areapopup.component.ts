import { Component, Inject } from '@angular/core';
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
  constructor(
    public areaApi: AreaApiService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public areaObj: any
  ) {}

  areaForm = this.fb.group({
    AreaID: [0],
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

  areaData() {
    this.submitted = true;
    if (this.areaForm.invalid) {
      return;
    } else {
      if (this.areaObj.isEdit) {
        this.areaApi.updateAreas(
          this.areaForm.value,
          this.areaForm.controls.AreaID.value as any
        );
      } else this.areaApi.addAreas(this.areaForm.value);
    }
  }

  updateData() {
    this.areaForm.patchValue(this.areaObj.selectedArea);
  }
}
