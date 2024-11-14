import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.rapidmock.com/api/vikuman/v1/movies/all';

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch movies.');
        }
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        filteredMovies: [],
        searchQuery: '',
        filterOption: 'all',
        loading: false,
        error: null,
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredMovies = state.movies.filter(item => 
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        setFilterOption: (state, action) => {
            state.filterOption = action.payload;
            if (action.payload === 'all') {
                state.filteredMovies = state.movies;
            } else {
                state.filteredMovies = state.movies.filter(
                    item => item.type.toLowerCase() === action.payload
                );
            }
        },
        sortMovies: (state) => {
            state.filteredMovies = [...state.filteredMovies].sort(
                (a, b) => a.title.localeCompare(b.title)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
                state.filteredMovies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSearchQuery, setFilterOption, sortMovies } = movieSlice.actions;
export default movieSlice.reducer;