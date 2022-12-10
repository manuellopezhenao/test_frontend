import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'src/app/home/services/courses.service';
import { CoursesStudentsService } from 'src/app/home/services/coursesStudents.service';
import { StudentService } from 'src/app/home/services/students.service';
import { CoursesInterface } from 'src/app/shared/class/courses';
import { StudentsInterface } from 'src/app/shared/class/students';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public CreateForm: FormGroup = new FormGroup({});
  courses: CoursesInterface[] = [];
  students: StudentsInterface[] = [];


  constructor(private coursesService: CoursesService, private studentService: StudentService, private courseStudentService: CoursesStudentsService, private dialog: MatDialogRef<CreateComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this.getCourses().then((res: CoursesInterface[]) => {
      this.courses = res;
    });
    this.getStudents().then((res: StudentsInterface[]) => {
      this.students = res;
    });
  }

  initForm() {
    this.CreateForm = new FormGroup({
      course: new FormControl("", [Validators.required]),
      student: new FormControl("", [Validators.required]),
    });
  }

    async getStudents() {
      return await this.studentService.getStudents();
    }

    async getCourses() {
      return await this.coursesService.getCourses();
    }

  submitForm() {
    if (this.CreateForm.valid) {
      

      this.courseStudentService.linkCourseStudent(this.CreateForm.value.course, this.CreateForm.value.student).then(
        (res) => {
          if (res.success) {
            this.dialog.close({
              success: true,
              message: 'Course Student Link Success',
            });
          } else {
            console.log(res);
            this.dialog.close({ success: false, error: res.mgs });
          }
        }

      );
      
      
    }
  }

  cancel() {
    this.dialog.close({ success: true, message: "Canceled" });
  }

}


