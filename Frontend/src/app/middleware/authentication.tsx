import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const selectUserRole = (state: RootState) => state.auth.role;

// Example of checking if user is admin
export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === 'admin'
);

export const selectIsUser = createSelector(
    selectUserRole,
    (role) => role === 'user'
  );
  
 