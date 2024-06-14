import React, { useEffect, useState } from "react";
import { SeacrchPanel } from "./search-pannel";
import { List } from "./list";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "../../utils";

export interface UserType {
  name: string;
  id: string;
}

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState<UserType[]>([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`,
    ).then(async (response) => {
      //Fetchapi ok属性?
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);
  //初始化用户数据
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      //Fetchapi ok属性?
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <>
      <SeacrchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </>
  );
};
