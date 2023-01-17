import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(public http:HttpClient) { }

  employeesArray: any[] = []
  employeesArrayCopy: any[]=[]
  employeesQualificationCopy: any[]= [];
  employeesQualification: any[]=[] =[{
    id: '1',
    qual: 'Matric',
    year: '',
    institute: 'Parsi school',
 
  }, {
    id: '2',
    qual: 'Intermediate',
    year: '',
    institute: 'Islamia college'
  },{
    id: '3',
    qual: 'Bachelors',
    year: '',
    institute: 'Aga khan uni'
  }]

}
