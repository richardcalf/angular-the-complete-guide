import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
        return this.http
          .get<{[key: string]: Post}>(this.apiEndPoint)
          .pipe(
            map((response) => {
               const postsArray: Post[] = [];
               for (const key in response) {
                 if(response.hasOwnProperty(key)) {
                     postsArray.push({ ...response[key], id: key});
                 }
               }
               return postsArray;
              })
            );
    }

    deletePosts() {
        return this.http.delete(this.apiEndPoint);
    }
}