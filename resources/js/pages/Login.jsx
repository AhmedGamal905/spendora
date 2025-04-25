import React from 'react'

function Login() {
  return (
      <>
      <div v-else className="flex items-center justify-center py-20">
  <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 w-1/2 mx-auto">
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
          Don't have an account yet?
          <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" to="/register">
            Sign up here
          </a>
        </p>
      </div>
      <div className="mt-5">
        {/* Form */}
        <form>
          <div className="grid gap-y-4">
            {/* Form Group */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
              <div className="relative">
                <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" v-model="form.email" autoComplete="email" required />
              </div>
            </div>
            {/* End Form Group */}
            {/* Form Group */}
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
              </div>
              <div className="relative">
                <input type="password" id="password" name="password" v-model="form.password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required />
              </div>
            </div>
            {/* End Form Group */}
            <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Sign in
            </button>
          </div>
        </form>
        {/* End Form */}
      </div>
    </div>
  </div>
</div>

      </>
  )
}

export default Login