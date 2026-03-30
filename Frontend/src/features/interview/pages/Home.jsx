import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { ArrowLeft, LogOut, Upload, FileText, Sparkles, ChevronRight, Briefcase, User, CheckCircle, CloudUpload, Info } from 'lucide-react'

import { useAuth } from '../../auth/hooks/useAuth'


const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const { handleLogout, user } = useAuth()
    const [jobDescription, setJobDescription] = useState("")

    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const file = resumeFile || resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile: file })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home-page'>
            <nav className='dashboard-nav'>
                <button className='back-link' onClick={() => navigate('/')}>
                    <ArrowLeft size={16} /> Home
                </button>
                <div className='logo-dashboard'>
                    <img src='/logo.png' alt='Logo' style={{ height: '28px', borderRadius: '4px' }} />
                </div>
                <div className='user-actions'>
                    <span className='user-name'>Welcome, {user?.username}</span>
                    <button className='logout-btn' onClick={handleLogout}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </nav>


            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>

                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <Briefcase size={18} />
                            </span>
                            <h2>Target Job Description</h2>

                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>0 / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <User size={18} />
                            </span>
                            <h2>Your Profile</h2>

                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    {resumeFile ? (
                                        <CheckCircle size={28} color="#10b981" />
                                    ) : (
                                        <CloudUpload size={28} />
                                    )}
                                </span>

                                <p className='dropzone__title'>{resumeFile ? `Selected: ${resumeFile.name}` : 'Click to upload or drag & drop'}</p>
                                <p className='dropzone__subtitle'>{resumeFile ? 'Click to change file' : 'PDF or DOCX (Max 5MB)'}</p>
                                <input
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                    ref={resumeInputRef}
                                    hidden
                                    type='file'
                                    id='resume'
                                    name='resume'
                                    accept='.pdf,.docx'
                                />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <Info size={16} />
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>

                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        disabled={loading}
                        className='generate-btn'>
                        {loading ? (
                            <span className='btn-spinner'></span>
                        ) : (
                            <Sparkles size={16} />
                        )}
                        {loading ? 'Generating Strategy...' : 'Generate My Interview Strategy'}

                    </button>

                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home