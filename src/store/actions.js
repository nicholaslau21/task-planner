import axios from "axios";

export default {
  async fetchData({ commit }) {
    return axios.get("/boards.json").then((res) => {
      commit("SET_INITIAL_DATA", res.data);
    });
  },
  async saveTask({ commit }, payload) {
    commit("SAVE_TASK", payload);
  },
  async deleteTask({ commit }, payload) {
    commit("DELETE_TASK", payload)
  },
  async reorderBoardItems({ commit }, payload) {
    commit("REORDER_BOARD_ITEMS", payload)
  },
};
