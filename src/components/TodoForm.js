import {
  Flex,
  SelectField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

const statusList = ["新規", "対応中", "保留", "解決", "完了"];
const priorityList = ["緊急", "高", "中", "低", "ブロッカー"];

const TodoForm = ({ todo, setTodo }) => {
  return (
    <Flex direction="column">
      <TextField
        placeholder="ToDo内容を入力"
        label="タイトル"
        value={todo.title}
        onChange={(i) => {
          setTodo({ ...todo, title: i.target.value });
        }}
      />
      <TextAreaField
        label="説明"
        placeholder="説明内容を入力"
        value={todo.description}
        onChange={(i) => {
          setTodo({ ...todo, description: i.target.value });
        }}
      />
      <SelectField
        label="ステータス"
        value={todo.status}
        onChange={(i) => {
          setTodo({ ...todo, status: i.target.value });
        }}
      >
        {statusList.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </SelectField>
      <SelectField
        label="優先度"
        value={todo.priority}
        onChange={(i) => {
          setTodo({ ...todo, priority: i.target.value });
        }}
      >
        {priorityList.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </SelectField>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        margin="1rem 0"
      >
        <DatePicker
          label="開始日"
          value={todo.start ? dayjs(todo.start) : null}
          onChange={(i) => {
            setTodo({ ...todo, start: dayjs(i).format("YYYY-MM-DD") });
          }}
        />
        <span>-</span>
        <DatePicker
          label="終了日"
          value={todo.end ? dayjs(todo.end) : null}
          onChange={(i) => {
            setTodo({ ...todo, end: dayjs(i).format("YYYY-MM-DD") });
          }}
        />
      </Flex>
    </Flex>
  );
};

export default TodoForm;
export { priorityList, statusList };
