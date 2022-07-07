import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DynamicDatabase } from './dynamic-database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery: string | null;
  color: string | null;
  size: string | null;
  heel: string | null;
  material: string | null;
  price: string | null;
  sales: string | null;
  page = this.dynamicDatabase.searchPage;
  queryParamMapSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public dynamicDatabase: DynamicDatabase,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.router.url);

    // this.router.navigate(['/search'], {
    //   queryParams: { size: '35' },
    //   queryParamsHandling: 'merge',
    // });
    // this.queryParamMapSubscription = this.route.queryParamMap.subscribe(
    //   (paramMap: ParamMap) => {
    //     console.log(paramMap);
    //     if (paramMap.has('color')) {
    //       this.color = paramMap.get('color');
    //     }
    //     if (paramMap.has('size')) {
    //       this.size = paramMap.get('size');
    //     }
    //     if (paramMap.has('heel')) {
    //       this.heel = paramMap.get('heel');
    //     }
    //     if (paramMap.has('material')) {
    //       this.material = paramMap.get('material');
    //     }
    //     if (paramMap.has('price')) {
    //       this.price = paramMap.get('price');
    //     }
    //     if (paramMap.has('sales')) {
    //       this.sales = paramMap.get('sales');
    //     }
    //     if (paramMap.has('searchQuery')) {
    //       this.searchQuery = paramMap.get('searchQuery');
    //     }
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.queryParamMapSubscription.unsubscribe();
  }
}
