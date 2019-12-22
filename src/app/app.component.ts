import { Component } from '@angular/core';
import { Item } from './items/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ToDoList';
  addedItems: Item[] = [];

  onItemCreated(item: Item){
    this.addedItems.push(item);
  }

}
