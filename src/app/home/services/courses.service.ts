import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CoursesInterface } from 'src/app/shared/class/courses';

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    result: any;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    constructor(private client: HttpClient) {}

    async getCourses() {
        const resp  =  this.client.get('/courses', this.httpOptions);
        const data : any = await lastValueFrom(resp);
        return data.data;
    }

    async createCourse(course: CoursesInterface) {
        const resp = this.client.post('/courses', course, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async updateCourse(course: CoursesInterface) {
        const resp = this.client.put('/courses', course, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async enableOrDisableCourse(course: CoursesInterface, status: Number) {
        const resp = this.client.post('/courses/enableorDisable', {"c_id": course.c_id, status}, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    async deleteCourse(c_id: number) {
        const resp = this.client.delete('/courses/' + c_id, this.httpOptions);
        const data: any = await lastValueFrom(resp);
        return data;
    }

    
}