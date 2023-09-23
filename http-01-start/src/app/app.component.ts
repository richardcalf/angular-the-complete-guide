import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  
  isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    // this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.newPost(postData);
  }

  onFetchPosts() {
    this.postsService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
