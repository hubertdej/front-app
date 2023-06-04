import { AppLayout } from '@cloudscape-design/components';
import Sidebar from '../../components/sidebar';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/top-bar';
import './index.css';

function RootLayout() {
  return (
    <>
      <div id="top-nav">
        <TopBar />
      </div>
      <AppLayout
        headerSelector='#top-nav'
        navigation={<Sidebar />}
        toolsHide={true}
        disableContentPaddings={true}
        content={
          <Outlet />
        }
      />
    </>
  );
}

export default RootLayout;
