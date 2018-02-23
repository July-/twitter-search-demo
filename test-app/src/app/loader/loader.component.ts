import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading = false;
  loaderSubscription: Subscription;

  constructor(private loader: LoaderService) { }

  ngOnInit() {
    this.loaderSubscription = this.loader.loaderCounter.subscribe((counter: number) => {
      this.isLoading = counter != 0;
    });
}

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }

}
