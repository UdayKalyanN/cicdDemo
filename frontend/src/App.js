import { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg]           = useState('Loading…');
  const [name, setName]         = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/hello')
      .then(r => r.json())
      .then(data => setMsg(data.msg))
      .catch(() => setMsg('Error fetching hello'));
  }, []);

  const handleGreet = () => {
    if (!name.trim()) return;
    fetch('http://localhost:8000/greet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(r => r.json())
    .then(data => setGreeting(data.message))
    .catch(() => setGreeting('Something went wrong'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-4">
          React → Spring Boot
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Type your name below for a custom greeting!
        </p>

        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name…"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            onClick={handleGreet}
            disabled={!name.trim()}
            className={
              `px-6 py-2 rounded-lg text-white font-semibold transition-shadow ` +
              (name.trim()
                ? 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
                : 'bg-purple-300 cursor-not-allowed')
            }
          >
            Greet
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              <span className="font-medium">Backend says:</span> {msg}
            </p>
          </div>

          {greeting && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-purple-800">
                <span className="font-medium">Greeting:</span> {greeting}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
