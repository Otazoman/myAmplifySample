import { Button, Flex, Heading, View } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import TodoForm, { priorityList, statusList } from "./TodoForm"; // TodoForm をインポート

export function AddTodoModal({ userId, createTodo, handleAddModal }) {
  const [todo, setTodo] = useState({
    user: userId,
    title: undefined,
    status: statusList[0],
    priority: priorityList[0],
    start: undefined,
    end: undefined,
    description: undefined,
  });

  const isSaveDisabled = !todo.title || !todo.description;

  return (
    <div className="overlay">
      <div className="content">
        <View className="header">
          <Heading level={2}>ToDO追加</Heading>
        </View>
        <View margin="1rem">
          {/* TodoForm を呼び出す */}
          <TodoForm todo={todo} setTodo={setTodo} />

          <Flex
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            margin="1rem 0"
          >
            <Button onClick={handleAddModal}>キャンセル</Button>
            <Button
              onClick={() => {
                if (!isSaveDisabled) {
                  createTodo(todo);
                  handleAddModal();
                }
              }}
              disabled={isSaveDisabled} // 保存ボタンを無効にする
            >
              保存
            </Button>
          </Flex>
        </View>
      </div>
    </div>
  );
}
