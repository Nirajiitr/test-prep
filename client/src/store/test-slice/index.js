import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  tests: [],
  ongoingTest : null,
  testResults : null,
  testResHistory : [],
  bookmarkedQuestions : [],
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


export const fetchTests = createAsyncThunk(
  "/tests/fetchAll",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/test/get?type=${type}`,
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
export const getTestHistory = createAsyncThunk(
  "/tests/score/history",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/score/history/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to get tests history" });
    }
  }
);
export const getBookmarkedQuestions = createAsyncThunk(
  "/tests/score/bokmark-ques",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/score/bookmarkedques`, userId,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to get tests history" });
    }
  }
);


export const getTestById = createAsyncThunk(
  "/tests/id",
  async (testId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/test/get/${testId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to get test" });
    }
  }
);
export const getScoreDetails = createAsyncThunk(
  "/tests/history/result",
  async ({scoreId}, { rejectWithValue }) => {
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/score/${scoreId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to get details" });
    }
  }
);
export const generateQuesAi = createAsyncThunk(
  "/tests/generateAiQ",
  async ( {subject, numQuestions, topic})=>{
    try {
      const res = await axios.post( `${import.meta.env.VITE_SERVER_BASE_URL}/api/test/generate-questions`, {    
        subject, numQuestions, topic
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data
      }
    }
   
  }
)
export const SubmitTest = createAsyncThunk(
  "/tests/submit",
  async ({testId, userId, answers,  bookmarkedQuestions, timeTaken} , { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/score/test-submit/`, {testId, userId ,answers,  bookmarkedQuestions, timeTaken},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to get test" });
    }
  }
);

export const deleteTest = createAsyncThunk(
  "/tests/delete",
  async (testId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/test/delete/${testId}`,
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

      
      .addCase(fetchTests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tests = action.payload.tests || [];
       
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch tests";
        toast.error(state.error);
      })
      
      
      .addCase(getTestHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testResHistory = action.payload.testHistory || [];
         
      })
      .addCase(getTestHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch tests";
        toast.error(state.error);
      })
      .addCase(getBookmarkedQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookmarkedQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookmarkedQuestions = action.payload.bookmarkedQuestions || [];
         
      })
      .addCase(getBookmarkedQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch bookmarkedQuestions";
        
      })
      
      .addCase(getTestById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTestById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ongoingTest = action.payload || null;
       
      })
      .addCase(getTestById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch test";
        toast.error(state.error);
      })
      .addCase(getScoreDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScoreDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testResults = action.payload.scoreDetails || null;
       
      })
      .addCase(getScoreDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch result";
        toast.error(state.error);
      })
      .addCase(SubmitTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SubmitTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testResults = action.payload.score || null;
       
      })
      .addCase(SubmitTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch score";
        toast.error(state.error);
      })

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
