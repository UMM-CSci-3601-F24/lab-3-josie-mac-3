import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { TodoListComponent } from './todov2/todo-list/todo-list.component';
import { TodoCardComponent } from './todov2/todo-card/todo-card.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'users', component: UserListComponent, title: 'Users' },
  { path: 'users/:id', component: UserProfileComponent, title: 'User Profile' },
  { path: 'todos', component: TodoListComponent, title: 'Todos' },
  { path: 'card', component: TodoCardComponent, title: 'testingCard' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
