export default function LatestList() {
	return (
		<div>
			<div className='flex flex-col'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className='p-2.5 even:bg-accent flex items-center gap-2.5 rounded-sm'
					>
						<div className='shrink-0 bg-gray-300 size-10 rounded-full'></div>
						<div className='flex-1'>
							<div className='flex justify-between'>
								<div className='font-light'>behnam Rahmati</div>
								<div className='font-light text-xs'>5 days ago</div>
							</div>
							<div className='shrink-0'>
								<p className='font-light text-xs text-muted-foreground truncate w-full'>
									hi how are you
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
