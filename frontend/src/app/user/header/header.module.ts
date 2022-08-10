import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { HttpLoaderFactory } from '../shared/loader-factory';
import { DropdownSubmenuOpenDirective } from './directives/dropdown-submenu-open.directive';
import { DropDownSubmenuCloseDirective } from './directives/dropdown-submenu-close.directive';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { HeaderRoutingModule } from './header-routing.module';
import { FormsModule } from '@angular/forms';
import { IconMenuOpenCloseDirective } from './directives/dropdown-icon-menu-open-close.directive';
import { DropdownMenuOpenCloseDirective } from './directives/dropdown-menu-open-close.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    DropdownSubmenuOpenDirective,
    DropDownSubmenuCloseDirective,
    IconMenuOpenCloseDirective,
    DropdownMenuOpenCloseDirective,
    TestComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    HeaderRoutingModule,
    FormsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
