import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from "@angular/common/http";
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log('request is on its way');
        console.log(request.url);
        const modifiedRequest = request.clone({headers: request.headers.append('Auth-2', 'vb39dk3h-oa34ds-hmd')});
        return next.handle(modifiedRequest);
    }
}