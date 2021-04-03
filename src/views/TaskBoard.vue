<template>
  <v-container>
    <v-row justify="end">
      <v-col md="2">
        <v-btn
          color="primary"
          :to="{ name: 'edit', query: { isEdit: 'false' } }"
          >Create New Task</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="600px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="timeRange"
              label="Filter by Estimated Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="start"
            :max="end"
            full-width
            format="24hr"
          ></v-time-picker>
          <v-time-picker
            v-if="menu2"
            v-model="end"
            :min="start"
            full-width
            format="24hr"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <Board
        v-for="board in getBoards"
        :key="board.id"
        :board="board"
        :start="start"
        :end="end"
      ></Board>
    </v-row>
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Board from "@/components/board/Board";

export default {
  name: "TaskBoard",
  components: {
    Board,
  },
  data: () => ({
    start: "",
    end: "",
    menu2: null,
    time: "",
  }),
  computed: {
    ...mapGetters({
      boards: "allBoards",
    }),
    getBoards() {
      return this.boards;
    },
    timeRange() {
      if (this.start && this.end) {
        return this.start + " - " + this.end;
      }

      return "";
    },
  },
};
</script>
