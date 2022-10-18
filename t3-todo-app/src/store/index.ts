import create from "zustand";
import { UpdateTaskInput } from "../server/trpc/schema";

type State = {
  editedTask: UpdateTaskInput;
  updateEditedTask: (payload: UpdateTaskInput) => void;
  resetEditedTask: () => void;
};

const emptyTask = { id: "", title: "", body: "" };

export const useStore = create<State>((set) => ({
  editedTask: emptyTask,
  updateEditedTask: (payload) => set({ editedTask: payload }),
  resetEditedTask: () => set({ editedTask: emptyTask }),
}));
