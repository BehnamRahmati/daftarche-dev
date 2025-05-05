import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
const Home = React.lazy(() => import('./routes/home'))
const Dashboard = React.lazy(() => import('./routes/dashboard/dashboard.tsx'))
const DashboardLayout = React.lazy(() => import('./routes/dashboard/dashboard-layout.tsx'))
const Login = React.lazy(() => import('./routes/auth/login'))
const Register = React.lazy(() => import('./routes/auth/register'))
const Clipboards = React.lazy(() => import('./routes/dashboard/clipboards'))
const Conversations = React.lazy(() => import('./routes/dashboard/conversations'))
const Files = React.lazy(() => import('./routes/dashboard/files'))
const AuthLayout = React.lazy(() => import('./routes/auth/auth-layout.tsx'))
const Upload = React.lazy(() => import('./routes/dashboard/files/upload'))
const Proxy = React.lazy(() => import('./routes/dashboard/files/proxy'))
export default function Routeprovider() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route index element={<Home />} />
					<Route path='auth' element={<AuthLayout />}>
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
					</Route>
					<Route path='/dashboard' element={<DashboardLayout />}>
						<Route index element={<Dashboard />} />
						<Route path='clipboards' element={<Clipboards />} />
						<Route path='conversations' element={<Conversations />} />
						<Route path='files'>
							<Route index element={<Files />} />
							<Route path='upload' element={<Upload />} />
							<Route path='proxy' element={<Proxy />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
