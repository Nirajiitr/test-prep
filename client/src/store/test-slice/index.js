import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  tests: [],
  isLoading: false,
  error: null,
};

export const createTest = createAsyncThunk(
  "/tests/create",
  async ({testData,token}, { rejectWithValue }) => {
      
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/test/create`,
        testData,
        { withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
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
      return rejectWithValue({ message: "Failed to create test" });
    }
  }
);

// Thunk to fetch all tests
export const fetchTests = createAsyncThunk(
  "/tests/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/test/get`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to fetch tests" });
    }
  }
);

// Thunk to delete a test
export const deleteTest = createAsyncThunk(
  "/tests/delete",
  async (testId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/test/get/${testId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to delete test" });
    }
  }
);

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    clearTests: (state) => {
      state.tests = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Test
      .addCase(createTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tests.push(action.payload.test);
        toast.success(action.payload.message || "Test created successfully");
      })
      .addCase(createTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to create test";
        toast.error(state.error);
      })

      // Fetch Tests
      .addCase(fetchTests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tests = action.payload || [];
        console.log(action)
        toast.success("Tests fetched successfully");
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch tests";
        toast.error(state.error);
      })

      // Delete Test
      .addCase(deleteTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tests = state.tests.filter(
          (test) => test._id !== action.meta.arg
        );
        toast.success(action.payload.message || "Test deleted successfully");
      })
      .addCase(deleteTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to delete test";
        toast.error(state.error);
      });
  },
});

export const { clearTests } = testSlice.actions;
export default testSlice.reducer;
