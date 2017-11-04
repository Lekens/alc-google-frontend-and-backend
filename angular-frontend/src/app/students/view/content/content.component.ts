import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../shared/services/student/student.service';
import {Iresponse} from '../../../shared/interfaces/iresponse';
import {ListStudentComponent} from '../list-student/list-student.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isAddStudent: boolean;
  isListAll: boolean;
  studentEdit: any;
  constructor(
    private studentService: StudentService, public stud: ListStudentComponent
  ) {
    this.isAddStudent = false;
    this.isListAll = true;
  }

  ngOnInit() {
  }



  /**
   * Add New Student
   */
  addStudent () {
    this.isAddStudent = true;
    this.isListAll = false;
}

  /**
   * View All Student
   */
  viewStudent () {
    this.isAddStudent = false;
    this.isListAll = true;
}

  /**
   * Delete all records in db
   */
  deleteAllStudent() {
  this.confirmAction();
  }

  /**
   * Proceed deletion
   */
  public  continueDeleteAll() {
    this.studentService.deleteStudentAll().subscribe((response: Iresponse) => {
      if (response.code === 200 && response.status === 'SUCCESS') {
        swal(
          'Deleted!',
          'All record has been deleted.',
          'success'
        );
      } else {
        swal('Failed!', 'Operation failed', 'error');
      }
    });
  }

  /**
   * Confirm delete decision
   */
  confirmAction() {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      this.continueDeleteAll();
    }, function (dismiss) {
      if (dismiss === 'cancel') {}
    })
  }

  /**
   * Get student to edit data for processing
   * @param evt
   */
  getStudentEdit(evt) {
    this.isAddStudent = true;
    this.isListAll = false;
    console.log('Emmitted Value: ', evt);
    this.studentEdit = evt;
  }
}
