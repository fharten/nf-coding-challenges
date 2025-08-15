'use client';

import TaskList from '@/components/TaskList/TaskList';
import { useTaskStore } from '@/store';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import useSWR from 'swr';

const ClientContent = () => {
  const { data: tasks, isLoading, error } = useSWR<Task[], Error>('/api/tasks');

  const setActiveList = useTaskStore(
    (state: unknown) => (state as TaskStore).setActiveList,
  );
  const setCountingTasks = useTaskStore(
    (state: unknown) => (state as TaskStore).setCountingTasks,
  );

  useEffect(() => {
    setActiveList('TaskTango - Home Page');
    tasks && setCountingTasks(tasks);
  });

  if (!tasks) {
    return null;
  }

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        position='absolute'
      >
        <Heading size='xl'>Loading...</Heading>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='teal.400'
          size='xl'
        />
      </Box>
    );
  }

  if (error) {
    return <div>failed to load</div>;
  }

  return <TaskList tasks={tasks} />;
};

export default ClientContent;
