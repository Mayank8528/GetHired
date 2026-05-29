import React from 'react'
import { useNavigate } from 'react-router'
import { Rocket, Shield, Target, Brain, ArrowRight, Sparkles, LayoutDashboard, CodeXml } from 'lucide-react'

import '../style/landing.scss'
import { useAuth } from '../../auth/hooks/useAuth'

const Landing = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div className='landing-root'>
            {/* Header / Navbar */}
            <nav className='landing-nav'>
                <div className='logo'>
                    <img src='/logo.png' alt='GetHired Logo' style={{ height: '32px', borderRadius: '4px' }} />
                    <span>GetHired</span>
                </div>

                <div className='nav-links'>
                    {user ? (
                        <button onClick={() => navigate('/dashboard')} className='nav-btn-primary'>
                            <LayoutDashboard size={16} /> Dashboard
                        </button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className='nav-btn-text'>Sign In</button>
                            <button onClick={() => navigate('/register')} className='nav-btn-primary'>Get Started</button>
                        </>
                    )}
                </div>
            </nav>


            {/* Hero Section */}
            <section className='hero'>
                <div className='hero-content'>
                    <div className='pill-badge'>AI-Powered Interview Coach</div>
                    <h1>Master Your Next <span className='gradient-text'>Big Interview</span></h1>
                    <p>
                        GetHired analyzes your profile and target job descriptions to build a personalized
                        roadmap, technical prep plans, and behavioral strategies. Don't leave your career to chance.
                    </p>
                    <div className='hero-btns'>
                        {user ? (
                            <button onClick={() => navigate('/dashboard')} className='btn-hero-primary'>
                                Go to Dashboard <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button onClick={() => navigate('/register')} className='btn-hero-primary'>
                                Create Your Plan <ArrowRight size={18} />
                            </button>
                        )}
                        <a href="https://github.com/kanak227/interview-ai-yt" target="_blank" rel="noreferrer" className='btn-hero-secondary'>
                            <CodeXml size={18} /> View Source
                        </a>

                    </div>

                </div>
                <div className='hero-visual'>
                    <div className='visual-card'>
                        <div className='card-header'>
                            <Brain className='header-icon' />
                            <span>AI Analysis in Progress...</span>
                        </div>
                        <div className='card-body'>
                            <div className='skeleton-line w-full'></div>
                            <div className='skeleton-line w-3/4'></div>
                            <div className='skeleton-line w-1/2'></div>
                        </div>
                    </div>
                    <div className='visual-glow'></div>
                </div>
            </section>

            {/* Features Section */}
            <section className='features'>
                <div className='features-grid'>
                    <div className='feature-card'>
                        <div className='feature-icon-wrapper'>
                            <Target className='feature-icon' />
                        </div>
                        <h3>Personalized Roadmap</h3>
                        <p>Generate a step-by-step preparation plan tailored specifically to the job roles you're targeting.</p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-icon-wrapper'>
                            <Brain className='feature-icon' />
                        </div>
                        <h3>Deep Skill Analysis</h3>
                        <p>Identify your strengths and bridge critical skill gaps with AI-driven gap detection.</p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-icon-wrapper'>
                            <Shield className='feature-icon' />
                        </div>
                        <h3>Proven Strategies</h3>
                        <p>Get data-backed technical and behavioral interview strategies that actually work.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='landing-footer'>
                <p>&copy; {new Date().getFullYear()} GetHired. Built for future engineers.</p>
                <div className='footer-links'>
                    <a href='#'>Privacy</a>
                    <a href='#'>Security</a>
                    <a href='#'>Contact</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing
