import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,throttleTime, tap, filter } from 'rxjs/operators';
import { employees } from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  canfetchValue=true;

  constructor(private http:HttpClient) { }

  //Get full employees
  getEmployees():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/employees').pipe(     
      throttleTime(2000)
    );
  }

  //Employee by id
  getById():Observable<employees>{
    return this.http.get<employees>('http://localhost:3000/employees/2').pipe(
      map((data)=>{
        if(data.age<40){
          data.age=40;
          return data;
        }
        else{          
          console.log('Age less than 40');
        }
      })
    );
  }
}
