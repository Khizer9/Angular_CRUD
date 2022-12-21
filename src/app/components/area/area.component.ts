import { Component } from '@angular/core';
import { AreaApiService } from 'src/app/services/area-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AreapopupComponent } from '../areapopup/areapopup.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent {
  productPerPage: any;
  public selectedPages = 1;
  products: any;

  constructor(public areaApi: AreaApiService, public dialogRef: MatDialog) {}
  // firstPage: any;
  // lastPage: any;
  // currentPage: any;
  // totalPages: any;

  ngOnInit() {
    this.areaApi.getAllAreas();
    this.areaApi.getCity();

    let pageIndex = (this.selectedPages - 1) * this.productPerPage;
    this.products = this.areaApi.areas.slice(pageIndex, this.productPerPage);
  }

  addNewArea(areaObj: any, isEdit: boolean) {
    this.dialogRef.open(AreapopupComponent, {
      height: '400px',
      width: '400px',
      data: {
        selectedArea: areaObj,
        isEdit: isEdit,
      },
    });
  }

  // page(data: any){
  //   this.firstPage = this.currentPage -4;
  //   this.lastPage = this.currentPage +4;
  //   if(this.currentPage <= 0){
  //     this.lastPage -= (this.firstPage - 1);
  //     this.firstPage = 1;
  //   }
  //   if(this.lastPage > this.totalPages){
  //     this.lastPage = this.totalPages
  //   }

  //   if(this.firstPage > 1) {
  //     console.log("First page")
  //   }
  //   for(let i = this.firstPage; i <= this.lastPage; i++){
  //    console.log (i + " " + this.currentPage)
  //   }
  //   if(this.lastPage < this.totalPages){
  //     console.log("Last page")
  //   }
  // }

  changePerSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.productPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers() { 
    return Array(Math.ceil(this.areaApi.areasCopy.length / this.productPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPages = page;
    this.slicedProducts();
  }

  slicedProducts() {
    debugger
    let pageIndex = (this.selectedPages - 1) * this.productPerPage;
    let endIndex =
      (this.selectedPages - 1) * this.productPerPage + this.productPerPage;
    this.products = [];
    this.areaApi.areas = this.areaApi.areasCopy.slice(pageIndex, endIndex);
  }
}
