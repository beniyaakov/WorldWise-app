import React, { createContext, useContext, useReducer } from "react";

type FakeAuthContextProps = {
  children: React.ReactNode;
};

type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type StateType = {
  user: UserType | null;
  isAuthenticated: boolean;
};

type createContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<createContextType | null>(null);

type ActionType =
  | { type: "login", payload: UserType }
  | { type: "logout" };

const initialAuthState: StateType = {
  user:null,
  isAuthenticated: false,
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
  }
}

const FAKE_USER = {
  name: "beni",
  email: "beni@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export default function FakeAuthProvider({ children }: FakeAuthContextProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer,initialAuthState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }


  function logout() {
    dispatch({ type: "logout"});
  }



  const values: createContextType = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  if (!AuthContext) {
    throw new Error("wrong on context");
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AutoContext used outside AutoProvider");
  return context;
}
