import { Layout, Server, Layers, Plug, Brain, Gauge } from 'lucide-react';

import { motion, useReducedMotion } from 'framer-motion';
import { FeaturesSectionWithHoverEffects } from './ui/feature-section-with-hover-effects';

export default function Services() {
	const reduceMotion = useReducedMotion();
	const fadeUp = {
		hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	const services = [
		{
			title: 'Frontend Development',
			description:
				'Crafting clean, responsive interfaces with modern frameworks and strong attention to detail.',
			icon: <Layout size={20} />,
		},
		{
			title: 'Backend Development',
			description:
				'Building scalable, secure server-side systems that power real-world applications.',
			icon: <Server size={20} />,
		},
		{
			title: 'Full Stack Solutions',
			description:
				'End-to-end product development from architecture to deployment.',
			icon: <Layers size={20} />,
		},
		{
			title: 'API Design & Integrations',
			description:
				'Designing robust APIs and integrating third-party services to connect systems seamlessly.',
			icon: <Plug size={20} />,
		},
		{
			title: 'AI-Powered Features',
			description:
				'Implementing practical AI features like automation, recommendations, and intelligent workflows.',
			icon: <Brain size={20} />,
		},
		{
			title: 'Performance & Scalability',
			description:
				'Optimizing applications for speed, reliability, and growth as your user base scales.',
			icon: <Gauge size={20} />,
		},
	];

	return (
		<section
			id='services'
			className='
        relative
        z-10
        -mt-[100vh]
        bg-neutral-950
        rounded-t-[48px]
        shadow-[0_-40px_80px_rgba(0,0,0,0.6)]
      '>
			{/* Floating particles effect */}
			<div className='absolute inset-0 overflow-hidden rounded-t-[48px] pointer-events-none'>
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-1 h-1 bg-neutral-700/30 rounded-full'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>

			<motion.div
				variants={fadeUp}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.25 }}>
				<FeaturesSectionWithHoverEffects
					title='What We Do'
					subtitle='Focused, high-quality web development services'
					features={services}
				/>
			</motion.div>
		</section>
	);
}
