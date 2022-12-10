import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'src/app/home/services/courses.service';
import { CoursesStudentsService } from 'src/app/home/services/coursesStudents.service';
import { StudentService } from 'src/app/home/services/students.service';
import { CoursesInterface } from 'src/app/shared/class/courses';
import { CoursesStudentsInterface } from 'src/app/shared/class/courses_x_students';
import { StudentsInterface } from 'src/app/shared/class/students';
import { opeDialogAlert } from 'src/app/shared/SnackBar';

@Component({
  selector: 'app-search-delete',
  templateUrl: './search-delete.component.html',
  styleUrls: ['./search-delete.component.css'],
})
export class SearchDeleteComponent implements OnInit {
  public CreateForm: FormGroup = new FormGroup({});
  courses: CoursesInterface[] = [];
  students: StudentsInterface[] = [];

  constructor(
    private coursesService: CoursesService,
    public matdialog: MatDialog,
    private courseStudentService: CoursesStudentsService,
    private dialog: MatDialogRef<SearchDeleteComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCourses().then((res: CoursesInterface[]) => {
      this.courses = res;
    });
    this.CreateForm.get('course')?.valueChanges.subscribe((res) => {
      this.getstudentsbycourse(res).then((res: StudentsInterface[]) => {
        console.log(res);
        this.students = res;
      });
    });
  }

  initForm() {
    this.CreateForm = new FormGroup({
      course: new FormControl('', [Validators.required]),
      student: new FormControl('', [Validators.required]),
    });
  }

  async getstudentsbycourse(id: number) {
    return await this.courseStudentService.searchstudentsbycourse(id);
  }

  async getCourses() {
    return await this.coursesService.getCourses();
  }

  cancel() {
    this.dialog.close({ success: true, message: 'Canceled' });
  }

  submitForm() {
    if(this.CreateForm.valid){
    const dialog = opeDialogAlert(
      0,
      this.matdialog,
      `Are you sure to delete the course: ${
        this.CreateForm.get('course')?.value
      } of student: ${this.CreateForm.get('student')?.value}?`,
      'Atention',
      'delete'
    );

    dialog.afterClosed().subscribe((result: any) => {
      if (result.success) {
        this.unlinkCourse();
      }
    });

  }
  }

  unlinkCourse() {
    this.courseStudentService
      .unlinkCourseStudent(
        undefined,
        this.CreateForm.value.course,
        this.CreateForm.value.student
      )
      .then((res) => {
        if (res) {
          this.dialog.close({
            success: true,
            message: 'Course Student Unlink Success',
          });
        } else {
          this.dialog.close({
            success: false,
            message: 'Course Student Link Failed',
          });
        }
      });
  }
}
