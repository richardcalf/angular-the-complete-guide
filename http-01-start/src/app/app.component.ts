import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  apiEndPoint = 'https://ng-layer-cake-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
    .post<{name: string}>(this.apiEndPoint,
    postData).subscribe(response => {
      console.log(response);
    });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isLoading = true;
    this.http.get<{[key: string]: Post}>(this.apiEndPoint)
    .pipe(map((response) => {
      const postsArray: Post[] = [];
      for (const key in response) {
        if(response.hasOwnProperty(key)) {
          postsArray.push({ ...response[key], id: key});
        }
      }
      return postsArray;
    }))
    .subscribe(posts => {
      this.loadedPosts = posts;
      this.isLoading = false;
    })
  }
}
