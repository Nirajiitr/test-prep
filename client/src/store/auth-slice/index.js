import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/register`,
        FormData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`,
        FormData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (Token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Token}`,
            "Cache-control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.userData;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        toast.success(action?.payload?.message || "Registration successful");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.error(action?.payload?.message || "Registration failed");
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.userData;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        toast.success(action.payload.message || "Login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.error(action?.payload?.message || "login failed");
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.userData;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
