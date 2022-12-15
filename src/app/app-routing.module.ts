import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { AreaComponent } from './components/area/area.component';
import { SubAreaComponent } from './components/sub-area/sub-area.component';


const routes: Routes = [
  {path: "city", component: CityComponent},
  {path: "area", component: AreaComponent},
  {path: "subarea", component: SubAreaComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
