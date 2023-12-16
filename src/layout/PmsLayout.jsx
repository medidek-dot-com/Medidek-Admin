import React, { useState } from 'react';
import PmsSidebar from '../components/PMS/PmsSidebar';
import PmsHeader from '../components/PMS/PmsHeader';

const PmsLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className='flex h-screen overflow-hidden'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <PmsSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          {/* <!-- ===== Header Start ===== --> */}
          <PmsHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
          <footer className='ml-4 mb-4 border-t-2 px-6 font-bold'>
            <h1>©Copyright 2023 www.swagstay.com All rights reserved.</h1>
          </footer>
        </div>

        {/* <!-- ===== Content Area End ===== --> */}
      </div>

      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default PmsLayout;
