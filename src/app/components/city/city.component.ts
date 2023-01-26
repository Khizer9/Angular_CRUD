import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CityApiService } from 'src/app/services/city-api.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent {
  cityPerPage: number = 4;
  // cities: any;
  selectedPage: any = 1;
  products: any;
  constructor(
    public cityApi: CityApiService,
    private dialogRef: MatDialog,
    public fb: FormBuilder
  ) {}
  searchForm = this.fb.group({
    filter: [''],
  });

  dataSource = new MatTableDataSource(this.cityApi.cities);


 

  ngOnInit(): void {
    this.cityApi.getLocalProvince();
    this.cityApi.getCities();

    let pageIndex = (this.selectedPage - 1) * this.cityPerPage;
  }

  addNewCity(cityObj: any, isEdit: boolean) {
    this.dialogRef.open(PopupComponent, {
      height: '500px',
      width: '500px',
      data: {
        selectedCity: cityObj,
        isEdit: isEdit,
      },
    });
  }

  get pageNumbers() {
    return Array(Math.ceil(this.cityApi.citiesCopy.length / this.cityPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: any) {
    this.selectedPage = page;
    this.slicedCity();
  }

  slicedCity() {
    let pageIndex = (this.selectedPage - 1) * this.cityPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.cityPerPage + this.cityPerPage;
    this.products = [];
    this.cityApi.cities = this.cityApi.citiesCopy.slice(pageIndex, endIndex);
  }

  changePerSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.cityPerPage = Number(newSize);
    this.changePage(1);
  }

  filterCity() {
    var searchText = this.searchForm.controls.filter.value == null ? '' : this.searchForm.controls.filter.value

    this.cityApi.cities = this.cityApi.citiesCopy.filter(
      (x: any) =>
        (x.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
        x.shortDesc.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 )
    );
  }
}

export class City {
  cityID: number = 0;
  province_StateID: number = 0;
  name: string = '';
  shortDesc?: string;
  active: boolean = false;
}
