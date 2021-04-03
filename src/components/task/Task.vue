<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :to="{ name: 'edit', query: { isEdit: 'true' }, params: { ...task, boardId } }"
      :elevation="hover ? 6 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-title>
        {{ task.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ task.description }}
        <div v-if="task.estimatedTime">
          Estimated Time: {{ task.estimatedTime }}
        </div>
      </v-card-subtitle>
      <v-card-text>
        <v-img
          contain
          max-height="150"
          max-width="250"
          :src="task.attachment"
        ></v-img>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["task", "boardId"],
};
</script>
