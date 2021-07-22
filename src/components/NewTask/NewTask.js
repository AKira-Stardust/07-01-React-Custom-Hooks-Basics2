import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useRouter from '../../hooks/useRouter';

const NewTask = (props) => {
 
  const {isLoading, error, sendRequest: enterTaskRequest} = useRouter();

  function routerTask(taskText, data) {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  function enterTaskHandler(taskText){

    enterTaskRequest({
      url: 'https://react-http-start-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }},
      routerTask.bind(null, taskText) // on bind - we can preconfigure existing functions, the params added
      //here will simply be appended to its existing config setup.
    );
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
