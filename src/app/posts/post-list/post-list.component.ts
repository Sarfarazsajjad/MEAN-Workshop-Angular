import { Component } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {

  // posts = [
  //   { postTitle: 'Post One', postContent: 'This is Post One Content' },
  //   { postTitle: 'Post Two', postContent: 'This is Post Two Content' },
  //   { postTitle: 'Post Three', postContent: 'This is Post Three Content' },
  // ];

  posts = [];
}