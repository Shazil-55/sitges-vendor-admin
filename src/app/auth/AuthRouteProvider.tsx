import React, { createContext, useCallback, useContext, useMemo } from "react";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import { useAppDispatch } from "app/store/store";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen/FuseSplashScreen";
import {
  resetUser,
  selectUser,
  selectUserRole,
  setUser,
  updateUser,
  userSlice,
} from "src/app/auth/user/store/userSlice";
import BrowserRouter from "@fuse/core/BrowserRouter";
import { PartialDeep } from "type-fest";
import firebase from "firebase/compat/app";
import _ from "@lodash";
import { useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import useJwtAuth, { JwtAuth } from "./services/jwt/useJwtAuth";
import { User } from "./user";
import UserModel from "./user/models/UserModel";

/**
 * Initialize Firebase
 */

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  displayName: string;
  password: string;
  email: string;
};

type AuthContext = {
  jwtService?: JwtAuth<User, SignInPayload, SignUpPayload>;
  signOut?: () => void;
  updateUser?: (U: PartialDeep<User>) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
});

type AuthProviderProps = { children: React.ReactNode };

function AuthRoute(props: AuthProviderProps) {
  const { children } = props;
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  /**
   * Get user role from store
   */
  const userRole = useSelector(selectUserRole);

  /**
   * Jwt auth service
   */
  const jwtService = useJwtAuth({
    config: {
      tokenStorageKey: "jwt_access_token",
      signInUrl: "mock-api/auth/sign-in",
      signUpUrl: "mock-api/auth/sign-up",
      tokenRefreshUrl: "mock-api/auth/refresh",
      getUserUrl: "mock-api/auth/user",
      updateUserUrl: "mock-api/auth/user",
      updateTokenFromHeader: true,
    },
    onSignedIn: (user: User) => {
      dispatch(setUser(user));
      setAuthService("jwt");
    },
    onSignedUp: (user: User) => {
      dispatch(setUser(user));
      setAuthService("jwt");
    },
    onSignedOut: () => {
      dispatch(resetUser());
      resetAuthService();
    },
    onUpdateUser: (user) => {
      dispatch(updateUser(user));
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
    },
  });

  /**
   * Firebase auth service
   */

  /**
   * Check if services is in loading state
   */
  const isLoading = useMemo(
    () => jwtService?.isLoading,
    [jwtService?.isLoading],
  );

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useMemo(
    () => jwtService?.isAuthenticated,
    [jwtService?.isAuthenticated],
  );

  /**
   * Combine auth services
   */
  const combinedAuth = useMemo<AuthContext>(
    () => ({
      jwtService,
      signOut: () => {
        const authService = getAuthService();

        if (authService === "jwt") {
          return jwtService?.signOut();
        }

        return null;
      },
      updateUser: (userData) => {
        const authService = getAuthService();

        if (authService === "jwt") {
          return jwtService?.updateUser(userData);
        }

        return null;
      },
      isAuthenticated,
    }),
    [isAuthenticated, user],
  );

  /**
   * Get auth service
   */
  const getAuthService = useCallback(() => {
    return localStorage.getItem("authService");
  }, []);

  /**
   * Set auth service
   */
  const setAuthService = useCallback((authService: string) => {
    if (authService) {
      localStorage.setItem("authService", authService);
    }
  }, []);

  /**
   * Reset auth service
   */
  const resetAuthService = useCallback(() => {
    localStorage.removeItem("authService");
  }, []);

  /**
   * Render loading screen while loading user data
   */
  if (isLoading) {
    return <FuseSplashScreen />;
  }

  return (
    <AuthContext.Provider value={combinedAuth}>
      <BrowserRouter>
        <FuseAuthorization userRole={userRole}>{children}</FuseAuthorization>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthRouteProvider");
  }

  return context;
}

const AuthRouteProvider = withReducer<AuthProviderProps>(
  "user",
  userSlice.reducer,
)(AuthRoute);

export { useAuth, AuthRouteProvider };
