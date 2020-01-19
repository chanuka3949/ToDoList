import { Item } from './item.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private items: Item[] = [];
    private itemSubject = new Subject<Item[]>();


    constructor(private http: HttpClient) { }

    getItems() {
        //return [...this.items];]
        this.http.get<{ message: string, content: any }>('http://localhost:3000/api/items')
            .pipe(map((itemData) => {
                return itemData.content.map(item => {
                    return {
                        task: item.task,
                        description: item.description,
                        id: item._id
                    };

                });
            }))
            .subscribe((itemData) => {
                this.items = itemData;
                this.itemSubject.next([...this.items]);
                //this.itemSubject.next(this.items);
            });
        //return this.items;
    }

    getItemListener() {
        return this.itemSubject.asObservable();
    }

    getItem(id: string) {
        return {...this.items.find(task => task.id === id)};
    }

    addItem(task: string, description: string) {
        const item: Item = { id: null, task: task, description: description };
        this.http.post<{ message: string, itemId: string }>('http://localhost:3000/api/items', item)
            .subscribe((responseData) => {
                console.log(responseData.message);
                item.id = responseData.itemId;
                this.items.push(item);
                this.itemSubject.next([...this.items]);
            });

    }

    editItem(itemData: Item) {
        // let index = this.items.indexOf(itemData);
        // this.items.splice(index, 1);
       
    }

    deleteItem(id: string) {
        this.http.delete<{message: string}>("http://localhost:3000/api/items/" + id)
            .subscribe((responseData) => {
                console.log(responseData.message)
                const updatedItems = this.items.filter(item => item.id !== id);
                this.items = updatedItems;
                this.itemSubject.next([...this.items]);
            });
        // let index = this.items.indexOf(itemData);
        // this.items.splice(index, 1);
        // this.itemSubject.next([...this.items]);

    }
}