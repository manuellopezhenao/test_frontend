import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/home/services/students.service';
import { StudentsInterface } from 'src/app/shared/class/students';
import { opeDialogAlert } from 'src/app/shared/SnackBar';
import { CreateOrEditComponent } from '../create-or-edit/create-or-edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  students: StudentsInterface[] = [];
  isVisibleFilter: string = "invisible";
  first_name: string;
  displayedColumns: string[] = ["s_id", "first_name", "last_name", "lv_id", "group", "email", "phone_number", "geolocation", "status", "actions", "delete"];
  dataSource!: MatTableDataSource<StudentsInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, public dialog: MatDialog, private toastr: ToastrService) { }

  async ngOnInit() {
    this.createTable();
  }

  async getStudents() {
    return await this.studentService.getStudents();
  }

  createTable() {
    this.getStudents().then((students) => {
      this.students = students;
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isVisibleFilter = "visible";
    });
  }
  
  deleteStudent(student: StudentsInterface) {

    const dialog = opeDialogAlert(student.s_id!, this.dialog, `Are you sure to delete the Student: ${student.first_name}?`, "Atention", 'delete');

    dialog.afterClosed().subscribe((result: any) => {
      if (result?.success) {
        this.delteStudent(student.s_id!);
      }
    });
    
  }

  delteStudent(id: number) {
    this.studentService.deleteStudent(id).then((result: any) => {
      if (result.success) {
        this.toastr.success("Success", result.mgs);
        this.createTable();
      }else{
        this.toastr.error("Error", result.error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openMap(student: StudentsInterface) {
    const [latitude, longitude] = student.geolocation.split(",").map((value) => parseFloat(value));
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
  }

  enableDisable(student: StudentsInterface, event: any) {

    const status = event.checked ? 1 : 0;

    console.log(status);
    
    this.studentService.enableOrDisableStudent(student, status).then((result) => {
      if (result.success) {
        this.toastr.success("Success", result.mgs);
        this.createTable();
      }else{
        this.toastr.error("Error", result.error);
      }
    });

  }

  async ShowEditcaDialog(studen?: StudentsInterface) {
    const dialogRef = this.dialog.open(CreateOrEditComponent, {
      width: '500px',
      disableClose: true,
      data: studen
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        if (result.message == "Canceled") {
          return;
        }
        this.toastr.success("Success", result.message);
        this.createTable();
      }else{
        this.toastr.error("Error", result.error);
      }
    });
  }
}


