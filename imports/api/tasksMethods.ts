import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./tasksColletion";
import SimpleSchema from "simpl-schema";
import { TaskInterface } from "/client/interfaces/task";

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
  "tasks.paginated": async function (limit, skip) {
    new SimpleSchema({
      limit: { type: Number },
      skip: { type: Number },
    }).validate({ limit, skip });

    const filtro = {
      $or: [{ privada: true }, { byUserId: this.userId }],
    };
    const tasks = await TasksCollection.find(filtro, {
      sort: { agendadaPara: -1 },
      limit,
      skip,
    }).fetchAsync();

    const numero = await TasksCollection.find(filtro).countAsync();
    return { tasks, numero };
  },
  "tasks.update"(taskId: string, task: any) {
    return TasksCollection.updateAsync(taskId, { $set: task });
  },
});
