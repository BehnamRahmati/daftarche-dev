import React from 'react'

const HomeApps = React.lazy(() => import('@/components/home/home-apps'))
const HomeBanner = React.lazy(() => import('@/components/home/home-banner'))
const HomeHeader = React.lazy(() => import('@/components/home/home-header'))

export default function Home() {
	return (
		<>
			<HomeHeader />
			<HomeBanner />
			<HomeApps />
		</>
	)
}
