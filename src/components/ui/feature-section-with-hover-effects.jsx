import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const FeaturesSectionWithHoverEffects = ({
	features,
	title,
	subtitle,
}) => {
	return (
		<section className='py-32 px-6 lg:px-8 relative overflow-hidden'>
			{/* Subtle background gradient */}
			<div className='absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-transparent pointer-events-none' />

			<div className='max-w-7xl mx-auto relative z-10'>
				<motion.div
					className='text-center mb-20'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					<h2 className='text-4xl md:text-5xl font-semibold tracking-tight mb-4'>
						{title}
					</h2>
					<p className='text-neutral-400 text-lg max-w-2xl mx-auto'>
						{subtitle}
					</p>
				</motion.div>

				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							{...feature}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

const FeatureCard = ({ icon, title, description, index }) => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{
			duration: 0.5,
			delay: index * 0.1,
			ease: 'easeOut',
		}}
		whileHover={{
			y: -8,
			transition: { duration: 0.2 },
		}}
		className={cn(
			'rounded-2xl p-8 bg-neutral-900/70 backdrop-blur',
			'border border-neutral-800 transition-colors hover:border-neutral-600',
			'group relative overflow-hidden'
		)}>
		{/* Hover glow effect */}
		<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
			<div className='absolute inset-0 bg-gradient-to-br from-neutral-700/20 to-transparent' />
		</div>

		<div className='relative z-10'>
			<motion.div
				className='mb-6 h-11 w-11 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 transition-colors'
				whileHover={{ scale: 1.1, rotate: 5 }}
				transition={{ duration: 0.2 }}>
				{icon}
			</motion.div>

			<h3 className='text-xl font-semibold mb-3 group-hover:text-white transition-colors'>
				{title}
			</h3>
			<p className='text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors'>
				{description}
			</p>
		</div>

		{/* Corner accent */}
		<div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neutral-700/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
	</motion.div>
);
