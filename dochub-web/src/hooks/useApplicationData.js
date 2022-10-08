import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplicationData(initialState) {

  const [data, setData] = useState({
    constraintTypes: [],
    session: {
      user: {},
    }
  })


  //Constraints

  const setConstraintTypes = constraintTypes => {
    setData({
      ...data,
      constraintTypes: [ ...constraintTypes ],
      user: { ...user },
    })
  }

  const getConstraintTypesFromServer = () => {
    axios
      .get(`/api/constraintTypes`)
      .then(res => {
        setConstraintTypes(res.data);
      })
  }

  useEffect(getConstraintTypesFromServer, []);

  const updateConstraintType = constraintType => {
    console.log('updating ', constraintType);
    return axios
      .put(`/api/constraintTypes/${constraintType.id}`, constraintType);
  }

  const addConstraintType = name => {
    return axios
      .post(`/api/constraintTypes`, { name })
      .then(getConstraintTypesFromServer);
  }

  const deleteConstraintType = id => {
    return axios
      .delete(`/api/constraintTypes/${id}`)
      .then(getConstraintTypesFromServer);
  }

  //User


  const user = data.user;
  
  const setUser = (user) => {
    setData({
      ...data,
      constraintTypes: [ ...data.constraintTypes ],
      user: { ...user },
    });
  }

  const isLoggedIn = user?.id > 0;

  const login = ({email, password}) => {
    return axios
      .post("/api/session/login", {email, password})
      .then(res => {
        setUser({...res.data});
        console.log(`Logged in as ${res.data.email}`);
      });
  }


  const getUserFromServer = () => {
    return new Promise((resolve, reject) => { 
      axios.get("/me")
        .then(res => resolve(res.data))
        .catch(reject);
    });
  };

  const updateUser = (user) => {
    return axios
      .put("/api/users", user)
      .then(res => {
        setUser(res.data);
      });
  }

  const logout = () => {
    return axios.get("/api/session/logout")
      .then(() => {
        setUser({});
        console.log("Logged out successfully");
      });
  }

  return {
    setUser,
    user,
    isLoggedIn,
    login,
    getUserFromServer,
    updateUser,
    logout,
    constraintTypes: data.constraintTypes,
    updateConstraintType,
    addConstraintType,
    deleteConstraintType,
  }

}