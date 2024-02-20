import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  token: "",
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData) => {
    console.log(formData);
    try {
      const response = await fetch("http://localhost:4000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      localStorage.setItem("token", data.authToken);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to login user");
      }

      const data = await response.json();
      //   console.log(data.authToken);
      localStorage.setItem("token", data.authToken);

      return data;
    } catch (error) {
      throw error;
    }
  }
);
// Create an async thunk for user info
export const getUserInfo = createAsyncThunk("auth/getUserInfo", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Handle the case when the token is not available
    throw new Error("No token available");
  }

  try {
    const response = await fetch("http://localhost:4000/api/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to Load user info");
    }

    const data = await response.json();

    return data; // Assuming your API returns some data after successful login
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can add synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.authToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.authToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
