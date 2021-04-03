import Vue from "vue";

const UUIDGenerator = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

export default {
  SET_INITIAL_DATA(state, payload) {
    state.boards = payload;
  },

  SAVE_TASK(state, payload) {
    const boardIndex = state.boards.findIndex((b) => b.id == payload.board);
    const taskIndex = state.boards[boardIndex].items.findIndex(
      (task) => task.id == payload.id
    );

    if (taskIndex > -1) {
      Vue.set(state.boards[boardIndex].items, taskIndex, {
        ...state.boards[boardIndex].items[taskIndex],
        title: payload.title,
        description: payload.description,
        attachment: payload.attachment,
        estimatedTime: payload.estimatedTime,
      });
    } else {
      if (payload.originalBoard) {
        const originalBoardIndex = state.boards.findIndex(
          (b) => b.id == payload.originalBoard
        );
        const originalTaskIndex = state.boards[
          originalBoardIndex
        ].items.findIndex((task) => task.id == payload.id);

        state.boards[originalBoardIndex].items.splice(originalTaskIndex, 1);
      }

      state.boards[boardIndex].items.push({
        id: UUIDGenerator(),
        title: payload.title,
        description: payload.description,
        attachment: payload.attachment,
        estimatedTime: payload.estimatedTime,
      });
    }
  },

  DELETE_TASK(state, payload) {
    const boardIndex = state.boards.findIndex((b) => b.id == payload.id);
    const itemIdx = state.boards[boardIndex].items.findIndex(
      (item) => item.id == payload.taskId
    );

    if (itemIdx > -1) {
      Vue.delete(state.boards[boardIndex].items, itemIdx);
    }
  },

  REORDER_BOARD_ITEMS(state, payload) {
    const board = state.boards.find((b) => b.id == payload.boardId);
    Vue.set(board, "items", payload.items);
  },
};
