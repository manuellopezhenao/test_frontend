import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CoursesStudentsService } from 'src/app/home/services/coursesStudents.service';
import { CoursesInterface } from 'src/app/shared/class/courses';
import { CoursesStudentsInterface } from 'src/app/shared/class/courses_x_students';
import { opeDialogAlert } from 'src/app/shared/SnackBar';
import { CreateComponent } from '../create/create.component';
import { SearchDeleteComponent } from '../search-delete/search-delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  courses: CoursesInterface[] = [];
  isVisibleFilter: string = "invisible";
  first_name: string;
  displayedColumns: string[] = ["cxs_id", "c_id","c_name", "s_id", "s_name", "delete"];
  dataSource!: MatTableDataSource<CoursesInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coursesStudentSerice: CoursesStudentsService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createTable();
  }  

  async getCoursesStudent() {
    return await this.coursesStudentSerice.getCoursesStudents();
  }

  createTable() {
    this.getCoursesStudent().then((courses) => {
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

  deleteCourse(course: CoursesStudentsInterface) {

    const dialog = opeDialogAlert(course.c_id!, this.dialog, `Are you sure to delete the course: ${course.c_name} of student: ${course.s_name}?`, "Atention", 'delete');

    dialog.afterClosed().subscribe((result: any) => {
      if (result.success) {
        this.delteCourseStudent(course.cxs_id!);
      }
    });
    
  }

  delteCourseStudent(id: number) {
    this.coursesStudentSerice.unlinkCourseStudent(id).then((result: any) => {
      if (result.success) {
        this.toastr.success("Success", result.mgs);
        this.createTable();
      }else{
        this.toastr.error("Error", result.error);
      }
    });
  }

  async ShowCreateDialog(studen?: CoursesInterface) {
    const dialogRef = this.dialog.open(CreateComponent, {
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
        if(result.error == "Course for student already exist"){
          this.toastr.warning("Warning", result.error);
          return;
        }
        this.toastr.error("Error", result.error);
      }
    });
  }

  async ShowSearchDeleteDialog() {
    const dialogRef = this.dialog.open(SearchDeleteComponent, {
      width: '500px',
      disableClose: true,
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
