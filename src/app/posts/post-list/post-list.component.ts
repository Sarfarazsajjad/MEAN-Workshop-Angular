import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model"
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs"

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnDestroy, OnInit {

  posts: Post[] = [];
  private postSubscription: Subscription;
  constructor(public postService: PostsService) { }
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
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  deletePost(post){
    this.postService.deletePost(post._id);
  }
}