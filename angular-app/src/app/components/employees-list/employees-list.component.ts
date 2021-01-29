import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit , OnDestroy {
  listHeadersObj = ['Id', 'Name', 'Phone', 'City', 'Address 1', 'Address 2', 'Postal Code', 'Edit'];
  employeeList = [];
  searchByKeyword: string;
  subscribedData: Subscription;
  numbersOnly = '^((\\+91-?)|0)?[0-9]{10}$';
  constructor(
    private service: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeLatestEmployeesDetails();
  }
  subscribeLatestEmployeesDetails(): void {
    this.subscribedData = this.service.updatedEmployeeData.subscribe(data => {
      this.employeeList = data;
      if (this.employeeList.length === 0) {
        this.getEmployeeData();
      }
    });
  }
  getEmployeeData(): void {
    this.service.getEmployeeData().subscribe(response => {
      this.employeeList = response.map(item => {
        if (this.numericOnly(item.phone)) {
          return item;
        } else {
          item.phone = 'NA';
          return item;
        }
      });
      this.service.setEmployeeList(this.employeeList);
    });
  }
  numericOnly(inputtxt): boolean {
    const letterNumber = /^[0-9]+$/;
    if ((inputtxt.match(letterNumber))) {
      return true;
    } else {
      return false;
    }
  }
  onClickAdd(): void {
    this.router.navigate([Constants.NavigationRoutes.AddNewEmployee]);
  }
  onEditClick(selectedItem): void {
    this.service.setEmployeeList(this.employeeList);
    this.router.navigate([Constants.NavigationRoutes.Employee + selectedItem.id + Constants.NavigationRoutes.Edit]);
  }
  ngOnDestroy(): void {
    if (this.subscribedData) {
      this.subscribedData.unsubscribe();
    }
  }
}

