import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employeepopup',
  templateUrl: './employeepopup.component.html',
  styleUrls: ['./employeepopup.component.css'],
})
export class EmployeepopupComponent {
  submitted: boolean = false;
  constructor(
    public fb: FormBuilder,
    public employeeService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public employeeObj: any
  ) {}

  ngOnInit() {
    this.type.patchValue(this.employeeObj.data);
  }

  type = this.fb.group({
    empID: [0],
    name: ['', Validators.required],
    cnic: ['', Validators.required],
    contact: ['', Validators.required],
    address: ['', Validators.required],
  });
  initForm() {
    this.type = this.fb.group({
      empID: [0],
      name: ['', Validators.required],
      cnic: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  saveData() {
    // this.submitted = true;
    if (this.type.invalid) {
      return
    } else {
      if (!this.employeeObj.isEdit) {
        this.employeeService.employeesArray = this.employeeService.employeesArray || [];
        this.employeeService.employeesArray.push({
          empID: this.employeeService.employeesArray.length + 1,
          name: this.type.controls.name.value,
          cnic: this.type.controls.cnic.value,
          contact: this.type.controls.contact.value,
          address: this.type.controls.address.value,
        });
        console.log(this.employeeService.employeesArray);
      } else {
        if (this.employeeObj.index >= 0) {
          this.employeeService.employeesArray[this.employeeObj.index] = {
            empID: this.type.controls.empID.value,
            name: this.type.controls.name.value,
            cnic: this.type.controls.cnic.value,
            contact: this.type.controls.contact.value,
            address: this.type.controls.address.value,
          };
          console.log(this.employeeService.employeesArray);
          console.log(
            this.employeeService.employeesArray[this.employeeObj.index]
          );
        } else {
          console.log('Employee not found');
        }
        console.log(this.employeeService.employeesArray);
      }
      localStorage.setItem(
        'employee',
        JSON.stringify(this.employeeService.employeesArray)
      );
      this.initForm();
    }
  }
}
