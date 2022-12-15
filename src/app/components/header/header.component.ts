import { Component } from '@angular/core';
import { CityApiService } from 'src/app/services/city-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
searchValue: any;
constructor(public cityApi:CityApiService ){}
}
