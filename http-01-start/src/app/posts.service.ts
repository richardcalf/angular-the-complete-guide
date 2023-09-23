import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient) {}

    apiEndPoint = 'https://ng-layer-cake-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';


    newPost(postData: Post) {
        this.http
             .post<{name: string}>(this.apiEndPoint,
                  postData).subscribe(response => {
                    console.log(response);
                    });
    }

    fetchPosts() {
        this.http
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
            )
            .subscribe(posts => {
           });
    }
}