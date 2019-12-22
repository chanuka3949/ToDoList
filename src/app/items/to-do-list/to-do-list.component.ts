import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Item } from '../item.model';
import { MatSnackBar } from '@angular/material';
import { ItemService } from '../items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  
  items: Item[] = [];
  private itemSubscription: Subscription;
  private snackBarSubscription: Subscription;

  constructor(private snackBar: MatSnackBar, public itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems();
    this.itemSubscription = this.itemService.getItemListener()
      .subscribe((items: Item[])=>{
        this.items = items;
    });
  }

  onItemDelete(id: string) {
    // this.itemService.deleteItem(itemData);
    // let snackBarRef = this.snackBar.open(`Task '${itemData.task}' has been deleted`, 'Undo', {
    //   duration: 5000
    // });
    // this.snackBarSubscription =  snackBarRef.onAction().subscribe(() => {
    //   this.itemService.addItem(itemData.task, itemData.description);
    //   snackBarRef.dismiss();
    // });
    //this.snackBar.open("Hello");
    this.itemService.deleteItem(id);

  }

  // onItemEdit(itemData: Item) {
  //   this.itemService.deleteItem(itemData);
  //   let snackBarRef = this.snackBar.open(`Task '${itemData.task}' has been deleted`, 'Undo', {
  //     duration: 3000
  //   });
  //   this.snackBarSubscription =  snackBarRef.onAction().subscribe(() => {
  //     this.itemService.addItem(itemData.task, itemData.description);
  //     snackBarRef.dismiss();
  //   });
  //   //this.snackBar.open("Hello");

  // }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
    // this.snackBarSubscription.unsubscribe();

  }
}
