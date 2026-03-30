import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { ArrowLeft, UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react'

const Register = () => {
    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleRegister({ username, email, password })
            navigate('/dashboard')
        } catch (err) {
            // Error handled by toasts in useAuth
        }
    }

    return (
        <main>
            <div className="form-container">
                <button className='back-btn' onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <header>
                    <h1>Join GetHired</h1>
                    <p>Start your AI-powered interview journey today.</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Full Name</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            id="username"
                            name='username'
                            placeholder='e.g. John Doe'
                            required
                        />
                    </div>
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
                        <label htmlFor="password">Create Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Min. 8 characters'
                            required
                        />
                    </div>

                    <button className='auth-btn' disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <UserPlus size={18} /> Sign Up
                            </>
                        )}
                    </button>
                </form>

                <p>Already have an account? <Link to={"/login"} >Log In</Link></p>
            </div>
        </main>
    )
}

export default Register