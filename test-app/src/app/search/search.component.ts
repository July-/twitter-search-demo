import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../loader/loader.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  foundTweets;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute, 
    private service: DataService, 
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.displayLoader(true);
    this.route.params
      .switchMap(params => {
        return this.service.getTweets(params['search-text']);
      })    
      .subscribe(tweets => {
        if (!this.checkErrors(tweets)) {
          this.foundTweets = JSON.parse(tweets.response.body).statuses;
        }
        this.loader.displayLoader(false);
        
      },
      error => {
        this.errorMessage = "Failed to connect to server."
        console.log(error);
        this.loader.displayLoader(false);
      });
       
  }

  checkErrors(tweets) {

    if (tweets.error) {
      this.errorMessage = "Something is wrong on Twitter side...";
      console.log(tweets.error);
      return true;
    }

    if (tweets.tweets.statuses.length == 0) {
      this.errorMessage = "Nothing found."
      return true;
    }

    if (!tweets.response) {
      this.errorMessage = "Failed to retrieve data from Twitter API.";
      console.log(tweets);
    }

    return false;
  }
    
}
