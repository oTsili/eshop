import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  query: string | null;
  page = this.dynamicDatabase.searchPage;
  queryParamMapSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    public dynamicDatabase: DynamicDatabase
  ) {}

  ngOnInit(): void {
    this.queryParamMapSubscription = this.route.queryParamMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('query')) {
          this.query = paramMap.get('query');
          console.log(this.query);
        } else {
          throw new Error('no query provided');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.queryParamMapSubscription.unsubscribe();
  }
}
