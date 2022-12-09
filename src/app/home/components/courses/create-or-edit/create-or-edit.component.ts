import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'src/app/home/services/courses.service';
import { CoursesInterface } from 'src/app/shared/class/courses';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css'],
})
export class CreateOrEditComponent implements OnInit {
  public CreateForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CoursesInterface,
    private dialog: MatDialogRef<CreateOrEditComponent>,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.CreateForm = new FormGroup({
      name: new FormControl(this.data?.name ?? '', [Validators.required]),
      credits: new FormControl(this.data?.credits ?? '', [Validators.required]),
    });
  }

  submitForm() {
    if (this.CreateForm.valid) {
      let course: CoursesInterface = {
        c_id: this.data?.c_id,
        name: this.CreateForm.value.name.trim(),
        credits: this.CreateForm.value.credits,
      };
      if (this.data?.c_id) {
        this.coursesService.updateCourse(course).then(
          (res) => {
            if (res) {
              this.dialog.close({
                success: true,
                message: 'Course Update Success',
              });
            } else {
              this.dialog.close({ success: false, message: res.error });
            }
          },
          (_) => {
            this.dialog.close({
              success: false,
              message: 'Course Update Failed',
            });
          }
        );
      } else {
        this.coursesService.createCourse(course).then(
          (res) => {
            if (res) {
              this.dialog.close({
                success: true,
                message: 'Course Created Success',
              });
            } else {
              this.dialog.close({ success: false, message: res.error });
            }
          },
          (_) => {
            this.dialog.close({
              success: false,
              message: 'Course Created Failed',
            });
          }
        );
      }
    }
  }
  cancel() {
    this.dialog.close({ success: true, message: 'Canceled' });
  }
}
