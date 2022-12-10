import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from 'src/app/home/services/courses.service';
import { CoursesInterface } from 'src/app/shared/class/courses';
import { opeDialogAlert } from 'src/app/shared/SnackBar';
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
  displayedColumns: string[] = ["c_id", "name", "credits", "actions", "delete"];
  dataSource!: MatTableDataSource<CoursesInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coursesSerice: CoursesService, public dialog: MatDialog, private toastr: ToastrService) { }

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


  deleteCourse(course: CoursesInterface) {

    const dialog = opeDialogAlert(course.c_id!, this.dialog, `Are you sure to delete the course: ${course.name}?`, "Atention", 'delete');

    dialog.afterClosed().subscribe((result: any) => {
      if (result.success) {
        this.delteCourse(course.c_id!);
      }
    });
    
  }

  delteCourse(id: number) {
    this.coursesSerice.deleteCourse(id).then((result: any) => {
      if (result.success) {
        this.toastr.success("Success", result.mgs);
        this.createTable();
      }else{
        this.toastr.error("Error", result.error);
      }
    });
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
        this.toastr.success("Success", result.message);
        this.createTable();
      }else{
        this.toastr.error("Error", result.error);
      }
    });
  }

}
