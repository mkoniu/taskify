import React, { useEffect } from "react";
import { TaskModel } from "../controllers/Types";
import { RecordController } from "../controllers/RecordController";
import AddViewEditTaskComponent from "./AddViewEditTaskComponent";

function TaskListPerUserComponent() {
  const [tasksList, setTasksList] = React.useState<TaskModel[]>([]);
  const [tab, setTab] = React.useState<string>("Current tasks");
  const tabList = ["Current tasks", "Finished tasks", "All tasks"];

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    getTasks();
  }, [tab]);

  const getTasks = async () => {
    let filterQ = "";

    if (tab === "Current tasks") {
      filterQ = `user_id = ${localStorage.getItem(
        "bonanza_user_id"
      )} AND (finished IS NULL OR finished = 0)`;
    }
    if (tab === "Finished tasks") {
      filterQ = `user_id = ${localStorage.getItem(
        "bonanza_user_id"
      )} AND (finished = 1)`;
    }

    const response = await RecordController.GetRecords({
      collectionName: "tasks",
      filter: filterQ,
    });

    if (!response.success) {
      alert(response.message);
      return;
    }

    const data = response.data;
    if (!data || data.length === 0) {
      setTasksList([]);
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
      <div role="tablist" className="tabs tabs-boxed">
        {tabList.map((tabElem) => (
          <a
          role="tab"
          onClick={() => setTab(tabElem)}
          className={`tab ${tab === tabElem ? "tab-active" : ""}`}
          key={tabElem}
        >
          {tabElem}
        </a>
        ))}
        
      </div>
      <div className="overflow-x-auto p-2 m-5 rounded-md shadow">
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
                className="hover rounded-md rounded hover:shadow transition duration-300 ease-in-out"
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
