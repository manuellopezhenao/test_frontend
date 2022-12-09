import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/home/services/students.service';
import { StudentsInterface } from 'src/app/shared/class/students';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  students: StudentsInterface[] = [];
  isVisibleFilter: string = "invisible";
  first_name: string;
  displayedColumns: string[] = ["s_id", "first_name", "last_name", "lv_id", "group", "email", "phone_number", "geolocation", "status"];
  dataSource!: MatTableDataSource<StudentsInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService) { }

  async ngOnInit() {
    // this.students = await this.getCorreos();
    this.createTable();
  }


  async getCorreos() {
    return await this.studentService.getStudents();
  }

  createTable() {
    this.getCorreos().then((students) => {
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

  enableDisableDefecto(student: StudentsInterface, event: MatSlideToggleChange) {}

}


