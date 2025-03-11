import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Meteor } from "meteor/meteor";
import { TaskInterface } from "/client/interfaces/task";
import { useSubscribe } from "meteor/react-meteor-data";
import { TasksInsights } from "/client/interfaces/taskInsights";

interface TasksPaginationContextType {
  tasks: any[];
  page: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  setPage: (newPage: number) => void;
  deletarTask: (id: string) => void;
  user: string;
  situacao: string[];
  handleToggleSituacao: (value) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  tasksInsights: TasksInsights;
}
// Criando um contexto pela interface
const TasksPaginationContext = createContext<
  TasksPaginationContextType | undefined
>(undefined);

export const TasksPaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [tasksInsights, setTasksInsights] = useState<TasksInsights>();
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [situacao, setSituacao] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const handleToggleSituacao = (value) => {
    setSituacao((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const user = Meteor.userId();
  const isLoading = useSubscribe("tasks");

  // Função para pegar os dados paginados
  const fetchTasks = (currentPage: number) => {
    const skipValue = (currentPage - 1) * pageSize;
    setLoading(true);

    Meteor.call(
      "tasks.paginated",
      pageSize,
      skipValue,
      situacao,
      search,
      (error, result) => {
        if (error) {
          console.error("Erro ao buscar tarefas:", error);
          setTasks([]);
          setTotalCount(0);
        } else {
          setTasks((result.tasks as TaskInterface[]) || []);
          setTotalCount(result.numero || 0);
        }
        setLoading(false);
      }
    );
  };

  // useFetch para notar mudanças de estado e chamar novos dados
  useEffect(() => {
    fetchTasks(page);
  }, [page, situacao, search]);

  // Função para pegar os dados da tela de Insights
  const fetchInsights = () => {
    Meteor.call("tasks.insights", (error, result) => {
      if (error) {
        console.error("Erro ao buscar insights:", error);
      } else {
        console.log({ result });
        setTasksInsights(result as TasksInsights);
        console.log({ tasksInsights });
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchInsights();
  }, []);

  // Função para deletar tarefas
  const deletarTask = (id: string) => {
    console.log("chegou aqui", id);
    Meteor.call("tasks.delete", { _id: id }, (deleteError, result) => {
      if (deleteError) {
        return deleteError;
      } else {
        console.log("Excluido", result);
        fetchTasks(page);

        return result;
      }
    });
  };
  return (
    <TasksPaginationContext.Provider
      value={{
        tasks,
        page,
        pageSize,
        totalCount,
        loading,
        setPage,
        deletarTask,
        user,
        situacao,
        handleToggleSituacao,
        search,
        setSearch,
        tasksInsights,
      }}
    >
      {children}
    </TasksPaginationContext.Provider>
  );
};

export const useTasksPagination = () => {
  const context = useContext(TasksPaginationContext);
  if (!context) {
    throw new Error(
      "useTasksPagination deve ser usado dentro de um TasksPaginationProvider"
    );
  }
  return context;
};
