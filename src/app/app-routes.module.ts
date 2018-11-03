import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./auth/login/login.component";

const appRoutes: Routes = [
  
  {
    path: 'messages',
    component: PostListComponent
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '',   redirectTo: '/messages', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class routesModule{}