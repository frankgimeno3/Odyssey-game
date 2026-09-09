'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ACCESS_PASSWORD = '2026Printer';

const Home = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== ACCESS_PASSWORD) {
      setError('Credenciales incorrectas / wrong credentials');
      return;
    }

    window.localStorage.removeItem('odyssey-authenticated');
    window.sessionStorage.setItem('odyssey-authenticated', 'true');
    document.cookie = 'odyssey-authenticated=session; path=/; samesite=lax';
    router.replace('/landing');
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
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 pr-11 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-white/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.3A10.8 10.8 0 0 1 12 4c5.5 0 9 5.5 9 5.5a15.7 15.7 0 0 1-2.7 3.2M6.6 6.6A16 16 0 0 0 3 9.5S6.5 15 12 15c1 0 1.9-.2 2.7-.4" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12s3.5-5.5 9-5.5 9 5.5 9 5.5-3.5 5.5-9 5.5S3 12 3 12Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>
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
