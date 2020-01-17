import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { employees } from '../employee.model';
import { map,throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  
  constructor(private service:EmployeeService) { }
  
  ngOnInit() {
    //Logging all the employees
    this.service.getEmployees()    
    .subscribe(
      (value:any)=>{                                
          console.log(value);
      }
    );
    this.service.getById().subscribe(
      (val)=>{
        console.log(val);
      }
    )
    
  }
  
}
