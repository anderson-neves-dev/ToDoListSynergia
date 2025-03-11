import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./tasksColletion";
import SimpleSchema from "simpl-schema";
import { TaskInterface } from "/client/interfaces/task";
import { check } from "meteor/check";

Meteor.methods({
  // Inserir tarefa
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync(doc);
  },
  // Deletar tarefa
  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
  // Buscar por uma tarefa
  "tasks.findOne"({ _id }) {
    return TasksCollection.findOneAsync(_id);
  },
  "tasks.find"() {
    return TasksCollection.find();
  },
  // Busca paginada
  "tasks.paginated": async function (limit, skip, situacao, search) {
    new SimpleSchema({
      limit: { type: Number },
      skip: { type: Number },
      situacao: { type: Array, optional: true },
      "situacao.$": { type: String },
      search: { type: String, optional: true },
    }).validate({ limit, skip, situacao, search });

    const filtro = {
      $or: [{ privada: false }, { byUserId: this.userId }],
      ...(situacao?.length ? { situacao: { $in: situacao } } : {}),
      ...(search ? { nome: { $regex: search, $options: "i" } } : {}), // 🔹 Filtro de busca
    };

    const tasks = await TasksCollection.find(filtro, {
      sort: { agendadaPara: -1 },
      limit,
      skip,
    }).fetchAsync();

    const numero = await TasksCollection.find(filtro).countAsync();

    return { tasks, numero };
  },
  // Dados de insights
  "tasks.insights": async function () {
    const filtroBase = { $or: [{ privada: false }, { byUserId: this.userId }] };

    const qtdCadastrada = await TasksCollection.find({
      ...filtroBase,
      situacao: { $in: ["Cadastrada"] },
    }).countAsync();

    const qtdEmAndamento = await TasksCollection.find({
      ...filtroBase,
      situacao: { $in: ["Em Andamento"] },
    }).countAsync();

    const qtdFinalizada = await TasksCollection.find({
      ...filtroBase,
      situacao: { $in: ["Finalizada"] },
    }).countAsync();

    const total = await TasksCollection.find({
      ...filtroBase,
    }).countAsync();

    return { qtdCadastrada, qtdEmAndamento, qtdFinalizada, total };
  },

  "tasks.update"(taskId: string, task: any) {
    return TasksCollection.updateAsync(taskId, { $set: task });
  },

  // Atualização de dados de usuário
  "user.updateProfile"(userEdit: {
    nome: string;
    email: string;
    aniversario: string;
    empresa: string;
    sexo: string;
    profileImage: string;
  }) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Você precisa estar logado para editar seu perfil."
      );
    }

    check(userEdit, {
      nome: String,
      email: String,
      aniversario: String,
      empresa: String,
      sexo: String,
      profileImage: String,
    });

    Meteor.users.updateAsync(this.userId, {
      $set: {
        "profile.nome": userEdit.nome,
        "profile.email": userEdit.email,
        "profile.aniversario": userEdit.aniversario,
        "profile.empresa": userEdit.empresa,
        "profile.sexo": userEdit.sexo,
        "profile.profileImage": userEdit.profileImage,
      },
    });
  },
});
