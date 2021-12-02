import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-cake-form',
  templateUrl: './cake-form.component.html',
  styleUrls: ['./cake-form.component.css']
})
export class CakeFormComponent implements OnInit {
  newCake: any;

  constructor(private _HttpService: HttpService) {  }
  

  ngOnInit(): void {
    this.newCake = {
      baker : "",
      imageUrl : ""
    }
  }
  
  createNewCake( event: any ): void {
    console.log(this.newCake)
    event.preventDefault();
    let observable = this._HttpService.CreateOne(this.newCake);
    observable.subscribe((data: any) => {
      console.log(data);
    })
    console.log("i got here")
    
  }

}
