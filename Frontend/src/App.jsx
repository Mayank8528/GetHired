import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1c2230',
            color: '#e6edf3',
            border: '1px solid #2a3348',
          },
        }} />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App

