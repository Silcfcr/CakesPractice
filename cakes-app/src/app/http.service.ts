import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getAll() {
    return this._http.get('http://localhost:3000/');
  }
  getOne(id: string){
    return this._http.get(`http://localhost:3000/${id}`);
  }
  
  CreateOne(newTask: any) {
      return this._http.post('http://localhost:3000/', newTask)
  }

  CreateOneComment(id: string,newComment: any, ) {
    console.log("service", newComment)
    return this._http.post(`http://localhost:3000/${id}`, newComment)
}

  UpdateOne( id: string, updateTask: any) {
    return this._http.put(`http://localhost:3000/${id}`, updateTask)
  }

  DeleteOne(id: string ){
    return this._http.delete(`http://localhost:3000/${id}`)
  }
}
