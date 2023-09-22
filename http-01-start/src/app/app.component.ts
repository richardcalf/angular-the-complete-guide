import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  apiEndPoint = 'https://ng-layer-cake-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(this.apiEndPoint,
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
    this.http.get(this.apiEndPoint)
    .pipe(map(response => {
      const posts = [];
      for (const key in response) {
        if(response.hasOwnProperty(key)) {
          posts.push({ ...response[key], id: key});        
        }
      }
      return posts;
    }))
    .subscribe(posts => {
      console.log(posts);
    })
  }
}
