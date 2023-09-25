import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient) {}
    error = new Subject<string>();

    apiEndPoint = 'https://ng-layer-cake-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

    newPost(postData: Post) {
        this.http
             .post<{name: string}>(this.apiEndPoint,
                  postData).subscribe(response => {
                    console.log(response);
                    }, error => {
                        this.error.next(error.message);
                    });
    }

    fetchPosts() {
       let queryParams = new HttpParams();//let because it's immutable
       queryParams = queryParams.append('print','pretty');
       queryParams = queryParams.append('custom','key');
        return this.http
          .get<{[key: string]: Post}>(this.apiEndPoint,
            {
              headers: new HttpHeaders({'Custom-Header': ['Test Value','Another value']}).append('Custom-Header2','Fancy Value')
              .append('Custom-Header3', 'The last value'),
              params: queryParams
            })
          .pipe(
            map((response) => {
               const postsArray: Post[] = [];
               for (const key in response) {
                 if(response.hasOwnProperty(key)) {
                     postsArray.push({ ...response[key], id: key});
                 }
               }
               return postsArray;
              }),
              catchError(error => {
                //log your own analytics before returning to consumer
                return throwError(error);
              })
            );
    }

    deletePosts() {
        return this.http.delete(this.apiEndPoint);
    }
}