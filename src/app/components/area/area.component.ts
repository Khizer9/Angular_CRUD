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
  productPerPage: any=5;
  public selectedPages = 1;
  products: any;
  

  constructor(public areaApi: AreaApiService, public dialogRef: MatDialog) {}
  // firstPage: any;
  // lastPage: any;
  // currentPage: any;
  // totalPages: any;

  ngOnInit() {
    this.areaApi.deleteAreaObj.subscribe((areaID)=> {
      this.deleteArea(areaID);
    })
    if(this.areaApi.areasArray.length > 0){
      this.areaApi.areasArray = []; 
  }else{
    this.areaApi.areasArray = JSON.parse(localStorage.getItem('area') as any)
    
  }

    // this.areaApi.getAllAreas();
    this.areaApi.getCity();

    let pageIndex = (this.selectedPages - 1) * this.productPerPage;
    // this.products = this.areaApi.areasArray.slice(pageIndex, this.productPerPage);
  }

  deleteArea(areaID: any) {
      const index = this.areaApi.areasArray.findIndex(area => area.areaID === areaID);
      if(index !== -1) {
        this.areaApi.areasArray.splice(index, 1);
        localStorage.removeItem(areaID);
        console.log(this.areaApi.areasArray);
      } else {
        console.log("Area not found");
      }
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
    // deleteArea(AreaID) {
    //   if(this.areaApi.areasArray) {
    //     // Find the index of the area to delete
    //     const index = this.areaApi.areasArray.findIndex(area => area.areaID === areaID);
    //     if(index !== -1) {
    //       // Use the splice() method to remove the element from the array
    //       this.areaApi.areasArray.splice(index, 1);
    //       console.log(this.areaApi.areasArray);
    //     } else {
    //       console.log("Area not found");
    //     }
    //   } else {
    //     console.log("Area not found");
    //   }
    // }
  


  returnName(cityID: number){
  return this.areaApi.city.find((x:any) => x.cityID == cityID)?.name

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
    let pageIndex = (this.selectedPages - 1) * this.productPerPage;
    let endIndex =
      (this.selectedPages - 1) * this.productPerPage + this.productPerPage;
    this.products = [];
    // this.areaApi.areasArray = this.areaApi.areasCopy.slice(pageIndex, endIndex);
  }
}
