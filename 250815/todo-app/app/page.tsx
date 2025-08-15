import { FC } from 'react';
import MainContainer from '@/components/Navigation/MainContainer';
import Layout from '@/components/Layout/Layout';
import AddTaskInput from '@/components/Task/AddTaskInput';
import SetupModal from '@/components/Modal/Modal';
import ClientContent from './ClientContent';

const IndexPage: FC = () => {
  return (
    <Layout title='TaskTango - Home Page'>
      <MainContainer mainTitle='All Tasks'>
        <SetupModal />
        <AddTaskInput />
        <ClientContent />
      </MainContainer>
    </Layout>
  );
};

export default IndexPage;
