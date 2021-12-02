import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
export class AddCommentsComponent implements OnInit {
  newComment: any;
  // @Input() getAllCakes: any;
  @Input() allCakes: any;

  constructor( private _HttpService: HttpService) { }

  ngOnInit(): void {
    this.getAllCakes()
    this.newComment = {
      stars : "",
      comment : ""
    }

  }

  createNewComment(event:any, cakeId:string) : void {
    event.preventDefault();
    console.log("Hello!", this.newComment)
    let observable = this._HttpService.CreateOneComment(cakeId, this.newComment)
    observable.subscribe((data: any) => {
          console.log(data);
        })
        console.log("i got here")
        this.getAllCakes()

  }

  getAllCakes(): void {
    console.log( "We are going to fetch the cakes list!" );
    let observable = this._HttpService.getAll();;
    observable.subscribe((data: any) => {
      console.log(data);
      this.allCakes = data;
    })
    console.log("i got here")

  }

}
