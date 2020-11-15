import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable} from 'rxjs';


@Injectable()
export class CorsInterceptor implements HttpInterceptor {
    
    constructor() { }
	//function which will be called for all http calls
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
        console.log("Intercept");
		request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': "Origin, Authorization, Content-Type, Accept",
                'Content-Type': 'application/json'
            }
        });

        return next.handle(request);
  	}
}