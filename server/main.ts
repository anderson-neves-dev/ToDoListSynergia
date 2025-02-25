import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/api/tasksColletion";
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";
import { TaskInterface } from "/client/interfaces/task";

const insertTask = (newTask: TaskInterface) =>
  TasksCollection.insertAsync(newTask);

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = await Accounts.findUserByUsername(SEED_USERNAME);
  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      {
        nome: "Lavar Louça",
        descricao: "Lavar todas as vasilhas sujas que estão na pia.",
        criadaEm: new Date("2025-02-19T10:00:00"),
        agendadaPara: new Date("2025-02-20T18:00:00"),
        situacao: "Cadastrada" as "Cadastrada", // Asserção de tipo literal
        byUserId: user?._id,
        privada: true,
        usuarioNome: user?.username,
      },
      {
        nome: "Finalizar Relatório",
        descricao:
          "Preparar o relatório final do projeto até o prazo estipulado.",
        criadaEm: new Date("2025-02-18T08:30:00"),
        agendadaPara: new Date("2025-02-21T17:00:00"),
        situacao: "Em Andamento" as "Em Andamento",
        byUserId: user?._id,
        privada: false,
        usuarioNome: user?.username,
      },
      {
        nome: "Reunião com o Cliente",
        descricao:
          "Discutir os próximos passos e ajustes solicitados pelo cliente.",
        criadaEm: new Date("2025-02-17T09:00:00"),
        agendadaPara: new Date("2025-02-22T15:00:00"),
        situacao: "Concluída" as "Concluída",
        byUserId: user?._id,
        privada: true,
        usuarioNome: user?.username,
      },
      {
        nome: "Planejar Férias",
        descricao: "Organizar os documentos e a agenda de férias.",
        criadaEm: new Date("2025-02-15T11:00:00"),
        agendadaPara: new Date("2025-03-01T12:00:00"),
        situacao: "Cadastrada" as "Cadastrada",
        byUserId: user?._id,
        privada: true,
        usuarioNome: user?.username,
      },
    ].forEach((task) => insertTask(task));
  }
});
