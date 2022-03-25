import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.module';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formvalue!:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData!:any;
  showAdd!: boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder, private api:ApiService) 
  {
    
  }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getEmployeeDetails();
  }
  clickAddEmployee(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
postEmployeeDetails()
{
  this.employeeModelObj.firstname=this.formvalue.value.firstname;
  this.employeeModelObj.lastname=this.formvalue.value.lastname;
  this.employeeModelObj.email=this.formvalue.value.email;
  this.employeeModelObj.mobile=this.formvalue.value.mobile;
  this.employeeModelObj.salary=this.formvalue.value.salary;
  
  this.api.postEmployee(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert('Employee Added Successfully');
    this.getEmployeeDetails();
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formvalue.reset();
    this.getEmployeeDetails();
  },
  err=>{
alert('Something Went Wrong');
  }
  )
  
}
getEmployeeDetails()
{
this.api.getEmployee()
.subscribe(res=>{
  this.employeeData=res;
})
}
deleteEmployee(emp : any){
  this.api.deleteEmployee(emp.id)
  .subscribe(res=>{
    alert('Employee Deleted');
    this.getEmployeeDetails();
  })
}
onEdit(emp: any){
  this.showAdd=false;
    this.showUpdate=true;
  this.employeeModelObj.id=emp.id;
  this.formvalue.controls['firstname'].setValue(emp.firstname);
  this.formvalue.controls['lastname'].setValue(emp.lastname);
  this.formvalue.controls['email'].setValue(emp.email);
  this.formvalue.controls['mobile'].setValue(emp.mobile);
  this.formvalue.controls['salary'].setValue(emp.salary);

}
updateEmployeeDetails(){
  this.employeeModelObj.firstname=this.formvalue.value.firstname;
  this.employeeModelObj.lastname=this.formvalue.value.lastname;
  this.employeeModelObj.email=this.formvalue.value.email;
  this.employeeModelObj.mobile=this.formvalue.value.mobile;
  this.employeeModelObj.salary=this.formvalue.value.salary;
  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    alert('updated successfully');
    this.getEmployeeDetails();
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formvalue.reset();
    this.getEmployeeDetails();
  })
}
}