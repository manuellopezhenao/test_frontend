import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CoursesStudentsService {
    result: any;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    constructor(private client: HttpClient) {}

    async getCoursesStudents() {
        const resp  =  this.client.get('/coursestudents', this.httpOptions);
        const data : any = await lastValueFrom(resp);
        return data.data;
    }

    async linkCourseStudent(c_id: number, s_id: number) {
        const resp = this.client.post('/linkcoursestudent', {c_id, s_id}, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async unlinkCourseStudent(cxs_id?: number, c_id?: number, s_id?: number) {
        const resp = this.client.delete('/unlinkcoursestudent/' +cxs_id + "/" + c_id + '/' + s_id, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async searchstudentsbycourse(c_id: number) {
        const resp = this.client.get('/searchstudentsbycourse/' + c_id, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data.data;
    }

}