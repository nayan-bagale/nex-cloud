import { createSlice } from "@reduxjs/toolkit";

export interface FolderT {
  id: string;
  isFolder: boolean;
  name: string;
  parent: string;
  details: {
    size: number;
    lastModified: string;
  };
  children: string[];
}

export interface FileT {
  id: string;
  isFolder: false;
  name: string;
  parent: string;
  details: {
    name: string;
    size: string;
    type: string;
    lastModified: string;
    // File: File;
  };
}

interface ExplorerT {
  explorerItems: {
    [key: string]: FileT | FolderT;
  };
  currentFolder: string;
  backStack: string[];
  forwardStack: string[];
}

const initalState = {
  explorerItems: {
    root: {
      id: "root",
      isFolder: true,
      name: "CatX",
      parent: "",
      details: {
        size: 0,
        lastModified: "2023-10-01T12:00:00Z",
      },
      children: ["file1", "folder1"],
    },
    file1: {
      id: "file1",
      isFolder: false,
      name: "file1.txt",
      parent: "root",
      details: {
        name: "file1.txt",
        size: "15KB",
        type: "text/plain",
        lastModified: "2023-10-01T12:00:00Z",
        // File: new Fil/e(["content"], "file1.txt", { type: "text/plain" }),
      },
    },
    folder1: {
      id: "folder1",
      isFolder: true,
      name: "folder1",
      parent: "root",
      details: {
        size: 0,
        lastModified: "2023-10-02T12:00:00Z",
      },
      children: ["file2"],
    },
    file2: {
      id: "file2",
      isFolder: false,
      name: "file2.jpg",
      parent: "folder1",
      details: {
        name: "file2.jpg",
        size: "200KB",
        type: "image/jpeg",
        lastModified: "2023-10-02T12:00:00Z",
        // File: new File(["content"], "file2.jpg", { type: "image/jpeg" }),
      },
    },
  },
  currentFolder: "root",
  backStack: [],
  forwardStack: [],
} as ExplorerT;

export const explorerSlice = createSlice({
  name: "explorer",
  initialState: initalState,
  reducers: {
    addItem: (state, action) => {
      const currentFolderItem = state.explorerItems[state.currentFolder];
      if (currentFolderItem.isFolder) {
        state.explorerItems = {
          ...state.explorerItems,
          [state.currentFolder]: {
            ...currentFolderItem,
            children: [...currentFolderItem.children, action.payload.id],
          },
          [action.payload.id]: action.payload,
        };
      }
    },
    setCurrentFolder: (state, action) => {
      state.backStack.push(state.currentFolder);
      state.currentFolder = action.payload;
    },
    setForwardStack: (state, action) => {
      const temp = state.forwardStack.pop();
      if (temp) state.backStack.push(temp);
      state.currentFolder =
        state.forwardStack[state.forwardStack.length - 1] || "root";
    },
    setBackStack: (state, action) => {
      const temp = state.backStack.pop();
      if (temp) state.forwardStack.push(temp);
      state.currentFolder =
        state.backStack[state.backStack.length - 1] || "root";
    },
  },
});

export const { addItem, setCurrentFolder, setForwardStack, setBackStack } =
  explorerSlice.actions;

export default explorerSlice.reducer;