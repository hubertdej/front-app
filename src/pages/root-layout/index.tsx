import { AppLayout } from '@cloudscape-design/components';
import Sidebar from '../../components/sidebar';
import { Outlet } from 'react-router-dom';
import Topbar from '../../components/topbar';
import './index.css';


function RootLayout() {
  return (
    <>
      <div id="top-nav">
        <Topbar />
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
