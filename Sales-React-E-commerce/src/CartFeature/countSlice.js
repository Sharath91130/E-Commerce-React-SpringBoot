import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 10, // Default state
    status: 'idle', // Track loading state
    error: null, // Track errors
};

export const fetchCartCount = createAsyncThunk(
    'count/fetchCartCount',
    async () => {
        const response = await fetch("http://localhost:9090/api/cart/count/", {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch cart count: ${response.statusText}`);
        }
        const data = await response.json();
        return data.count; // Assuming API returns { count: number }
    }
);

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartCount.fulfilled, (state, action) => {
                state.value = action.payload; // Update the count with the API response
                state.status = 'succeeded';
            })
            .addCase(fetchCartCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { increment, decrement, incrementByAmount } = countSlice.actions;
export default countSlice.reducer;
