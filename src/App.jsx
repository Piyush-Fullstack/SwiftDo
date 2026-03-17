import React, { useEffect, useState } from 'react';
import './index.css';
import '@qpokychuk/gilroy/normal.css';

const App = () => {
  const categories = ['All', 'Completed', 'Pending'];
  const [tasks, settasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setinput] = useState('');
  const [filter, setfilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    const newtask = { id: Date.now(), title: input, completed: false };
    settasks([newtask, ...tasks]);
    setinput('');
  };

  const deleteTask = (id) => settasks(tasks.filter((t) => t.id !== id));

  const toggleStatus = (id) => {
    settasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filterstatus = tasks.filter((t) => {
    if (filter === 'Completed') return t.completed;
    if (filter === 'Pending') return !t.completed;
    return true;
  });

  return (
    // Background light gray/white rakha hai
    <div className='min-h-screen w-full bg-[#f8fafc] p-6 flex flex-col items-center font-[Gilroy] selection:bg-indigo-100 selection:text-indigo-900'>
      
      <div className='w-full max-w-md mt-12 space-y-8'>
        
        {/* Header - Vibrant Blue/Black combo */}
        <div className='text-center space-y-1'>
          <h1 className='text-6xl font-black text-slate-900 tracking-tighter'>
            Swift<span className='text-indigo-600'>Do</span>
          </h1>
          <p className='text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]'>
            Elevate Your Productivity
          </p>
        </div>

        {/* Input Form - Clean White with soft shadow */}
        <form onSubmit={handleSubmit} className='relative group'>
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className='w-full p-5 pl-6 pr-28 bg-white border border-slate-200 rounded-3xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 font-bold text-lg placeholder:text-slate-300 shadow-sm'
            placeholder='What needs to be done?'
          />
          <button className='absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-200'>
            Add
          </button>
        </form>

        {/* Filter Chips - Modern Pill Style */}
        <div className='flex justify-center gap-2'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setfilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-black transition-all uppercase tracking-wider ${
                filter === cat 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Task List Container */}
        <div className='bg-white/50 border border-slate-100 rounded-[2.5rem] h-112.5 p-4 overflow-y-auto no-scrollbar shadow-xl shadow-slate-200/50'>
          {filterstatus.length === 0 ? (
            <div className='h-full flex flex-col items-center justify-center text-center p-6 opacity-30'>
              <div className='w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
                <span className='text-3xl'>☁️</span>
              </div>
              <h3 className='text-slate-900 font-black text-xl'>All Clear</h3>
              <p className='text-slate-500 text-sm font-bold'>No tasks in {filter}</p>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {filterstatus.map((task) => (
                <div
                  key={task.id}
                  className='group flex justify-between items-center bg-white border border-slate-100 p-5 rounded-3xl hover:shadow-md transition-all'
                >
                  <div className='flex items-center gap-4 flex-1 min-w-0'>
                    <div 
                      onClick={() => toggleStatus(task.id)}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer flex items-center justify-center shrink-0 transition-all ${
                        task.completed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 hover:border-indigo-400'
                      }`}
                    >
                      {task.completed && <span className='text-white font-bold text-xs'>✓</span>}
                    </div>
                    <span className={`text-base font-bold truncate transition-all ${
                      task.completed ? 'text-slate-300 line-through' : 'text-slate-700'
                    }`}>
                      {task.title}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className='ml-2 text-slate-300 hover:text-red-500 p-2 transition-colors'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className='flex justify-between items-center px-4'>
          <p className='text-slate-400 text-[10px] font-black uppercase tracking-widest'>
            {tasks.filter(t => !t.completed).length} items left
          </p>
          <div className='h-px flex-1 mx-6 bg-slate-100'></div>
          <p className='text-slate-700 text-[10px] font-black uppercase tracking-widest'>
            Built with React and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;