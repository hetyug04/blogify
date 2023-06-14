import React, { useContext, useReducer } from "react";
import {
  DISPLAY_ALERT,
  HIDE_ALERT,
  LOGIN_USER_SUCCESS,
  REGISTER_ALERT,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  POST_ERROR,
  POST_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  user: user ? JSON.parse(user) : null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    hideAlert();
  };
  const hideAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };
  const registerAlert = (msg) => {
    dispatch({ type: REGISTER_ALERT, payload: { msg } });
    hideAlert();
  };
  const setLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("user");
  };

  // REGISTER
  const registerUser = async (currUser) => {
    try {
      const registerRequest = await axios.post(
        "/api/v1/auth/register",
        currUser
      );
      const user = registerRequest.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user },
      });
      setLocalStorage(user);
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const loginUser = async (currUser) => {
    try {
      const loginRequest = await axios.post("/api/v1/auth/login", currUser);
      const user = loginRequest.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user },
      });
      setLocalStorage(user);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      console.log(error);
    }
    hideAlert();
  };
  function stringToColor(string) {
    var hash = 0;
    var i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = "#";
    for (i = 0; i < 3; i += 1) {
      var value = (hash >> (i * 8)) & 0xff;
      color += "00".concat(value.toString(16)).slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }
  function stringAvatar(name) {
    if (name.includes(" ")) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: ""
          .concat(name.split(" ")[0][0])
          .concat(name.split(" ")[1][0]),
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: name.slice(0, 1).toUpperCase(),
      };
    }
  }
  const postNewPost = async (currPost) => {
    try {
      await axios.post("api/v1/post/post", currPost);
      console.log(currPost);
      dispatch({
        type: POST_SUCCESS,
        payload: { msg: "Posted !" },
      });
      hideAlert();
      return true
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
      hideAlert();
      return false
    }
    
  };
  const deletePost = async (_id) => {
    try {
      console.log(_id);
      await axios.delete("/api/v1/post/deletePost", {
        data: { _id: _id },
      });
      console.log("deleted");
    } catch (error) {
      console.log(error);
    }
    hideAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        displayAlert,
        registerAlert,
        stringAvatar,
        stringToColor,
        postNewPost,
        clearLocalStorage,
        deletePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
