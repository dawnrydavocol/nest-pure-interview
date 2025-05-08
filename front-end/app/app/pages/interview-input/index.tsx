import React from 'react';
import { ApiProvider } from '~/app/context/pure-interview/agent';
import Form from './form';

const InterviewInputPage: React.FC = () => {
  return (
    <ApiProvider>
      <Form />
    </ApiProvider>
  );
};

export default InterviewInputPage;
