import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.services';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DealerReportComponent } from './components/dealer-report/dealer-report.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SidenavNavbarComponent } from './components/sidenav-navbar/sidenav-navbar.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { ProductReportComponent } from './components/product-report/product-report.component';
import { ComplaintReportComponent } from './components/complaint-report/complaint-report.component';
import { QrReportComponent } from './components/qr-report/qr-report.component';
import { GenuinityHeatmapComponent } from './components/genuinity-heatmap/genuinity-heatmap.component';
import { DealerPerformanceComponent } from './components/dealer-performance/dealer-performance.component';
import { HelpComponent } from './components/help/help.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddDealerComponent } from './components/add-dealer/add-dealer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { AgmCoreModule } from '@agm/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToggleButtonGlobalVariable } from './services/toggle-button-global-variable';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DealerPerformanceDetailsComponent } from './components/dealer-performance-details/dealer-performance-details.component';
import { DealerDetailComponent } from './components/dealer-detail/dealer-detail.component';
import { QrDetailsComponent } from './components/qr-details/qr-details.component';
import { FeedbackDetailsComponent } from './components/feedback-details/feedback-details.component';
import { EditDealerComponent } from './components/edit-dealer/edit-dealer.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    DealerReportComponent,
    SidenavNavbarComponent,
    ConfirmDeleteComponent,
    AddDealerComponent,
    CustomerReportComponent,
    CustomerDetailsComponent,
    ProductReportComponent,
    ComplaintReportComponent,
    QrReportComponent,
    GenuinityHeatmapComponent,
    DealerPerformanceComponent,
    HelpComponent,
     AddProductComponent,
     ProductDetailsComponent,
     EditProductComponent,
     DealerPerformanceDetailsComponent,
     DealerDetailComponent,
     QrDetailsComponent,
     FeedbackDetailsComponent,
     EditDealerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCL6ZnTYC4vN028mlfzvEbiC5a83kZnCiY',
      libraries: ['visualization'],
    }),
    MatIconModule,MatSortModule,MatPaginatorModule,MatTableModule,MatTableExporterModule,MatDialogModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true})
  ],
  providers: [ApiService,ToggleButtonGlobalVariable,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
