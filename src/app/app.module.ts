import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CityComponent } from './components/city/city.component';
import { AreaComponent } from './components/area/area.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';    
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule} from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { AreapopupComponent } from './components/areapopup/areapopup.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeepopupComponent } from './components/employeepopup/employeepopup.component';
import { EmployeeQualComponent } from './components/employee-qual/employee-qual.component';
import { AddCertificateComponent } from './components/add-certificate/add-certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityComponent,
    AreaComponent,
    FilterPipe,
    PopupComponent,
    AreapopupComponent,
    EmployeesComponent,
    EmployeepopupComponent,
    EmployeeQualComponent,
    AddCertificateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent, AreapopupComponent,AddCertificateComponent],
})
export class AppModule {}
