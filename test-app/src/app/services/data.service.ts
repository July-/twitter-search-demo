import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getTweets(search: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/tweets/' + search);
  }

}
