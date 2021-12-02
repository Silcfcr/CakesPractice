import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cakes-app';
  allCakes: any;
  constructor(private _HttpService: HttpService) { }

  ngOnInit(): void {

  }

  public getAllCakes(): void {
    console.log( "We are going to fetch the cakes list!" );
    let observable = this._HttpService.getAll();;
    observable.subscribe((data: any) => {
      console.log(data);
      this.allCakes = data;
    })
    console.log("i got here")

  }
}
