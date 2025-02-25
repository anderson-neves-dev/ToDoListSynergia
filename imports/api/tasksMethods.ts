import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./tasksColletion";

Meteor.methods({
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync(doc);
  },

  "tasks.toggleChecked"({ _id, isChecked }) {
    return TasksCollection.updateAsync(_id, {
      $set: { isChecked: !isChecked },
    });
  },

  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },

  "tasks.findOne"({ _id }) {
    return TasksCollection.findOneAsync(_id);
  },
  "tasks.find"() {
    return TasksCollection.find();
  },

  "tasks.getTotalCount"() {
    // Se precisar filtrar (ex: { byUserId: this.userId }), ajuste o selector
    return TasksCollection.find().fetch().length;
  },
});
