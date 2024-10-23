import React, { useEffect } from "react";
import { TaskModel } from "../controllers/Types";
import { RecordController } from "../controllers/RecordController";
import AddViewEditTaskComponent from "./AddViewEditTaskComponent";

function TaskListPerUserComponent() {
  const [tasksList, setTasksList] = React.useState<TaskModel[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await RecordController.GetRecords({
      collectionName: "tasks",
      filter: `user_id = ${localStorage.getItem("bonanza_user_id")}`,
    });

    if (!response.success) {
      alert(response.message);
      return;
    }

    const data = response.data;
    if (!data || data.length === 0) {
      alert("No tasks found");
      return;
    }

    setTasksList([...data]);
  };

  return (
    <div>
      <button
        className="btn btn-outline btn-success"
        onClick={() => document.getElementById(`my_modal_0`)?.showModal()}
      >
        Add new task 📅
      </button>
      <AddViewEditTaskComponent
        task_model={{
          id: 0,
          title: "",
          deadline: new Date(),
          priority: 0,
          user_id: 0,
          desc: "",
          created: new Date(""),
          updated: new Date(""),
        }}
      />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              {/* TODO delete task id */}
              <th>Title</th>
              <th>Deadline</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasksList.map((task: TaskModel) => (
              <tr
                className="hover"
                key={task.id}
                onClick={() =>
                  document.getElementById(`my_modal_${task.id}`)?.showModal()
                }
              >
                <th>{task.id}</th>
                {/* TODO delete task id */}
                <td>{task.title}</td>
                <td>
                  {task.deadline.toString().split("T")[0]} -{" "}
                  {task.deadline
                    .toString()
                    .split("T")[1]
                    .replace("Z", "")
                    .slice(0, 5)}
                </td>
                <td>{task.priority}</td>
                <AddViewEditTaskComponent task_model={task} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      TaskAddEditComponent
    </div>
  );
}

export default TaskListPerUserComponent;
