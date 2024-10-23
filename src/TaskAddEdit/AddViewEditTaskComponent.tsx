import React, { useEffect } from "react";
import { TaskModel } from "../controllers/Types";
import { RecordController } from "../controllers/RecordController";
import useUserSelectComponent from "../UserSelect/UserSelectComponent";

function AddViewEditTaskComponent({ task_model }: { task_model: TaskModel }) {
  const [taskRecord, setTaskRecord] = React.useState<TaskModel>({});
  const { user, render } = useUserSelectComponent();
  const [taskRecordDate, setTaskRecordDate] = React.useState("");

  useEffect(() => {
    // task_model.deadline = task_model.deadline ? task_model.deadline : new Date(Date.now());;

    setTaskRecord(task_model);
  }, []);


  // useEffect(() => {
  //   
  // }, [user]);

  const saveChanges = async () => {
    if (task_model.id === 0) {
      return;
    }

    const resp = await RecordController.UpdateData({
      collectionName: "tasks",
      values: { ...taskRecord },
      ID: taskRecord.id,
    });

    if (!resp.success) {
      alert(resp.message);
      return;
    }

    window.location.reload();
  };

  const saveNewChanges = async () => {
    if (task_model.id !== 0) {
      return;
    }

    if (!taskRecordDate || taskRecordDate === "") {
      alert("Please select a date");
      return;
    }

    if (user.id === null || user.id === 0) {
      alert("Please select user");
      return;
    }

    const resp = await RecordController.InsertData({
      collectionName: "tasks",
      values: { ...taskRecord, deadline: new Date(taskRecordDate) , user_id: user.id},
    });

    if (!resp.success) {
      alert(resp.message);
      return;
    }

    window.location.reload();
  };

  // const handleSelectUser = () => {
  //   alert("from normal handleSelectUser " + JSON.stringify(e));

  //   //alert(JSON.stringify(e));

  //   setTaskRecord({ ...taskRecord, user_id: e.id });
  // };

  return (
    <div>
      {/* <button
        className="btn"
        onClick={() => document.getElementById(`my_modal_${task_id}`)?.showModal()}
      >
        open modal
      </button> */}
      <dialog id={`my_modal_${taskRecord.id}`} className="modal">
        <div className="modal-box flex space-y-4 flex-col">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Task ID: {taskRecord.id}</h3>
          {/* TODO delete task id */}
          <input
            type="text"
            placeholder="Enter title here"
            className="input input-bordered w-full max-w-xs"
            value={taskRecord.title}
            onChange={(e) =>
              setTaskRecord({ ...taskRecord, title: e.target.value })
            }
          />

          {task_model.id === 0 && <div> {render} {user.id} - {user.username} - {user.email}</div>}

          {task_model.id !== 0 && (
            <input
              type="datetime-local"
              placeholder="Select Date"
              className="input input-bordered w-full max-w-xs"
              value={
                taskRecord.deadline
                  ? taskRecord.deadline.toString().slice(0, 16)
                  : ""
              }
            />
          )}

          {task_model.id === 0 && (
            <input
              type="datetime-local"
              placeholder="Select Date"
              className=" input input-bordered w-full max-w-xs"
              value={`${taskRecordDate}`}
              onChange={(e) => setTaskRecordDate(e.target.value)}
            />
          )}

          <textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            value={taskRecord.desc}
            onChange={(e) =>
              setTaskRecord({ ...taskRecord, desc: e.target.value })
            }
          ></textarea>

          <input
            type="number"
            placeholder="Priority"
            className="input input-bordered w-full max-w-xs"
            value={taskRecord.priority}
            onChange={(e) =>
              setTaskRecord({
                ...taskRecord,
                priority: Number(e.target.value),
              })
            }
          />
          {task_model.id === 0 && (
            <button
              className="btn btn-outline btn-info"
              onClick={saveNewChanges}
            >
              Save new record
            </button>
          )}

          {task_model.id !== 0 && (
            <button className="btn btn-outline btn-info" onClick={saveChanges}>
              Save changes
            </button>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default AddViewEditTaskComponent;
