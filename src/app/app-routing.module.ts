import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { AreaComponent } from './components/area/area.component';
import { EmployeesComponent } from './components/employees/employees.component';


const routes: Routes = [
  {path: "city", component: CityComponent},
  {path: "area", component: AreaComponent},
  {path: "employees", component: EmployeesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
