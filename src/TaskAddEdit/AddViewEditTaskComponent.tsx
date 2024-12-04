import React, { useEffect } from "react";
import { TaskModel } from "../controllers/Types";
import { RecordController } from "../controllers/RecordController";
import useUserSelectComponent from "../UserSelect/UserSelectComponent";
import FileUploader from "./FileUploadComponent";
import FileListDownloader from "./DownloadFileComponent";

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
      values: {
        ...taskRecord,
        deadline: new Date(taskRecordDate),
        user_id: user.id,
      },
    });

    if (!resp.success) {
      alert(resp.message);
      return;
    }

    window.location.reload();
  };

  const deleteTask = async () => {
    const task_id_to_delete = task_model.id;

    const resp = await RecordController.DeleteData({
      collectionName: "tasks",
      ID: task_id_to_delete,
    });

    if (!resp.success) {
      alert(resp.message);
      return;
    }

    document.getElementById(`my_modal_${task_id_to_delete}`)?.close();
    window.location.reload();
  };

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

          {task_model.id === 0 && (
            <div>
              {" "}
              {render} {user.id} - {user.username} - {user.email}
            </div>
          )}

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

          {task_model.id !== 0 && (<FileUploader task_id={task_model.id}>

          </FileUploader>)
                  
              }

          {task_model.id !== 0 && (<FileListDownloader file_id={task_model.id}/>)}

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

          {task_model.id !== 0 && (
            <div className="form-control w-52">
              <label className="label cursor-pointer">
                <span className="label-text">Is task finished</span>
                <input
                  type="checkbox"
                  checked={
                    taskRecord.finished !== null && taskRecord.finished
                      ? true
                      : false
                  }
                  className="toggle toggle-accent"
                  onChange={(e) =>
                    setTaskRecord({
                      ...taskRecord,
                      finished:
                        taskRecord.finished == null || !taskRecord.finished
                          ? true
                          : false,
                    })
                  }
                />
              </label>
            </div>
          )}

          {task_model.id === 0 && (
            <button
              className="btn btn-outline btn-info"
              onClick={saveNewChanges}
            >
              Save new record
            </button>
          )}

          <div className="flex space-x-4 w-full justify-center">
            {task_model.id !== 0 && (
              <button
                className="btn btn-outline btn-error w-1/2"
                onClick={deleteTask}
              >
                Delte task
              </button>
            )}

            {task_model.id !== 0 && (
              <button
                className="btn btn-outline btn-info w-1/2"
                onClick={saveChanges}
              >
                Save changes
              </button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AddViewEditTaskComponent;
