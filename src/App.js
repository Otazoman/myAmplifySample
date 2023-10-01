import {
  Button,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { API, Amplify, Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import "./App.css";
import config from "./aws-exports";
import { AddTodoModal } from "./components/AddTodoModal";
import { EditTodoModal } from "./components/EditTodoModal";
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
  updateTodo as updateTodoMutation,
} from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { SetUIVocabularies } from "./translateLanguage";

Amplify.configure(config);
SetUIVocabularies("ja");

function App({ signOut }) {
  const [user, setUser] = useState({ id: "", name: "" });
  const [todos, setTodos] = useState([]);
  const [preTodo, setPreTodo] = useState({});
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((userInfo) => {
      setUser({ id: userInfo.attributes.sub, name: userInfo.username });
    });
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    const todosFromAPI = apiData.data.listTodos.items;
    setTodos(todosFromAPI);
  }

  function handleAddModal() {
    if (isOpenAddModal === false) {
      setIsOpenAddModal(true);
    } else if (isOpenAddModal === true) {
      setIsOpenAddModal(false);
    }
  }

  function handleEditModal() {
    if (isOpenEditModal === false) {
      setIsOpenEditModal(true);
    } else if (isOpenEditModal === true) {
      setIsOpenEditModal(false);
    }
  }

  async function createTodo(event) {
    const data = {
      title: event.title,
      status: event.status,
      priority: event.priority,
      start: event.start,
      end: event.end,
      description: event.description,
      user: event.user,
    };
    await API.graphql({
      query: createTodoMutation,
      variables: { input: data },
    });
    fetchTodos();
  }

  async function updateTodo(event) {
    const data = {
      id: event.id,
      title: event.title,
      status: event.status,
      priority: event.priority,
      start: event.start,
      end: event.end,
      description: event.description,
      user: event.user,
    };
    await API.graphql({
      query: updateTodoMutation,
      variables: { input: data },
    });
    fetchTodos();
  }

  async function deleteTodo({ id }) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    await API.graphql({
      query: deleteTodoMutation,
      variables: { input: { id } },
    });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <View className="App" margin="0 3rem">
        <View className="header">
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading level={1}>ToDo管理</Heading>
            <Flex direction="row">
              <p>{user.name}</p>
              <Button onClick={signOut}>サインアウト</Button>
            </Flex>
          </Flex>
        </View>
        <View className="add-todo-button" margin="1rem 1rem">
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button onClick={handleAddModal}>追加 +</Button>
          </Flex>
        </View>
        {isOpenAddModal === true && (
          <AddTodoModal
            userId={user.id}
            createTodo={createTodo}
            handleAddModal={handleAddModal}
          ></AddTodoModal>
        )}
        {isOpenEditModal === true && (
          <EditTodoModal
            userId={user.id}
            preTodo={preTodo}
            updateTodo={updateTodo}
            handleEditModal={handleEditModal}
          ></EditTodoModal>
        )}
        <View margin="3rem 0">
          <Table caption="" highlightOnHover={false}>
            <TableHead>
              <TableRow>
                <TableCell as="th">ID.</TableCell>
                <TableCell as="th">タイトル</TableCell>
                <TableCell as="th">ステータス</TableCell>
                <TableCell as="th">優先度</TableCell>
                <TableCell as="th">期間</TableCell>
                <TableCell as="th">説明</TableCell>
                <TableCell as="th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.status}</TableCell>
                  <TableCell>{todo.priority}</TableCell>
                  <TableCell>
                    {todo.start} - {todo.end}
                  </TableCell>
                  <TableCell>
                    {todo.description ? todo.description : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      margin="0 1rem"
                      onClick={() => {
                        setPreTodo(todo);
                        handleEditModal();
                      }}
                    >
                      編集
                    </Button>
                    <Button onClick={() => deleteTodo(todo)}>削除</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </View>
      </View>
    </LocalizationProvider>
  );
}

export default withAuthenticator(App);
