import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesService } from 'src/app/home/services/courses.service';
import { CoursesInterface } from 'src/app/shared/class/courses';
import { openSnackBar } from 'src/app/shared/SnackBar';
import { CreateOrEditComponent } from '../create-or-edit/create-or-edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  courses: CoursesInterface[] = [];
  isVisibleFilter: string = "invisible";
  first_name: string;
  displayedColumns: string[] = ["c_id", "name", "credits", "actions"];
  dataSource!: MatTableDataSource<CoursesInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coursesSerice: CoursesService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createTable();
  }  

  async getCourses() {
    return await this.coursesSerice.getCourses();
  }

  createTable() {
    this.getCourses().then((courses) => {
      this.courses = courses;
      this.dataSource = new MatTableDataSource(this.courses);
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

  async ShowEditcaDialog(studen?: CoursesInterface) {
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
        openSnackBar("Success", result.message, "check_circle", "bg-teal-100", 2000, this._snackBar);
        this.createTable();
      }else{
        openSnackBar("Error", result.error, "error", "bg-yellow-400", 2000, this._snackBar);
      }
    });
  }

}
