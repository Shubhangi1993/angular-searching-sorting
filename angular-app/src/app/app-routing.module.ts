

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent,
  }];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }