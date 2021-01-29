import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-employee-details',
  templateUrl: './add-edit-employee-details.component.html',
  styleUrls: ['./add-edit-employee-details.component.css']
})
export class AddEditEmployeeDetailsComponent implements OnInit {
  formSubmitted = false;
  employeeForm: FormGroup;
  subscribedData: Subscription;
  selectedEmployee: string;
  employeeList = [];
  viewType: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CommonService,
    private router: Router,
    // private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.viewType = this.activatedRoute.snapshot.routeConfig.data.viewType;
    this.selectedEmployee = this.activatedRoute.snapshot.paramMap.get('code');
    this.inititateForm();
    this.subscribeLatestEmployeesDetails();
  }
  subscribeLatestEmployeesDetails(): void {
    this.subscribedData = this.service.updatedEmployeeData.subscribe(data => {
      this.employeeList = data;
      const selectedRecord = data.filter(item => item.id === Number(this.selectedEmployee));
      if (selectedRecord.length > 0) {
        this.setValueToForm(selectedRecord[0]);
      }
    });
  }
  setValueToForm(selectedRecord): void {
    this.emplyeeF.EmployeeName.setValue(selectedRecord.name);
    this.emplyeeF.Phone.setValue(selectedRecord.phone);
    this.emplyeeF.City.setValue(selectedRecord.address.city);
    this.emplyeeF.Address1.setValue(selectedRecord.address.address_line1);
    this.emplyeeF.Address2.setValue(selectedRecord.address.address_line2);
    this.emplyeeF.PostalCode.setValue(selectedRecord.address.postal_code);

  }
  inititateForm(): void {
    this.employeeForm = new FormGroup({
      EmployeeName: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])),
      Phone: new FormControl(null, Validators.required),
      City: new FormControl(),
      Address1: new FormControl(),
      Address2: new FormControl(),
      PostalCode: new FormControl()
    });
  }
  get emplyeeF() { return this.employeeForm.controls; }

  onBackClick(): void {
    this.router.navigate([Constants.NavigationRoutes.EmployeeList]);
  }
  onSaveClick(): boolean {
    if (this.employeeForm.invalid) {
      this.formSubmitted = true;
      return false;
    }
    this.formSubmitted = false;
    const data = this.employeeForm.getRawValue();
    if (this.viewType === Constants.ViewType.Add) {
      const record = {
        id: this.employeeList.length+1,
        name: data.EmployeeName,
        phone: data.Phone,
        address: {
          city: data.City,
          address_line1: data.Address1,
          address_line2: data.Address2,
          postal_code: data.PostalCode
        }
      }
      this.employeeList.push(record);
    } else {
      this.employeeList = this.employeeList.map(item => {
        if (item.id === Number(this.selectedEmployee)) {
          item.name = data.EmployeeName;
          item.phone = data.Phone;
          item.address = {};
          item.address.city = data.City;
          item.address.address_line1 = data.Address1;
          item.address.address_line2 = data.Address2;
          item.address.postal_code = data.PostalCode;
        }
        return item;
      });
    }
    this.service.setEmployeeList(this.employeeList);
    this.router.navigate([Constants.NavigationRoutes.EmployeeList]);
  }
  ngOnDestroy(): void {
    if (this.subscribedData) {
      this.subscribedData.unsubscribe();
    }
  }

}
