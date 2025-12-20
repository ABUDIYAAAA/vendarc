import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ icon: Github, href: '#', label: 'GitHub' },
		{ icon: Linkedin, href: '#', label: 'LinkedIn' },
		{ icon: Twitter, href: '#', label: 'Twitter' },
	];

	return (
		<footer className='relative border-t border-neutral-900/70 py-8 overflow-hidden'>
			{/* Subtle gradient */}
			<div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none' />

			<div className='relative max-w-7xl mx-auto px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row items-center justify-between gap-8'>
					{/* Left side - Brand */}
					<motion.div
						className='flex flex-col items-center md:items-start gap-3'
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}>
						<a
							href='#home'
							className='text-xl font-semibold tracking-tight group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/40 rounded-md'>
							<span className='text-neutral-100 group-hover:text-white transition-colors'>
								Vend
							</span>
							<span className='text-neutral-400 group-hover:text-neutral-300 transition-colors'>
								arc
							</span>
						</a>
						<p className='text-xs text-neutral-600'>
							© {currentYear} Vendarc. All rights reserved.
						</p>
					</motion.div>

					{/* Right side - Social links */}
					<motion.div
						className='flex items-center gap-3'
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}>
						{socialLinks.map((social, index) => {
							const Icon = social.icon;
							return (
								<motion.a
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className='group relative p-2 rounded-full border border-neutral-800 hover:border-neutral-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/40'
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}>
									<Icon className='w-4 h-4 text-neutral-600 group-hover:text-neutral-300 transition-colors' />
									{/* Glow effect on hover */}
									<span className='absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors' />
								</motion.a>
							);
						})}
					</motion.div>
				</div>

				{/* Bottom decorative line */}
				<motion.div
					className='mt-8 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent'
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					transition={{ duration: 1, delay: 0.3 }}
					viewport={{ once: true }}
				/>
			</div>
		</footer>
	);
}
