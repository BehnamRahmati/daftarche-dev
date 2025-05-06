import Loading from '@/components/loading.tsx'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
const Home = lazy(() => import('./routes/home'))
const Dashboard = lazy(() => import('./routes/dashboard/dashboard.tsx'))
const DashboardLayout = lazy(() => import('./routes/dashboard/dashboard-layout.tsx'))
const Login = lazy(() => import('./routes/auth/login'))
const Register = lazy(() => import('./routes/auth/register'))
const Clipboards = lazy(() => import('./routes/dashboard/clipboards'))
const Conversations = lazy(() => import('./routes/dashboard/conversations'))
const ConversationsLayout = lazy(
	() => import('./routes/dashboard/conversations/conversations-layout.tsx'),
)
const Files = lazy(() => import('./routes/dashboard/files'))
const AuthLayout = lazy(() => import('./routes/auth/auth-layout.tsx'))
const Upload = lazy(() => import('./routes/dashboard/files/upload'))
const Proxy = lazy(() => import('./routes/dashboard/files/proxy'))

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<Loading />}>
						<Home />
					</Suspense>
				),
			},
			{
				path: 'auth',
				element: (
					<Suspense fallback={<Loading />}>
						<AuthLayout />
					</Suspense>
				),
				children: [
					{
						path: 'login',
						element: (
							<Suspense fallback={<Loading />}>
								<Login />
							</Suspense>
						),
					},
					{
						path: 'register',
						element: (
							<Suspense fallback={<Loading />}>
								<Register />
							</Suspense>
						),
					},
				],
			},
			{
				path: '/dashboard',
				element: (
					<Suspense fallback={<Loading />}>
						<DashboardLayout />
					</Suspense>
				),
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<Loading />}>
								<Dashboard />
							</Suspense>
						),
					},
					{
						path: 'clipboards',
						element: (
							<Suspense fallback={<Loading />}>
								<Clipboards />
							</Suspense>
						),
					},
					{
						path: 'conversations',
						element: (
							<Suspense fallback={<Loading />}>
								<ConversationsLayout />
							</Suspense>
						),
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={<Loading />}>
										<Conversations />
									</Suspense>
								),
							},
							{
								path: ':conversationId',
								element: (
									<Suspense fallback={<Loading />}>
										<Conversations />
									</Suspense>
								),
							},
						],
					},
					{
						path: 'files',
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={<Loading />}>
										<Files />
									</Suspense>
								),
							},
							{
								path: 'upload',
								element: (
									<Suspense fallback={<Loading />}>
										<Upload />
									</Suspense>
								),
							},
							{
								path: 'proxy',
								element: (
									<Suspense fallback={<Loading />}>
										<Proxy />
									</Suspense>
								),
							},
						],
					},
				],
			},
		],
	},
])

export default function Routeprovider() {
	return <RouterProvider router={router} />
}
