import { CHANGE, managedChild, ManagedRecord, PageViewActivity, service } from "typescene";
import { TodoItem } from "../../services/TodoService";
import view from "./view";

export class MainActivity extends PageViewActivity.with(view) {
  constructor() {
    super();
    service("App.Todo")(this, "todo");
    this.path = "/";

    managedChild(this, "formInput");
    this.formInput = ManagedRecord.create({
      newTask: ""
    });
  }

  // event handlers:

  addTask() {
    this.todo.addItem(this.formInput.newTask);
    this.formInput.newTask = "";
    this.formInput.emit(CHANGE);
  }

  toggleTask(e) {
    if (e.object instanceof TodoItem) {
      e.object.complete = !e.object.complete;
      e.object.emit(CHANGE);
    }
  }

  removeCompleted() {
    this.todo.removeCompleted();
  }
}
