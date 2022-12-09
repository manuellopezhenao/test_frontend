import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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
}