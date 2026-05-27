import { useState } from "react";
import { useAuthentication } from "../hooks/useAuth"
import useForm from '../hooks/formHooks.js';
import { Link } from 'react-router';


const Register = () => {

    const {postRegister} = useAuthentication();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const initValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };


    const doRegister = async () => {
        setError('');
        setSuccess('');


        if(inputs.password != inputs.confirmPassword){
            setError('Passwords do not match!');
            return;
        }

        try{
            const { confirmPassword, ...registerPayload } = inputs;
            const result = await postRegister(registerPayload);
            console.log(result)

            setSuccess('Account registered successfully!')

        } catch (error){
            console.log('Error in doRegister: ', error)
            setError(error.message || 'Registration failed. Please try again.');
        }
    }


    const {inputs, handleInputChange, handleSubmit} = useForm(
        doRegister,
        initValues,
    );

    return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-sans">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Account</h2>
        
        {/* Error Alert Box */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-5 text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Success Alert Box */}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md mb-5 text-sm border border-green-200">
            {success}
          </div>
        )}
        
        {/* Username Field */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
            required
            className="p-2.5 mt-1.5 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            required
            className="p-2.5 mt-1.5 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            required
            className="p-2.5 mt-1.5 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6 flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleInputChange}
            required
            className="p-2.5 mt-1.5 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button 
          type="submit" 
          className="w-full p-2.5 bg-blue-600 text-white font-semibold rounded-md text-base cursor-pointer hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;