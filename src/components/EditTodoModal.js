import { Button, Flex, Heading, View } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import TodoForm from "./TodoForm"; // TodoForm をインポート

export function EditTodoModal({
  userId,
  preTodo,
  updateTodo,
  handleEditModal,
}) {
  const [todo, setTodo] = useState({ ...preTodo, user: userId });

  return (
    <div className="overlay">
      <div className="content">
        <View className="header">
          <Heading level={2}>ToDO編集</Heading>
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
            <Button onClick={handleEditModal}>キャンセル</Button>
            <Button
              onClick={() => {
                updateTodo(todo);
                handleEditModal();
              }}
            >
              更新
            </Button>
          </Flex>
        </View>
      </div>
    </div>
  );
}
