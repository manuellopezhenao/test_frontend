import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/home/services/students.service';
import { StudentsInterface } from 'src/app/shared/class/students';


@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit {

  public CreateForm: FormGroup = new FormGroup({});

  groups = [{"name" :"A", "value": "A"}, {"name" :"B", "value": "B"}, {"name" :"C", "value": "B"}];
  levels = [{"name" :"1", "value": 1}, {"name" :"2", "value": 2}, {"name" :"3", "value": 3}];

  constructor(@Inject(MAT_DIALOG_DATA) public data: StudentsInterface, private dialog: MatDialogRef<CreateOrEditComponent>, private studentService: StudentService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.CreateForm = new FormGroup({
      first_name: new FormControl(this.data?.first_name ?? "", [Validators.required]),
      last_name: new FormControl(this.data?.last_name ?? "", [Validators.required]),
      lv_id: new FormControl(this.data?.lv_id ?? "", [Validators.required]),
      group: new FormControl(this.data?.group ?? "", [Validators.required]),
      email: new FormControl(this.data?.email ?? "", [Validators.required, Validators.email]),
      phone_number: new FormControl(this.data?.phone_number ?? "", [Validators.required]),
      geolocation: new FormControl(this.data?.geolocation ?? "", [Validators.required]),
      status: new FormControl(this.data?.status ?? 0, [Validators.required]),
    });
  }

  cancel(): void {
    this.dialog.close({ success: true, message: "Canceled" });
  }

  submitForm() {
    if (this.CreateForm.valid) {

      let student: StudentsInterface = {
        s_id: this.data?.s_id,
        first_name: this.CreateForm.value.first_name.trim(),
        last_name: this.CreateForm.value.last_name.trim(),
        lv_id: this.CreateForm.value.lv_id,
        group: this.CreateForm.value.group,
        email: this.CreateForm.value.email.trim(),
        phone_number: this.CreateForm.value.phone_number.trim(),
        geolocation: this.CreateForm.value.geolocation.trim(),
        status: this.CreateForm.value.status ? 1 : 0,
      }

      console.log(student);

      if (this.data?.s_id) {
        // Update
        this.studentService.updateStudent(student).then((res) => {
          console.log(res);
          if (res.success) {
            this.dialog.close({ success: true, message: "Student Upadade Success" });
          }else{
            this.dialog.close({ success: false, error: res.error });
          }
        }).catch((err) => {
          console.log(err);
          this.dialog.close({ success: false, error: err.error });
        });
      }else{
        // Create
        this.studentService.createStudent(student).then((res) => {
          if (res.success) {
            this.dialog.close({ success: true, message: "Student Create Success" });
          }else{
            this.dialog.close({ success: false, error: res.error });
          }
        }
        ).catch((err) => {
          console.log(err);
          this.dialog.close({ success: false, error: err.error });
        });
      }


      this.dialog.close({ success: true, message: "Saved", data: this.CreateForm.value });
    } else {
      this.CreateForm.markAllAsTouched();
    }
  }

}
