import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	useEffect(() => {
		document.documentElement.classList.add('dark');
	}, []);

	return (
		<div
			className='
        relative
        bg-neutral-950
        text-neutral-100
        overflow-x-hidden
      '>
			{/* Scroll progress bar */}
			<motion.div
				className='fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 origin-left z-[60]'
				style={{ scaleX }}
			/>

			<Navbar />
			<Hero />
			<Services />
			<Contact />
			<Footer />
			<BackToTop />
		</div>
	);
}
