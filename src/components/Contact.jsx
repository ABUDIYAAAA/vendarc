import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
	const reduceMotion = useReducedMotion();
	const [copied, setCopied] = useState(false);

	const fadeUp = {
		hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	const handleCopyEmail = async (e) => {
		e.preventDefault();
		try {
			await navigator.clipboard.writeText('hello@vendarc.com');
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			// Fallback: open mailto
			window.location.href = 'mailto:hello@vendarc.com';
		}
	};

	return (
		<section
			id='contact'
			className='relative pt-20 pb-20 px-6 lg:px-8 overflow-hidden'>
			{/* Animated background gradient orbs */}
			<div className='pointer-events-none absolute inset-0'>
				<motion.div
					className='absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl'
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
				<motion.div
					className='absolute left-1/3 top-48 h-64 w-64 rounded-full bg-white/3 blur-3xl'
					animate={{
						scale: [1, 1.3, 1],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1,
					}}
				/>
			</div>

			<motion.div
				className='max-w-4xl mx-auto text-center relative'
				variants={fadeUp}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.35 }}>
				{/* Decorative line */}
				<motion.div
					className='w-px h-20 bg-gradient-to-b from-transparent via-neutral-700 to-transparent mx-auto mb-12'
					initial={{ height: 0 }}
					whileInView={{ height: 80 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: true }}
				/>

				<motion.h2
					className='text-5xl md:text-6xl font-semibold tracking-tight mb-6'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					viewport={{ once: true }}>
					Let's Work Together
				</motion.h2>

				<motion.p
					className='text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-14'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					viewport={{ once: true }}>
					Have a project in mind? Let's build something focused,
					thoughtful, and impactful.
				</motion.p>

				{/* Email link with hover effect */}
				<div className='relative inline-block'>
					<motion.a
						href='mailto:hello@vendarc.com'
						onClick={handleCopyEmail}
						className='group relative inline-flex items-center gap-3 text-2xl md:text-3xl font-medium text-neutral-200 hover:text-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/40 rounded-lg px-4 py-3'
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.05 }}
						transition={{ delay: 0.5 }}
						viewport={{ once: true }}>
						<Mail className='w-6 h-6 md:w-7 md:h-7 text-neutral-500 group-hover:text-neutral-300 transition-colors' />
						<span className='relative'>
							hello@vendarc.com
							<span className='absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-neutral-700 to-neutral-500 group-hover:w-full transition-all duration-500' />
						</span>
						{copied ? (
							<Check className='w-5 h-5 md:w-6 md:h-6 text-green-400' />
						) : (
							<Copy className='w-5 h-5 md:w-6 md:h-6 text-neutral-600 group-hover:text-neutral-400 transition-all' />
						)}
					</motion.a>

					{/* Copy tooltip */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{
							opacity: copied ? 1 : 0,
							y: copied ? 0 : 10,
						}}
						className='absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-neutral-300 whitespace-nowrap pointer-events-none'>
						Copied to clipboard!
					</motion.div>
				</div>

				<motion.p
					className='mt-10 text-sm text-neutral-500 max-w-xl mx-auto'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					viewport={{ once: true }}>
					Reply time is usually within 24 hours. If you prefer,
					include a quick brief and a budget range.
				</motion.p>

				{/* Decorative grid pattern */}
				<div className='absolute inset-0 -z-10 opacity-[0.03] pointer-events-none'>
					<div
						className='absolute inset-0'
						style={{
							backgroundImage: `linear-gradient(to right, #fafafa 1px, transparent 1px),
                               linear-gradient(to bottom, #fafafa 1px, transparent 1px)`,
							backgroundSize: '40px 40px',
						}}
					/>
				</div>
			</motion.div>
		</section>
	);
}
