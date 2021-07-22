import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useRouter from './hooks/useRouter';

function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest: fetchTasks} = useRouter();

  useEffect(() => {

    function routerTask(taskData){
      const loadedTasks = [];

      for (const taskKey in taskData) {
        loadedTasks.push({ id: taskKey, text: taskData[taskKey].text });
      }

      setTasks(loadedTasks);
    }

    fetchTasks({url:'https://react-http-start-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'},
      routerTask);
    
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
