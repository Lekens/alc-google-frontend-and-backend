import {Component, OnInit} from '@angular/core';
import {Iresponse} from '../../../shared/interfaces/iresponse';
import {StudentService} from '../../../shared/services/student/student.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import swal from 'sweetalert2';
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  listOfStudent: any;
  EMAIL_VALIDATION: any;
  studentInfo: FormGroup;
  student = {
    lastname: '',
    firstname: '',
    matric_no: '',
    level: '',
    course: '',
    email: '',
    department: ''
  };
  listStudent: boolean;
  editStudent: boolean;
  studentId: number;
  constructor(private formBuilder: FormBuilder, private studentService: StudentService) {
    this.EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

  }

  ngOnInit() {
    this.listStudent = true;
    this.editStudent = false;
    this.listAllStudents();
    this.listOfStudent = [];
  }
  /**
   * List all student records in the system.
   */
  listAllStudents() {
    this.studentService.listAll().subscribe((response: Iresponse) => {
      if (response.code === 200 && response.status === 'SUCCESS') {
        // swal('Success!', response.msg, 'success');
        this.listOfStudent = response.data;
      } else {
        swal('Failed!', 'Operation failed', 'error');
      }
    });
  }
  /**
   * method to build the reactive form.
   */
  initializeForm() {
    this.studentInfo = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      matric_no: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      course: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      department: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      level: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(this.EMAIL_VALIDATION)])]
    });
  }

  /**
   * Process student deletion
   * @param student
   * @returns {any}
   */
  deleteStudent(student) {
    console.log('Delete this student : ', student);
    return this.confirmAction(student);
  }

  /**
   * Proceed with deleting student
   * @param student
   */
  continueDelete(student) {
    this.studentService.deleteStudent(student._id).subscribe((response: Iresponse) => {
      if (response.code === 200 && response.status === 'SUCCESS') {
        swal(
          'Deleted!',
          'Record has been deleted.',
          'success'
        );
        this.listAllStudents()
      } else {
        swal('Failed!', 'Operation failed', 'error');
      }
    });
  }

  /**
   * Confirm delete action
   * @param student
   */
  confirmAction(student) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      this.continueDelete(student);
    }, function (dismiss) {
      if (dismiss === 'cancel') {}
      })
  }

  /**
   * Set student details for editing
   * @param student
   */
  editStudentProperty(student) {
      // console.log('Edit this student Now: ', this.editStudent);
    this.initializeForm();
    this.studentId = student._id;
      this.student.firstname = student.firstname;
      this.student.lastname = student.lastname;
      this.student.email = student.email;
      this.student.course = student.course;
      this.student.department = student.department;
      this.student.matric_no = student.matric_no;
      this.student.level = student.level;
      this.listStudent = false;
      this.editStudent = true;

  }

  /**
   * Update student records
   */
  updateStudent() {
    if (!isNullOrUndefined(this.student)) {
      this.studentService.updateStudent(this.student, this.studentId).subscribe((response: Iresponse) => {
        console.log('Response ', response);
        if (response.code === 200 && response.status === 'SUCCESS') {
          swal('Success!', response.msg, 'success');
          this.studentInfo.reset();
          location.reload();
        } else {
          swal('Failed!', 'Operation failed', 'error');
        }
      });
    }
  }
}
