import { useEffect, useState } from 'react';

const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechNova',
    location: 'Dhaka',
    deadline: '2025-08-30',
    description: 'React/JS developer for web projects.'
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'DataWiz',
    location: 'Remote',
    deadline: '2025-09-10',
    description: 'Analyze datasets and create reports.'
  }
];

const JobVacancy = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // In real app, fetch from backend
    setJobs(mockJobs);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-teal-700 mb-2 drop-shadow-lg">Upcoming Job Vacancies</h2>
          <p className="text-lg text-gray-600">Find your next opportunity and apply today!</p>
        </div>
        {jobs.length === 0 ? (
          <div className="text-center text-gray-500">No job vacancies available.</div>
        ) : (
          <div className="space-y-8">
            {jobs.map(job => (
              <div key={job.id} className="bg-white shadow-xl rounded-2xl p-8 border-l-8 border-teal-400 hover:scale-[1.02] transition-transform duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-blue-800">{job.title}</h3>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">{job.company}</span>
                </div>
                <div className="flex flex-wrap gap-4 mb-2">
                  <span className="inline-flex items-center gap-1 text-gray-700"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M17 8V6a4 4 0 00-3-3.87M9 8V6a4 4 0 013-3.87" /></svg> {job.location}</span>
                  <span className="inline-flex items-center gap-1 text-gray-700"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Deadline: {job.deadline}</span>
                </div>
                <p className="mb-4 text-gray-600 italic">{job.description}</p>
                <div className="flex justify-end">
                  <button className="btn btn-primary bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-teal-600 hover:to-blue-600 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobVacancy;
