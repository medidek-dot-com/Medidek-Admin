import React, { useState } from 'react';

function AccordionRenderer(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='accordion my-2 rounded-md border'>
      <div
        className='accordion-summary bg-gray-200 cursor-pointer py-2 px-4'
        onClick={handleExpand}
      >
        {'>'}
      </div>
      {expanded && (
        <div className='accordion-details bg-white py-2 px-4'>
          <div>{props.details}</div>
          <div>{props.summary}</div>
        </div>
      )}
    </div>
  );
}

export default AccordionRenderer;
