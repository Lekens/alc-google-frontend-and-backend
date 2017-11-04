import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Iresponse} from '../../interfaces/iresponse';
import {ApiService} from '../api/api.service';

@Injectable()
export class StudentService {

  constructor(private api: ApiService) { }

  /**
   * List all student records in the system
   * @returns {Observable<Iresponse>}
   */
  listAll(): Observable<Iresponse> {
    return  this.api.getRequest('manageStudent').map((res: Iresponse) => {
      return res;
    });
  }

  /**
   * Create New Student
   * @param student
   * @returns {Observable<Iresponse>}
   */
  createStudent(student: any): Observable<Iresponse> {
    return  this.api.postRequest('manageStudent', student).map((res: Iresponse) => {
      return res;
    });
  }

  /**
   * Update student record
   * @param student
   * @param id
   * @returns {Observable<Iresponse>}
   */
  updateStudent(student: any, id): Observable<Iresponse> {
    return  this.api.putRequest('manageStudent/' + id , student).map((res: Iresponse) => {
      return res;
    });
  }

  /**
   * Delete A particular Student
   * @param {number} studentId
   * @returns {Observable<Iresponse>}
   */
  deleteStudent(studentId: number): Observable<Iresponse> {
    return  this.api.deleteRequest( 'manageStudent/' + studentId, studentId).map((res: Iresponse) => {
      return res;
    });
  }

  /**
   * Delete all Students record
   * @returns {Observable<Iresponse>}
   */
  deleteStudentAll(): Observable<Iresponse> {
    return  this.api.deleteRequest( 'manageStudent' , '').map((res: Iresponse) => {
      return res;
    });
  }
}
