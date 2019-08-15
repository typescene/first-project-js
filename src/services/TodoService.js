import { CHANGE, managedChild, ManagedList, ManagedRecord, ManagedService, observe } from "typescene";

/** Represents a single to-do item */
export class TodoItem extends ManagedRecord {
  constructor(text) {
    super();
    this.text = text;
    this.complete = false;
  }
}

export default class TodoService extends ManagedService {
  constructor() {
    super();
    this.name = "App.Todo";
    this.nCompleted = 0;
    this.nRemaining = 0;
    managedChild(this, "items");
    this.items = new ManagedList()
      .restrict(TodoItem)
      .propagateEvents();
  }

  addItem(text) {
    if (text) this.items.add(new TodoItem(text));
  }

  removeCompleted() {
    this.items.forEach(it => {
      if (it.complete) this.items.remove(it);
    });
  }
}

observe(TodoService, class {
  constructor(svc) { this.svc = svc }
  onItemsChangeAsync() {
    let nCompleted = this.svc.items
      .pluck("complete")
      .filter(b => b).length;
    let total = this.svc.items.count;
    this.svc.nCompleted = nCompleted;
    this.svc.nRemaining = total - nCompleted;
    this.svc.emit(CHANGE);
  }
})