import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string | null;
  page = this.dynamicDatabase.searchPage;

  constructor(
    private route: ActivatedRoute,
    public dynamicDatabase: DynamicDatabase
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('query')) {
        this.query = paramMap.get('query');
        console.log(this.query);
      } else {
        throw new Error('no query provided');
      }
    });
  }
}
