import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './items/to-do-list/to-do-list.component';
import { ToDoItemComponent } from './items/to-do-item/to-do-item.component';


const routes: Routes = [
  { path: '', component: ToDoListComponent },
  { path: 'add', component: ToDoItemComponent },
  { path: 'edit/:taskId', component: ToDoItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
