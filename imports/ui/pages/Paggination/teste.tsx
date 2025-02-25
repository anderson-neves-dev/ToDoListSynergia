import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/tasksColletion";
import { Counts } from "meteor/tmeasday:publish-counts";
import { Meteor } from "meteor/meteor";
import { useEffect } from "react";
import { getTasksCountAsync } from "./quantidadeTasks";

function TodoList() {
  const pageSize = 2;
  const [page, setPage] = useState(0); // índice da página (0 para a primeira página)
  const skip = page * pageSize;
  const [count, setTotalCount] = useState(0);
  setTotalCount(getTasksCountAsync());
  console.log({ count });
  const { tasks, totalCount, loading } = useTracker(() => {
    const subsPaginated = Meteor.subscribe("tasks.paginated", pageSize, skip);

    // Aplica skip e limit na consulta para exibir somente os itens da página atual
    const tasks = TasksCollection.find().fetch();

    const totalCount = count;
    return {
      tasks,
      totalCount,
      loading: !subsPaginated.ready(),
    };
  }, [page]);

  const nextPage = () => {
    if ((page + 1) * pageSize < totalCount) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.nome}</li>
        ))}
      </ul>
      <div>
        <button onClick={prevPage} disabled={page === 0}>
          Voltar
        </button>
        <button
          onClick={nextPage}
          disabled={(page + 1) * pageSize >= totalCount}
        >
          Avançar
        </button>
      </div>
      <p>
        Página {page + 1} de {Math.ceil(totalCount / pageSize)}
      </p>
    </div>
  );
}

export default TodoList;
