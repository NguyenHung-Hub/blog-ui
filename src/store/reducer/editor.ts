import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IDataImg {
    id: string;
    alt: string;
    src: string;
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
}

export interface IEditorState {
    list: IDataImg[];
    current: IDataImg;
    imageInserted: string[];
}

const initState: IEditorState = {
    list: [],
    current: {} as IDataImg,
    imageInserted: [],
};

export const editorSlice = createSlice({
    name: "editor",
    initialState: initState,
    reducers: {
        addImageItem: (state, action: PayloadAction<IDataImg>) => {
            const find = state.list.find((i) => i.id === action.payload.id);
            if (!find) {
                state.list.push(action.payload);
            }
        },
        changeImageAlt: (
            state,
            action: PayloadAction<Pick<IDataImg, "id" | "alt">>
        ) => {
            state.list = state.list.map((i) => {
                if (i.id == action.payload.id) {
                    return {
                        ...i,
                        alt: action.payload.alt,
                    };
                }

                return i;
            });
        },
        changeImageWidth: (
            state,
            action: PayloadAction<Pick<IDataImg, "id" | "width" | "height">>
        ) => {
            state.list = state.list.map((i) => {
                if (i.id == action.payload.id) {
                    return {
                        ...i,
                        width: action.payload.width,
                        height: action.payload.height,
                    };
                }

                return i;
            });
        },
        changeImageHeight: (
            state,
            action: PayloadAction<Pick<IDataImg, "id" | "width" | "height">>
        ) => {
            state.list = state.list.map((i) => {
                if (i.id == action.payload.id) {
                    return {
                        ...i,
                        width: action.payload.width,
                        height: action.payload.height,
                    };
                }

                return i;
            });
        },
        changeImageCurrent: (state, action: PayloadAction<IDataImg>) => {
            state.current = action.payload;
        },

        imageInserted: (state, action) => {
            state.imageInserted.push(action.payload);
        },
    },
});

export const {
    addImageItem,
    changeImageAlt,
    changeImageWidth,
    changeImageHeight,
    changeImageCurrent,
    imageInserted,
} = editorSlice.actions;

export default editorSlice.reducer;
