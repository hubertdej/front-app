import * as React from 'react';
import { AppLayout } from '@cloudscape-design/components';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/topbar';


function Root() {
  return (
        <>
            <Topbar />
            <AppLayout 
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

export default Root;