import { createSlice } from "@reduxjs/toolkit";

export const UserInfoSlice = createSlice({
  name: "userdata",
  initialState: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      city: "New York",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "2345678901",
      city: "Los Angeles",
    },
    {
      id: 3,
      name: "Raza Ali",
      email: "razaali@gmail.com",
      phone: "03234565412",
      city: "Karachi",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "3456789012",
      city: "Chicago",
    }
    
  ],
  reducers: {
    Edit: (state, action) => {
      const updatedUser = action.payload;
      return state.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    },

    /* function for deleting   specific user data from the table*/
    Delete: (state, action) => {
      const { id } = action.payload;
      return state.filter((item) => item.id !== id);
    },
    Create: (state, action) => {
      const { id, name, email, city, phone } = action.payload;
      return [...state, { id, name, email, city, phone }];
    },
  },
});

export const { Edit, Delete, Create } = UserInfoSlice.actions;
export default UserInfoSlice.reducer;
