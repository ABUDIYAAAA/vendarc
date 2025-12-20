import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const { scrollY } = useScroll();

	useEffect(() => {
		return scrollY.on('change', (latest) => {
			setIsVisible(latest > 500);
		});
	}, [scrollY]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<motion.button
			initial={{ opacity: 0, scale: 0 }}
			animate={{
				opacity: isVisible ? 1 : 0,
				scale: isVisible ? 1 : 0,
			}}
			transition={{ duration: 0.2 }}
			onClick={scrollToTop}
			className='fixed bottom-8 right-8 z-50 p-3 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:border-neutral-600 transition-colors shadow-lg'
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			aria-label='Back to top'>
			<ArrowUp size={20} />
		</motion.button>
	);
};
