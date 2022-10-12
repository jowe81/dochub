import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplicationData(initialState) {

  const [data, setData] = useState({
    constraintTypes: [],
    constraints: [],
    session: {
      user: {},
    }
  })


  //Constraints

  const setConstraints = constraints => {
    setData({
      ...data,
      constraints: [ ...constraints ],
    })
  }

  const getConstraintsFromServer = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/constraints`)
      .then(res => {
        setConstraints(res.data);
        resolve(res.data);
      });
    });
  }
  
  const getConstraintById = id => {
    return data.constraints.filter(item => item.id === id)[0];
  }

  const getConstraintByLabel = (label, constraintTypeId) => {
    const filtered = data.constraints.filter(item => item.label === label && item.constraintTypeId === constraintTypeId);
    if (filtered.length > 0) {
      return filtered[0];
    }
    return null;
  }

  const addConstraint = (label, constraintTypeId) => {
    return axios
      .post(`/api/constraints`, { label, constraintTypeId })
      .then(res => {
        getConstraintsFromServer();
        return res.data;
      });
  }

  const deleteConstraint = id => {
    return axios
      .delete(`/api/constraints/${id}`)
      .then(getConstraintsFromServer);
  }

  const updateConstraint = (documentId, constraintId, checked) => {
    console.log("Applying constraint ", documentId, constraintId, checked);
    return axios
      .post(`/api/documents/${documentId}/update-constraint`, {
        constraintId, checked
      })
  }

  //Apply constraint if exists
  const applyConstraint = (documentId, constraintId, label, checked, createIfNotExists, constraintTypeId) => {
    console.log("ApplyConstraint");
    //Find constraint by id or by label and typeId
    let constraint = getConstraintById(constraintId) ?? getConstraintByLabel(label, constraintTypeId);
    if (constraint) {
      console.log("Found constraint", constraint);
      //Update status of existing constraint
      return updateConstraint(documentId, constraint.id, checked);
    } else {
      console.log("Did not find constraint");
      if (createIfNotExists) {
        const constraintType = getConstraintTypeById(constraintTypeId);
        console.log("Found ConstraintType", constraintType);
        if (constraintType && constraintType.userCreatable) {
          console.log("Creating constraint", label, constraintTypeId)
          return addConstraint(label, constraintTypeId)
            .then((constraint) => { 
              console.log("New constraint returned", constraint);
              return updateConstraint(documentId, constraint.id, checked)
            })  
        }
      }
      console.log("Constraint can't be created by users");
      return Promise.reject("Users can't create this type of constraint");
    }
  }

  //Constraint Types

  const setConstraintTypes = constraintTypes => {
    setData({
      ...data,
      constraintTypes: [ ...constraintTypes ],
      constraints: [ ...data.constraints ],
      user: { ...user },
    })
  }

  const getConstraintTypesFromServer = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/constraintTypes`)
      .then(res => {
        setConstraintTypes(res.data);
        resolve(res.data);
      });
    });
  }

  const getConstraintTypeById = id => {
    return data.constraintTypes.filter(item => item.id === id)[0];
  }

  const updateConstraintType = constraintType => {
    return new Promise((resolve, reject) => {
      axios
      .put(`/api/constraintTypes/${constraintType.id}`, constraintType)
      .then(updatedRecord => {
        getConstraintTypesFromServer()
          .then(res => {
            resolve(res);
          });
      });
    })
  }

  const addConstraintType = name => {
    return axios
      .post(`/api/constraintTypes`, { name })
      .then(res => {
        if (res.data.success !== false) {
          return getConstraintTypesFromServer();
        }
        return res.data;
      });
  }

  const deleteConstraintType = id => {
    return axios
      .delete(`/api/constraintTypes/${id}`)
      .then(getConstraintTypesFromServer);
  }

  //Preload data

  useEffect(() => {
    getConstraintTypesFromServer()
      .then(constraintTypes => console.log(`Loaded ${constraintTypes.length} Constraint Types`));
    getConstraintsFromServer()
    .then(constraints => console.log(`Loaded ${constraints.length} Constraints`));
  }, []);


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
    getConstraintTypeById,

    constraints: data.constraints,
    getConstraintById,
    getConstraintByLabel,
    addConstraint,
    deleteConstraint,
    applyConstraint, //Apply or remove constraint from document
  }

}