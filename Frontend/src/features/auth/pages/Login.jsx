import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { ArrowLeft, LogIn, Mail, Lock, Loader2 } from 'lucide-react'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleLogin({ email, password })
            navigate('/dashboard')
        } catch (err) {
            // Error is handled by toasts in the useAuth hook
        }
    }

    return (
        <main>
            <div className="form-container">
                <button className='back-btn' onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <header>
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to access your interview dashboard.</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='name@example.com'
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            name='password'
                            placeholder='••••••••'
                            required
                        />
                    </div>

                    <button className='auth-btn' disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Authenticating...
                            </>
                        ) : (
                            <>
                                <LogIn size={18} /> Sign In
                            </>
                        )}
                    </button>
                </form>

                <p>New to GetHired? <Link to={"/register"} >Create an Account</Link></p>
            </div>
        </main>
    )
}

export default Login