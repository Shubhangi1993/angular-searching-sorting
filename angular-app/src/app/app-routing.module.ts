

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AddEditEmployeeDetailsComponent } from './components/add-edit-employee-details/add-edit-employee-details.component';
import { Constants } from './constants/constants';

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent,
  },
  {
    path: 'employees',
    component: EmployeesListComponent,
  },
  {
    path: 'employees/add',
    component: AddEditEmployeeDetailsComponent,
    data: {
      viewType: Constants.ViewType.Add
    }
  },
  {
    path: 'employees/:code/edit',
    component: AddEditEmployeeDetailsComponent,
    data: {
      viewType: Constants.ViewType.Edit
    }
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }