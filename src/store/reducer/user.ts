import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { ILoginReq, IUser } from "~/interfaces/user";
import { loginUser } from "~/service/user";

export interface IUserState {
  isAuth: boolean;
  user: IUser;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initState: IUserState = {
  user: {} as IUser,
  isAuth: false,
  loading: "idle",
};

export const fetchUser = createAsyncThunk(
  "fetch_user",
  async ({ email, password }: ILoginReq) => {
    try {
      const res = await loginUser({
        email: email,
        password: password,
      });
      if (res) {
        localStorage.setItem("user", JSON.stringify(res.user));
        Cookies.set("access_token", res.access_token);
        Cookies.set("session_id", res.session_id);
        return res;
      }

      return undefined;
    } catch (error) {
      console.log(`file: user.ts:36 > error:`, error);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    hydrateUser: (state, action: PayloadAction<IUser>) => {
      const newState: IUserState = {
        isAuth: action.payload._id ? true : false,
        user: action.payload,
        loading: "idle",
      };
      return newState;
    },
    login: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = {} as IUser;
      state.loading = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = "pending";
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = true;
          state.user = action.payload.user;
          state.loading = "succeeded";

          console.log(action.payload);
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = "failed";
      });
  },
});

export const { hydrateUser, login, logout } = userSlice.actions;

export default userSlice.reducer;
