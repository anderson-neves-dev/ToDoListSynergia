import { Meteor } from "meteor/meteor";
import { useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/tasksColletion";

// Função assíncrona que retorna a contagem de tasks usando um método Meteor
export function getTasksCountAsync() {
  const isLoading = useSubscribe("tasks");
  console.log("ddd", TasksCollection.find().fetch().length);
  return TasksCollection.find().fetch().length;
}
