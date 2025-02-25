// import { Meteor } from "meteor/meteor";
// import { TasksCollection } from "./tasksColletion";
// import SimpleSchema from "simpl-schema";
// import { Counts } from "meteor/tmeasday:publish-counts";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./tasksColletion";
import SimpleSchema from "simpl-schema";
import { Counts } from "meteor/tmeasday:publish-counts";

Meteor.publish("tasks", function () {
  const byUserId = this.userId;
  if (!byUserId) {
    return this.ready();
  }
  return TasksCollection.find({ byUserId });
});

Meteor.methods({
  async "tasks.agregation"(limit, skip) {
    new SimpleSchema({
      limit: { type: Number },
      skip: { type: Number },
    }).validate({ limit, skip });

    if (!this.userId) {
      throw new Meteor.Error("Não autorizado");
    }

    const pipeline = [
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      },
    ];

    const results = await TasksCollection.rawCollection()
      .aggregate(pipeline)
      .toArray();
    const result = results[0] || { totalCount: [], data: [] };
    const totalCount = result.totalCount[0] ? result.totalCount[0].count : 0;

    return {
      totalCount,
      data: result.data,
    };
  },
});

// Meteor.publish("tasks.paginated", function (limit, skip) {
//   new SimpleSchema({
//     limit: { type: Number },
//     skip: { type: Number },
//   }).validate({ limit, skip });

//   const selector = { byUserId: this.userId }; // ou remova se não quiser filtrar por usuário

//   const options = {
//     sort: { criadaEm: -1 },
//     limit: Math.min(limit, MAX_TASKS),
//     skip: skip,
//   };

//   return TasksCollection.find(selector, options);
// });

Meteor.publish("tasks.paginated", function (limit, skip) {
  new SimpleSchema({
    limit: { type: Number },
    skip: { type: Number },
  }).validate({ limit, skip });

  const options = {
    sort: { criadaEm: -1 },
    limit: limit,
    skip: skip,
  };
  const task = TasksCollection.find({}, options).fetch();
  const totalCount = TasksCollection.find({}, options).fetch().length;
  return { task, totalCount };
});

Meteor.publish("tasks.count", function (page = 1, pageSize = 10) {
  if (!this.userId) {
    return this.ready();
  }

  const skip = (page - 1) * pageSize;
  const itemCursor = TasksCollection.find(
    {},
    {
      skip: skip,
      limit: pageSize,
    }
  ).count();
  this.added("counts", "tasksCountId", { total: itemCursor });
  this.ready();
});
