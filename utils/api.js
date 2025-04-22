import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://be-star-step-app-dev.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

///PARENT

export const createParentProfile = (parentData) => {
  console.log(parentData);
  return apiRequest
    .post(`parents`, parentData)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("Axios error message:", err.message);
    });
};

export const getParentById = (parent_id) => {
  return apiRequest
    .get(`parents/${parent_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("Axios error message:", err.message);
    });
};
///KIDS
export const createKidProfile = (parent_id, kidData) => {
  kidData.parentID = [parent_id]; ///string

  return apiRequest
    .post(`kids/`, kidData)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("Axios error message:", err.message);
    });
};
///
export const editKidProfile = (child_id, kidData) => {
  return apiRequest
    .patch(`kids/${child_id}/stars`, kidData)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

export const getKidById = (child_id) => {
  return apiRequest
    .get(`kids/${child_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

export const getKidByParentId = (parentID) => {
  return apiRequest
    .get(`kids/parent/${parentID}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

////TASKS

export const postNewTask = (parent_id, child_id, task) => {
  task.createdBy = parent_id;
  task.assignedTo = child_id;
  return apiRequest
    .post(`tasks/parent/${parent_id}`, task)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};
export const editTask = (task_id, taskUpdates) => {
  return apiRequest
    .patch(`tasks/${task_id}`, taskUpdates)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};
export const getTasksByParent = (parent_id) => {
  console.log(parent_id);
  return apiRequest
    .get(`tasks/parent/${parent_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

export const getTasksByKid = (kid_id) => {
  return apiRequest
    .get(`tasks/kids/${kid_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

export const getTaskById = (task_id) => {
  console.log(task_id);
  return apiRequest
    .get(`tasks/${task_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};
export const deleteTask = (task_id) => {
  return apiRequest
    .delete(`tasks/${task_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

////REWARDS
export const postNewReward = (parent, reward) => {
  reward.createdBy = [parent];

  return apiRequest
    .post(`rewards/`, reward)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

export const editReward = (reward_id, rewardUpdates) => {
  return apiRequest
    .patch(`rewards/${reward_id}`, rewardUpdates)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};
export const getRewardById = (reward_id) => {
  return apiRequest
    .get(`rewards/${reward_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

export const deleteRewardById = (reward_id) => {
  return apiRequest
    .delete(`rewards/${reward_id}`) // task initally // corrected to rewards
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};
export const getRewardsByParent = (parent_id) => {
  return apiRequest
    .get(`rewards?createdBy=${parent_id}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};
