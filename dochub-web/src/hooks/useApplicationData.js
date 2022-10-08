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
      constraintTypes: { ...constraintTypes},
      user: { ...user },
    })
    console.log("constraint types updated", constraintTypes);
  }

  const getConstraintTypesFromServer = () => {
    axios.get(`/api/constraintTypes`)
      .then(res => {
        setConstraintTypes(res.data);
      })
  }

  useEffect(getConstraintTypesFromServer, []);

  const updateConstraintType = constraintType => {
    return axios
      .put(`/api/constraintTypes/${constraintType.id}`, constraintType)
      .then(res => {
        console.log("updated constraint type ", res);
      })

  }

  //User


  const user = data.user;
  
  const setUser = (user) => {
    setData({
      ...data,
      constraintTypes: { ...data.constraintTypes},
      user: { ...user },
    });
  }

  const isLoggedIn = user?.id > 0;

  const login = ({email, password}) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/session/login", {email, password})
        .then(res => {
          setUser({...res.data});
          console.log(`Logged in as ${res.data.first_name}`);
          resolve();
        }).catch(reject);
    })    
  }


  const getUserFromServer = () => {
    return new Promise((resolve, reject) => { 
      axios.get("/me")
        .then(res => resolve(res.data))
        .catch(reject);
    });
  };

  const updateUser = (user) => {
    return new Promise((resolve, reject) => {
      axios.put("/api/users", user)
        .then(res => {
          setUser(res.data);
          console.log(`Updated user record successfully`);
          resolve();
        })
        .catch(reject);
    })
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
    updateConstraintType,
  }

}