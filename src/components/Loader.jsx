import React from 'react';

import { Vortex } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='my-auto mt-[16em] flex items-center justify-center'>
      <Vortex
        visible={true}
        height='80'
        width='80'
        ariaLabel='vortex-loading'
        wrapperStyle={{ marginX: 'auto', marginY: 'auto' }}
        wrapperClass='vortex-wrapper flex justify-center items-center'
        colors={['red', 'red', 'red', 'green', 'green', 'green']}
      />
    </div>
  );
};

export default Loader;
