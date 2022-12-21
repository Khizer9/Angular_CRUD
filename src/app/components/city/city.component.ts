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
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent {
  // @ViewChild('paginator') paginator: MatPaginator;
  cityPerPage: number = 4;
  cities: any;
  selectedPage: any = 1;
  products: any;
  constructor(public cityApi: CityApiService, private dialogRef: MatDialog) {
    // this.searchForm
    //   .get('search')
    //   ?.valueChanges.subscribe(() => this.cityApi.cities);
  }

  dataSource = new MatTableDataSource(this.cityApi.cities);

  // pageStart: number = 1;
  // pageEnd: number = 5
  // itemPerPage = 5;

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.cityApi.getLocalProvince();
    this.cityApi.getCities();

    let pageIndex = (this.selectedPage - 1) * this.cityPerPage;
    this.products = this.cityApi.citiesCopy.slice(pageIndex, this.cityPerPage)
    // this.totalLength = this.cities.length;
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

  // firstPage() {
  //   this.cityApi.cities.splice(5);

  // }

  // nextPage() {
  //   if (this.itemPerPage) {

  //   }
  // }
  get pageNumbers() {
    return Array(Math.ceil(this.cityApi.citiesCopy.length / this.cityPerPage))
    
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: any){
    this.selectedPage = page;
    this.slicedCity();
  }

  slicedCity(){
    let pageIndex = (this.selectedPage - 1) * this.cityPerPage;
    let endIndex = (this.selectedPage - 1) * this.cityPerPage + this.cityPerPage;
    this.products = [];
    this.cityApi.cities = this.cityApi.citiesCopy.slice(pageIndex, endIndex);
  }

  changePerSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.cityPerPage = Number(newSize);
    this.changePage(1);
  }
}

export class City {
  cityID: number = 0;
  province_StateID: number = 0;
  name: string = '';
  shortDesc?: string;
  active: boolean = false;
}
