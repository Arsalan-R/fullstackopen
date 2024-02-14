import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvidor } from './notificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvidor >
  <QueryClientProvider client={queryClient} >
  <App />
  </QueryClientProvider>
  </NotificationContextProvidor>
)