import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDealerComponent } from './components/add-dealer/add-dealer.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ComplaintReportComponent } from './components/complaint-report/complaint-report.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { DealerPerformanceComponent } from './components/dealer-performance/dealer-performance.component';
import { DealerReportComponent } from './components/dealer-report/dealer-report.component';
import { GenuinityHeatmapComponent } from './components/genuinity-heatmap/genuinity-heatmap.component';
import { HelpComponent } from './components/help/help.component';
import { LoginComponent } from './components/login/login.component';
import { ProductReportComponent } from './components/product-report/product-report.component';
import { QrReportComponent } from './components/qr-report/qr-report.component';
import { AuthGuard } from './guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidenavNavbarComponent } from './components/sidenav-navbar/sidenav-navbar.component';

const routes: Routes = [{ path:'',component:LoginComponent},
{ path:'Login',component:LoginComponent},
{ path:'Sidebar',component:SidebarComponent},
{path:'Dealer',component:DealerReportComponent},
{path:'Customer',component:CustomerReportComponent},
{path:'dashboard',component:SidenavNavbarComponent,canActivate: [AuthGuard]},
{path:'product',component:ProductReportComponent},
{path:'qr',component:QrReportComponent},
{path:'feedback',component:ComplaintReportComponent},
{path:'Customer-Details',component:CustomerDetailsComponent},
{path:'genuinity-heatmap',component:GenuinityHeatmapComponent},
{path:'dealer-performance',component:DealerPerformanceComponent},
{path:'help',component:HelpComponent},
{path:'add-product',component:AddProductComponent},
{path:'add-dealer',component:AddDealerComponent},{path:'sidebar',component:SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
