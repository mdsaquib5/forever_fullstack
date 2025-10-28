import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import backendUrl from '../App';
import { 
    Lock, 
    User, 
    Eye, 
    EyeOff, 
    Shield, 
    LogIn,
    Server,
    Key
} from 'lucide-react';

const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const response = await axios.post('http://localhost:4000/api/user/admin', {
                email,
                password
            });
            // console.log(response);
            if (response.data.success) {
                setToken(response.data.token);
                toast.success('Welcome back, Admin!', response.data.message);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <>
        <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white rounded-full"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-6 h-6 bg-green-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-50 animate-pulse delay-500"></div>

            <div className='relative z-10'>
                <div className='bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 px-10 py-12 max-w-md w-full mx-4'>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h1 className='text-3xl font-bold text-white mb-2'>Admin Portal</h1>
                        <p className='text-gray-400 text-sm'>
                            Secure access to administration dashboard
                        </p>
                    </div>

                    <form onSubmit={onSubmitHandler} className="space-y-6">
                        {/* Email Field */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-300 flex items-center gap-2'>
                                <User className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input 
                                    className='rounded-xl w-full px-4 py-4 bg-gray-700/50 border border-gray-600 outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12' 
                                    type="email" 
                                    placeholder='admin@example.com' 
                                    required 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                    autoComplete='email' 
                                />
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-300 flex items-center gap-2'>
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    className='rounded-xl w-full px-4 py-4 bg-gray-700/50 border border-gray-600 outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12 pr-12' 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Enter your password' 
                                    required 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password} 
                                    autoComplete='current-password' 
                                />
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2" />
                                Remember me
                            </label>
                            <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button 
                            className='w-full px-4 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-3 group' 
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    Access Dashboard
                                    <Key className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-8 p-4 bg-gray-700/50 rounded-2xl border border-gray-600">
                        <div className="flex items-center gap-3">
                            <Server className="w-5 h-5 text-green-400" />
                            <div>
                                <p className="text-sm font-semibold text-green-400">Secure Connection</p>
                                <p className="text-xs text-gray-400">Your credentials are encrypted and secure</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            © 2024 Admin Panel • v2.1.4
                        </p>
                    </div>
                </div>

                {/* System Status */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400 font-medium">System Operational</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login;