import { CHANGE, managedChild, ManagedRecord, PageViewActivity, service } from "typescene";
import { TodoItem } from "../../services/TodoService";
import view from "./view";

export default class MainActivity extends PageViewActivity.with(view) {
  constructor() {
    super();
    this.path = "/";

    managedChild(this, "formInput");
    this.formInput = ManagedRecord.create({
      newTask: ""
    });
  }

  async onManagedStateActiveAsync() {
    await super.onManagedStateActiveAsync();
    console.log("MainActivity is now active");
  }

  addTask() {
    this.todoService.addItem(this.formInput.newTask);
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
    this.todoService.removeCompleted();
  }
}

service("App.Todo", MainActivity, "todoService");
