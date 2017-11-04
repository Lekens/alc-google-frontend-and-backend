import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Iresponse} from '../../../../shared/interfaces/iresponse';
import {StudentService} from '../../../../shared/services/student/student.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
student = {
  lastname: '',
  firstname: '',
  matric_no: '',
  level: '',
  course: '',
  email: '',
  department: ''
};
  EMAIL_VALIDATION: any;
  studentInfo: FormGroup;
  btnText: string;
  title: string;
  constructor(
    private formBuilder: FormBuilder, private studentService: StudentService) {
    this.EMAIL_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    this.initializeForm();
  }

  ngOnInit() {
    this.btnText = 'Submit';
    this.title = 'Create New Student';


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
  createStudent() {
    if (this.btnText === 'Submit' && this.student.firstname !== '') {
      this.btnText = 'Saving...';
      this.studentService.createStudent(this.student).subscribe((response: Iresponse) => {
        console.log('Response ', response);
        if (response.code === 200 && response.status === 'SUCCESS') {
          swal('Success!', response.msg, 'success');
          this.studentInfo.reset();
          this.btnText = 'Submit';
        } else {
          swal('Failed!', 'Operation failed', 'error');
        }
      });
    } else {

    }
  }
}
