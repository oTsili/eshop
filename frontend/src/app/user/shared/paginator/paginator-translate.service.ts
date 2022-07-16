import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorTranslateService extends MatPaginatorIntl {
  translate: TranslateService;

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    let returnString = '';
    if (length === 0) {
      this.translate.get('paginator').subscribe((res: string) => {
        returnString = `${res['Page']} 1 ${res['of']} 1']`;
        this.changes.next();
      });
    }
    const amountPages = Math.ceil(length / pageSize);
    this.translate.get('paginator').subscribe((res: string) => {
      returnString = `${res['Page']} ${page + 1} ${res['of']} ${amountPages}`;
      this.changes.next();
    });
    return returnString;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.translate.get('paginator').subscribe((res: string) => {
      super.firstPageLabel = res['First page'];
      super.itemsPerPageLabel = res['Products per page:'];
      super.lastPageLabel = res['Last page'];
      super.nextPageLabel = res['Next page'];
      super.previousPageLabel = res['Previous page'];
      this.changes.next();
    });
    // super.itemsPerPageLabel = this.translate.instant(
    //   'paginator.items_per_page'
    // );
    // super.nextPageLabel = this.translate.instant('paginator.next_page');
    // super.previousPageLabel = this.translate.instant('paginator.previous_page');
    // this.changes.next();
  }
}
