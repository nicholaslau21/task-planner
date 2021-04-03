<template>
  <v-col>
    <v-card>
      <v-card-title class="justify-center">
        {{ board.name }}
      </v-card-title>
      <div class="pa-2 grey lighten-4">
        <draggable v-model="tasks" v-bind="dragOptions">
          <Task
            class="mt-2"
            v-for="task in tasks"
            :task="task"
            :boardId="board.id"
            :key="task.id"
          ></Task>
        </draggable>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import Task from "@/components/task/Task";
import Draggable from "vuedraggable";
import { mapActions } from "vuex";

export default {
  name: "Board",
  components: {
    Task,
    Draggable,
  },
  props: ["board", "start", "end"],
  methods: {
    ...mapActions({
      reorderBoardItems: "reorderBoardItems",
    }),
  },
  computed: {
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "list-items",
      };
    },
    tasks: {
      get() {
        let items = this.board.items;

        if (this.start && this.end) {
          return items.filter(
            (item) =>
              item.estimatedTime >= this.start && item.estimatedTime <= this.end
          );
        }

        return items;
      },
      set(reorderedListItems) {
        const payload = {
          boardId: this.board.id,
          items: reorderedListItems,
        };
        this.reorderBoardItems(payload);
      },
    },
  },
};
</script>
