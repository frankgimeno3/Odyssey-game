'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ACCESS_PASSWORD = '2026Printer';

const Home = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== ACCESS_PASSWORD) {
      setError('Credenciales incorrectas / wrong credentials');
      return;
    }

    window.localStorage.setItem('odyssey-authenticated', 'true');
    document.cookie = 'odyssey-authenticated=true; path=/; max-age=86400; samesite=lax';
    router.push('/landing');
  };

  const router = useRouter();

  return (
    <div className='relative'>
      <div className="md:mx-56 md:px-56">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen md:mx-24 bg-zinc-900 bg-opacity-30">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Iniciar Sesión / log in
            </h2>
          </div>

          <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={handleSignIn}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Contraseña / password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!password}
                  className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Iniciar sesión
                </button>
              </div>

              {error && (
                <div className="mt-10 p-5 border border-red-300 text-red-300 rounded">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
