import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model"
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs"
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnDestroy, OnInit {

  isAuthenticated: boolean = false;
  authSubscription: Subscription;
  posts: Post[] = [];
  private postSubscription: Subscription;
  constructor(public postService: PostsService, private authService: AuthService) { }
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.postSubscription = this.postService.getPostUpdateListner().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      }
    );
    this.postService.getPosts();
    this.authSubscription = this.authService.getAuthenticationListener().subscribe(
      (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
      });
    this.isAuthenticated = this.authService.isAutenticated();
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  deletePost(post) {
    this.postService.deletePost(post._id);
  }
}