import { motion } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background';

export default function Hero() {
	return (
		// 👇 THIS creates scroll room
		<section className='relative h-[200vh]'>
			{/* 👇 THIS is what stays */}
			<div className='sticky top-0 h-screen overflow-hidden'>
				<AuroraBackground>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.3,
							duration: 0.8,
							ease: 'easeInOut',
						}}
						className='h-full flex flex-col items-center justify-center gap-8 px-6 text-center'
						id='home'>
						<h1 className='text-6xl md:text-8xl font-bold tracking-tight'>
							<span className='block text-neutral-100'>
								We Build
							</span>
							<span className='block text-neutral-400'>
								Digital Experiences
							</span>
						</h1>

						<p className='text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light'>
							Freelance developers specializing in elegant web
							solutions from frontend to backend.
						</p>
					</motion.div>
				</AuroraBackground>
			</div>
		</section>
	);
}
