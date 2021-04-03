<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <form>
          <v-card-title>
            <span class="headline" v-if="!isEdit">New Task</span>
            <span class="headline" v-else>Edit Task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Title*"
                    v-model="title"
                    :error-messages="titleError"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="description"
                    :error-messages="descriptionError"
                    label="Description*"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input
                    accept="image/*"
                    label="Attachment"
                    v-model="chosenFile"
                  ></v-file-input>
                </v-col>
                <v-col v-if="attachment" cols="12" sm="6">
                  <v-img
                    contain
                    max-height="150"
                    max-width="250"
                    :src="attachment"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="time"
                        label="Estimated Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                      format="24hr"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="board"
                    :error-messages="boardError"
                    :items="boardItems"
                    label="Board*"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="isEdit" color="red" text @click="deleteItem">
              Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$router.go(-1)">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  validations: {
    title: { required },
    description: { required },
    board: { required },
  },
  created() {
    if (this.$route.query.isEdit === "true") {
      this.title = this.$route.params.title;
      this.description = this.$route.params.description;
      this.attachment = this.$route.params.attachment;
      this.time = this.$route.params.estimatedTime;
      this.board = this.$route.params.boardId;
      this.originalBoard = this.$route.params.boardId;
      this.isEdit = true;
    }

    this.dialog = true;
  },
  data: () => ({
    dialog: false,
    isEdit: false,
    boardItems: [
      { text: "Pending", value: "pendingBoard" },
      { text: "Processing", value: "processingBoard" },
      { text: "Done", value: "doneBoard" },
    ],
    title: "",
    description: "",
    board: "",
    originalBoard: "",
    chosenFile: null,
    attachment: null,
    time: null,
    menu2: false,
  }),
  methods: {
    ...mapActions({
      saveTask: "saveTask",
      deleteTask: "deleteTask",
    }),
    save: function() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      let data = {
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        board: this.board,
        attachment: this.attachment,
        estimatedTime: this.time,
        originalBoard: this.originalBoard,
      };

      if (this.chosenFile) {
        var reader = new FileReader();

        reader.readAsDataURL(this.chosenFile);
        reader.onload = () => {
          this.attachment = reader.result;
          data.attachment = this.attachment;
          this.saveTask(data);
        };
      } else {
        this.saveTask(data);
      }

      this.dialog = false;
      this.$router.go(-1);
    },
    deleteItem: function() {
      this.deleteTask({
        id: this.board,
        taskId: this.$route.params.id,
      });
      this.dialog = false;
      this.$router.go(-1);
    },
  },
  computed: {
    titleError() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    },
    descriptionError() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Description is required.");
      return errors;
    },
    boardError() {
      const errors = [];
      if (!this.$v.board.$dirty) return errors;
      !this.$v.board.required && errors.push("Board is required.");
      return errors;
    },
  },
};
</script>
