import React from "react";

interface IUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

const UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/', {
    cache: "no-store",
  });

  const users: IUser[] = await res.json();

  return(
    <div>
      Welcome to the users page! Last update @ { new Date().toLocaleTimeString() }

      <div className={'flex flex-wrap gap-3'}>
        {
          users.map((user: IUser) => (
            <h3 key={user.id} className={'mt-3 py-3 px-6 shadow w-fit hover:shadow-lg'}>{user.name}</h3>
          ))
        }
      </div>
    </div>
  )
}

export default UsersPage;