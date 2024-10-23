import React, { useEffect, useState } from "react";
import { DataListModel, UserModel } from "../controllers/Types";
import { RecordController } from "../controllers/RecordController";

function useUserSelectComponent() {
  const [userNameValue, setUserNameValue] = useState<string>("");
  const [foundUsers, setFoundUsers] = useState<UserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserModel>({});

  useEffect(() => {
    async function fetchAsync() {
      if (userNameValue.length <= 0) {
        setFoundUsers([]);
        return;
      }

      const m: DataListModel = {
        collectionName: "users",
        filter: `username like '%${userNameValue}%' OR email like '%${userNameValue}%' `,
      };
      const response = await RecordController.GetRecords(m);
      if (response.data !== null && response.data.length > 0) {
        setFoundUsers(response.data);
      } else {
        setFoundUsers([]);
      }
    }
    fetchAsync();
  }, [userNameValue]);

  const handleSelectUser = () => {
    //onClose(user);

    document.getElementById("select_user_modal")?.close();
  };

  return {
    user: selectedUser,
    render: (
      <div>
        <button
          className="btn"
          onClick={() =>
            document.getElementById("select_user_modal")?.showModal()
          }
        >
          Select User
        </button>
        <dialog id="select_user_modal" className="modal">
          <div className="modal-box flex flex-col space-y-4">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Select User</h3>
            <input
              type="text"
              placeholder="Enter username or email"
              className="input input-bordered w-full max-w-xs"
              value={userNameValue}
              onChange={(e) => setUserNameValue(e.target.value)}
            />
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>ID</th>
                  {/* TODO delete task id */}
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {foundUsers.map((user: UserModel) => (
                  <tr
                    className="hover"
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      handleSelectUser();
                    }}
                  >
                    <th>{user.id}</th>
                    {/* TODO delete task id */}
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </dialog>
      </div>
    ),
  };
}

export default useUserSelectComponent;
