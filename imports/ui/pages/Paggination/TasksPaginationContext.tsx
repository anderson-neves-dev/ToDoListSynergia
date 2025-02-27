import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Meteor } from "meteor/meteor";
import { TaskInterface } from "/client/interfaces/task";
import { useSubscribe } from "meteor/react-meteor-data";

// 📌 Define the shape of the context
interface TasksPaginationContextType {
  tasks: any[];
  page: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  setPage: (newPage: number) => void;
  deletarTask: (id: string) => void;
  user: string;
}

// 🔹 Create the context
const TasksPaginationContext = createContext<
  TasksPaginationContextType | undefined
>(undefined);

// 🔹 Provider component
export const TasksPaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pageSize = 4; // Define the number of tasks per page
  const [page, setPage] = useState(1); // MUI pagination starts at 1
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const user = Meteor.userId();
  const isLoading = useSubscribe("tasks");
  // Function to fetch tasks
  const fetchTasks = (currentPage: number) => {
    const skipValue = (currentPage - 1) * pageSize; // Convert page to zero-based index
    setLoading(true);

    Meteor.call("tasks.paginated", pageSize, skipValue, (error, result) => {
      if (error) {
        console.error("Erro ao buscar tarefas:", error);
        setTasks([]);
        setTotalCount(0);
      } else {
        setTasks((result.tasks as TaskInterface[]) || []);
        setTotalCount(result.numero || 0);
      }
      setLoading(false);
    });
  };

  // Fetch tasks when `page` changes
  useEffect(() => {
    fetchTasks(page);
  }, [page]);
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
        loading, // const filteredTasks: TaskInterface[] = useTracker(() => {
        //   if (situacao === "Todas") {
        //     return tasks as TaskInterface[];
        //   }
        //   return TasksCollection.find({ situacao }).fetch() as TaskInterface[];
        // });
        setPage,
        deletarTask,
        user,
      }}
    >
      {children}
    </TasksPaginationContext.Provider>
  );
};

// 🔹 Hook to use the context in any component
export const useTasksPagination = () => {
  const context = useContext(TasksPaginationContext);
  if (!context) {
    throw new Error(
      "useTasksPagination must be used within a TasksPaginationProvider"
    );
  }
  return context;
};
