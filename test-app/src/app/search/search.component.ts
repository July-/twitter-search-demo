import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  foundTweets;

  constructor(private route: ActivatedRoute, private service: DataService) { }

  ngOnInit() {
    this.route.params
      .switchMap(params => {
        return this.service.getTweets(params['search-text']);
      })    
      .subscribe(tweets => {
        this.foundTweets = JSON.parse(tweets.response.body).statuses;
        console.log(this.foundTweets);
      });
       
  }
    
}
