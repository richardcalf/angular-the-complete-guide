import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  
  isLoading = false;
  error = null;
  private errorSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
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
    }, error => {
       this.error = error.message;
       this.isLoading = false;
       console.log(error.message);
    });
  }

  onClearPosts() {
    // practice exercise: delete all posts via a request
    this.isLoading = true;
    this.postsService.deletePosts()
    .subscribe(() => {
      this.loadedPosts = [];
      this.isLoading = false;
    });
  
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
