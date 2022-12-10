import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { StudentsInterface } from 'src/app/shared/class/students';

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    result: any;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    constructor(private client: HttpClient) {}

    async getStudents() {
        const resp  =  this.client.get('/students', this.httpOptions);
        const data : any = await lastValueFrom(resp);
        return data.data;
    }

    async createStudent(student: StudentsInterface) {
        const resp = this.client.post('/students', student, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async updateStudent(student: StudentsInterface) {
        const resp = this.client.put('/students', student, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async enableOrDisableStudent(student: StudentsInterface, status: Number) {
        const resp = this.client.post('/students/enableorDisable', {"s_id": student.s_id, status}, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async deleteStudent(s_id: number) {
        const resp = this.client.delete('/students/' + s_id, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }
}