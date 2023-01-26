import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeQualComponent } from '../employee-qual/employee-qual.component';
import { EmployeepopupComponent } from '../employeepopup/employeepopup.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  QualLeng: any;
  length: number = 0;
  constructor(
    public employeesService: EmployeesService,
    public fb: FormBuilder,
    public dialogRef: MatDialog,
  ) { }

  type = this.fb.group({
    filter: [''],
    select: ['']
  });

  ngOnInit() {
    // debugger
    this.employeesService.employeesArray = JSON.parse(
      localStorage.getItem('employee') as any
    );
    this.employeesService.employeesArrayCopy= this.employeesService.employeesArray
    console.log(this.employeesService.employeesArray)
  }

  addNewEmployee(data: any, isEdit: boolean, index: number) {
    this.dialogRef.open(EmployeepopupComponent, {
      width: '400px',
      height: '400px',
      data: {
        data: data,
        isEdit: isEdit,
        index: index,
      },
    });
  }

  deleteEmployee(empID: number, index: number) {
    if (this.employeesService.employeesArray.length >= 0) {
      this.employeesService.employeesArray.splice(index, 1);
      console.log(this.employeesService.employeesArray);
    } else {
      console.log('Employee not found');
    }
  }

  addQualification(data: any,   index: number) {
    this.dialogRef.open(EmployeeQualComponent, {
      width: '600px',
      height: '600px',
      data: {
        data: data,
        index: index,
      },
    });
  }

  onfilterChange() {
    // debugger
    var filterValue = this.type.controls.filter.value == null ? '' : this.type.controls.filter.value;
    this.employeesService.employeesArrayCopy =
      this.employeesService.employeesArray.filter(
        (x: any) =>
          (x.name !== null && x.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) ||
          (x.name !== null && x.cnic.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0)
      );
  }

//   countQual(index: number){
//  debugger
//  this.length=this.employeesService.employeesArray[index].QualArray.length
//     console.log("Index COunt"+this.length)
//   }

// onLengthChange(length: number) {
//   this.length = length;
// }
}
