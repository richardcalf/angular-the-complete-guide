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
  }

  onCreatePost(postData: Post) {
    this.postsService.newPost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isLoading = true;
    this.postsService.fetchPosts()
    .subscribe(posts => {
      this.loadedPosts = posts;
      this.isLoading = false;
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
