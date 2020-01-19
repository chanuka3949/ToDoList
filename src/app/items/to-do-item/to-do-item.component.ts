import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from '../items.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from '../item.model';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {

  constructor(public itemService: ItemService, public route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.item = this.itemService.getItem(this.taskId);
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });

  }

  enteredTask = '';
  enteredDescription = '';
  private mode = 'create';
  private taskId: string;
  private item: Item;

  onItemCreated(form: NgForm) {
    if(form.invalid)
      return;
    this.itemService.addItem(form.value.itemTask, form.value.itemDescription);
  }
}
