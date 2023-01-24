import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';
import { AddCertificateComponent } from '../add-certificate/add-certificate.component';

@Component({
  selector: 'app-employee-qual',
  templateUrl: './employee-qual.component.html',
  styleUrls: ['./employee-qual.component.css'],
})
export class EmployeeQualComponent implements OnInit {
  years: any = [];
  QualArray: any=[];
  qualIndex: number = 0;
  isEdit: boolean = false;
  // qualification: any;

  constructor(
    public employeeService: EmployeesService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public qualObj: any,
    public dialogRef: MatDialog
  ) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }
  type = this.fb.group({
    qual: [''],
    year: [''],
    institute: [''],
  });

  initForm() {
    this.type = this.fb.group({
      qual: [''],
      year: [''],
      institute: [''],
    });
  }

  addQual() {
    debugger;
    if (!this.isEdit) {
      if (this.employeeService.employeesArray[this.qualObj.index]) {
        this.employeeService.employeesArray[this.qualObj.index].QualArray =
          this.employeeService.employeesArray[this.qualObj.index].QualArray ||
          [];
        this.employeeService.employeesArray[this.qualObj.index].QualArray.push({
          qual: this.type.controls.qual.value,
          year: this.type.controls.year.value,
          institute: this.type.controls.institute.value,
        });
      } else {
        console.log('Object not found at index');
      }
      console.log(this.employeeService.employeesArray);
    } else {
      if (this.qualObj.index >= 0) {
        this.employeeService.employeesArray[this.qualObj.index].QualArray[
          this.qualIndex
        ] = {
          qual: this.type.controls.qual.value,
          year: this.type.controls.year.value,
          institute: this.type.controls.institute.value,
        };
      } else {
        console.log('Not found at index');
      }

      console.log(this.employeeService.employeesArray);
    }
    this.initForm();
    this.isEdit = false;
    // debugger
    // localStorage.setItem(
    //   'qual',
    //   JSON.stringify(this.employeeService.employeesArray[index].QualArray)
    // );
  }
  editQual(index: number) {
    this.isEdit = true;
    this.qualIndex = index;
    this.type.patchValue(
      this.employeeService.employeesArray[this.qualObj.index].QualArray[index]
    );
  }

  deleteQual(index: number) {
    if (
      this.employeeService.employeesArray[this.qualObj.index].QualArray
        .length >= 0
    ) {
      this.employeeService.employeesArray[this.qualObj.index].QualArray.splice(
        index,
        1
      );
    } else {
      console.log('Error');
    }
  }

  addCertificate(data: any, index: number)  {
    this.dialogRef.open(AddCertificateComponent, {
      width: '400px',
      height: '400px',
      data: {
        data: data,
        index: index
      },
    });
  }
}
