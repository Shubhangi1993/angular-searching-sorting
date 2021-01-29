import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableFilterPipe } from './pipes/filter-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditEmployeeDetailsComponent } from './components/add-edit-employee-details/add-edit-employee-details.component';
import { NumberDirective } from './directives/number.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    AddEditEmployeeDetailsComponent,
    TableFilterPipe,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(
    //   {
    //     timeOut: 5000,
    //     preventDuplicates: true,
    //     positionClass: 'toast-top-center'
    //   }
    // ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
