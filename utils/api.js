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

////TASKS

export const postNewTask = (parent, child, task) => {
  task.createdBy = [parent];
  task.assignedTo = [child];
  console.log(task);
  return apiRequest
    .post(`tasks/`, task)
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
  return apiRequest
    .get(`tasks?createdBy=${parent_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error("❌ Axios error message:", err.message);
    });
};

export const getTasksByKid = (kid_id) => {
  return apiRequest
    .get(`tasks?assignedTo=${kid_id}`)
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
    .delete(`tasks/${reward_id}`)
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
