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
  constructor(
    public employeesService: EmployeesService,
    public fb: FormBuilder,
    public dialogRef: MatDialog
  ) {}

  type = this.fb.group({
    search: [''],
  });

  ngOnInit() {
    // debugger
    // if (this.employeesService.employeesArray.length > 0) {
    //   this.employeesService.employeesArray = [];
    // } else {
    //   this.employeesService.employeesArray = JSON.parse(
    //     localStorage.getItem('employee') as any
    //   );
    //   console.log(localStorage)
    // }

    this.employeesService.employeesArray = JSON.parse(
      localStorage.getItem('employee') as any
    );
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

  filterData() {
    // debugger;
    // const searchText = this.type.controls.search.value;
    // this.employeesService.employeesArray =
    //   this.employeesService.employeesArrayCopy.filter(
    //     (x: any) =>
    //       x.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
    //       x.cnic.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    //   );
  }
}
