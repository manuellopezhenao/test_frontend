import {  
    HttpRequest,  
    HttpHandler,  
    HttpEvent,  
    HttpInterceptor  
  } from '@angular/common/http';  
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
  
  @Injectable()  
 class UrlInterceptor implements HttpInterceptor {  constructor() {}  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
      request = request.clone({  
         url: `http://192.168.43.185:3000${request.url}`,
      });    
      return next.handle(request);  
    }  
  }  

  export { UrlInterceptor };