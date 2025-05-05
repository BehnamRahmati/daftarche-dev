import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import './index.css'
import Routeprovider from './router/route-provider.tsx'
import { checkAuthStatus } from './store/features/user/user-thunks.ts'
import { store } from './store/store.ts'

store.dispatch(checkAuthStatus())

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<Routeprovider />
			<Toaster />
		</Provider>
	</StrictMode>,
)
