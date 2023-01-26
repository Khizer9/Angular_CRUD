import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.css'],
})
export class AddCertificateComponent implements OnInit {
  CertArray: any[] = [];
  isEdit: boolean = false;
  certIndex: number = 0;
  constructor(
    public fb: FormBuilder,
    public employeeService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public certObj: any
  ) {}

  ngOnInit() {
    // this.employeeService.employeesArray[this.certObj.index].QualArray[
    //   this.certObj.index
    // ].CertArray= JSON.parse(localStorage.getItem('cert') as any)
  }

  type = this.fb.group({
    certName: [''],
    speciality: [''],
    institute: [''],
  });

  initForm() {
    this.type = this.fb.group({
      certName: [''],
      speciality: [''],
      institute: [''],
    });
  }
  addCert() {
    if (!this.isEdit) {
      this.employeeService.employeesArray[this.certObj.index].QualArray[
        this.certObj.index
      ].CertArray =
        this.employeeService.employeesArray[this.certObj.index].QualArray[
          this.certObj.index
        ].CertArray || [];
      this.employeeService.employeesArray[this.certObj.index].QualArray[
        this.certObj.index
      ].CertArray.push({
        certName: this.type.controls.certName.value,
        speciality: this.type.controls.speciality.value,
        institute: this.type.controls.institute.value,
      });
    } else {
      if (this.certObj.index >= 0) {
        this.employeeService.employeesArray[this.certObj.index].QualArray[
          this.certObj.index
        ].CertArray[this.certIndex] = {
          certName: this.type.controls.certName.value,
          speciality: this.type.controls.speciality.value,
          institute: this.type.controls.institute.value,
        };
      } else {
        console.log('Error Edit');
      }
    }
    this.initForm();
    // localStorage.setItem('cert', JSON.stringify(this.employeeService.employeesArray[this.certObj.index].QualArray[
    //   this.certObj.index
    // ].CertArray))
  }

  editCert(index: number) {
    this.isEdit = true;
    this.certIndex = index;
    this.type.patchValue(
      this.employeeService.employeesArray[this.certObj.index].QualArray[
        this.certObj.index
      ].CertArray[index]
    );
  }

  delCert(index: number) {
    if(this.employeeService.employeesArray[this.certObj.index].QualArray[this.certObj.index].CertArray.length >= 0){
      this.employeeService.employeesArray[this.certObj.index].QualArray[
        this.certObj.index
      ].CertArray.splice(index, 1);
    }else{
      console.log('Error Delete');
    }
  
  }
}
