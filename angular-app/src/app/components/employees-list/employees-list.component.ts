import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
 listHeadersObj = ['Id', 'Name', 'Phone', 'City', 'Address 1', 'Address 2', 'Postal Code'];
  employeeList = [];
  searchByKeyword: string;
  constructor(
    private service: CommonService
  ) { }

  ngOnInit(): void {
    this.getEmployeeData();
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
}

