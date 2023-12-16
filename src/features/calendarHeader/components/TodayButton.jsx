function TodayButton({ text, tooltipText, ...rest }) {
  return (
    <button
      className='bg-teal-light font-inconsolata relative rounded-lg p-2 px-4 font-bold shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] dark:border-strokedark dark:bg-meta-4'
      {...rest}
    >
      <span className='text-lg font-bold'>{text}</span>
      <span className='bg-teal-light pointer-events-none absolute -bottom-full left-1/2 -translate-x-1/2 translate-y-5 whitespace-nowrap rounded-md border border-black p-2 opacity-0 transition-opacity duration-200 ease-in group-hover:opacity-100'>
        {tooltipText}
      </span>
    </button>
  );
}
export default TodayButton;
