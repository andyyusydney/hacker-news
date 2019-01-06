import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchResultComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
