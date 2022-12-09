import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/home/services/students.service';
import { StudentsInterface } from 'src/app/shared/class/students';
import { openSnackBar } from 'src/app/shared/SnackBar';
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
  displayedColumns: string[] = ["s_id", "first_name", "last_name", "lv_id", "group", "email", "phone_number", "geolocation", "status", "actions"];
  dataSource!: MatTableDataSource<StudentsInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

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
        openSnackBar("Exito", "Usuario actualizado Correctamente", "check_circle", "bg-teal-100", 2000, this._snackBar);
        this.createTable();
      }else{
        openSnackBar("Error", result.error, "error", "bg-yellow-400", 2000, this._snackBar);
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
        if (result.message == "Cancelado") {
          return;
        }
        openSnackBar("Exito", "Usuario creado Correctamente", "check_circle", "bg-teal-100", 2000, this._snackBar);
        this.createTable();
      }else{
        openSnackBar("Error", result.error, "error", "bg-yellow-400", 2000, this._snackBar);
      }
    });
  }

  
  enableDisableDefecto(student: StudentsInterface, event: MatSlideToggleChange) {}

}


