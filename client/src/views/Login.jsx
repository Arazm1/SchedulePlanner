import { useUserContext } from "../hooks/contextHooks";
//import { useAuthentication } from "../hooks/useAuth";
import useForm from '../hooks/formHooks.js';
import { useState } from "react";

const Login = () => {

    //const {postLogin} = useAuthentication();
    const {handleLogin} = useUserContext();
    const [error, setError] = useState('');

    const initValues = {
        username: '',
        password: '',
    };



    const doLogin = async () => {
        setError('');
        try{
            await handleLogin(inputs);
            
        } catch (error) {
            console.log('Error in doLogin: ', error.message);
            setError(error.message || 'Invalid username or password')
        }
    };

    const {inputs, handleInputChange, handleSubmit} = useForm(
        doLogin,
        initValues,
    );

    return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-sans">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        
        {/* Error Alert Box */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-5 text-sm border border-red-200">
            {error}
          </div>
        )}
        
        <div className="mb-5 flex flex-col">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputs.username}
            onChange={handleInputChange} // Swapped to useForm handler
            required
            className="p-2.5 mt-1.5 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6 flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange} // Swapped to useForm handler
            required
            className="p-2.5 mt-1.5 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button 
          type="submit" 
          className="w-full p-2.5 bg-blue-600 text-white font-semibold rounded-md text-base cursor-pointer hover:bg-blue-700 transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;