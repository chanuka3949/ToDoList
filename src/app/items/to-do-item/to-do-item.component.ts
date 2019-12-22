import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from '../items.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {

  constructor(public itemService: ItemService) { }

  ngOnInit() {
  }

  enteredTask = '';
  enteredDescription = '';

  // @Output() itemCreated = new EventEmitter<Item>();

  onItemCreated(form: NgForm) {
    if(form.invalid)
      return;
    this.itemService.addItem(form.value.itemTask, form.value.itemDescription);
  }


}
