'use client';
import { useState, useEffect } from 'react';

const navLinks = [
	{ label: 'Home', href: '#home' },
	{ label: 'About', href: '#about' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Portfolio', href: '#portfolio' },
	{ label: 'Contact', href: '#contact' },
];

interface SiteConfig {
	name: string;
	address: string;
	phone: string;
	email: string;
	socials: { instagram: string; linkedin: string; youtube: string };
}

export default function Navbar({ data }: { data: SiteConfig }) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [sideOpen, setSideOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('home');

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 60);
			for (const { href } of [...navLinks].reverse()) {
				const el = document.getElementById(href.slice(1));
				if (el && window.scrollY >= el.offsetTop - 120) {
					setActiveSection(href.slice(1));
					break;
				}
			}
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<>
			<div
				className={`overlay ${sideOpen ? 'open' : ''}`}
				onClick={() => setSideOpen(false)}
			/>

			{/* Side Drawer */}
			<aside className={`sidenav flex flex-col ${sideOpen ? 'open' : ''}`}>
				<div className="flex items-center justify-between px-6 py-5 border-b border-orange-500/20">
					<span className="text-orange-400 font-bold tracking-widest text-sm uppercase">
						Info
					</span>
					<button
						onClick={() => setSideOpen(false)}
						className="text-gray-400 hover:text-orange-400 text-2xl leading-none"
					>
						&times;
					</button>
				</div>
				<div className="px-6 py-8 space-y-6 flex-1">
					{[
						{
							label: 'Address',
							value: data.address,
							cls: 'text-gray-300 text-sm leading-relaxed',
						},
						{
							label: 'Phone',
							value: data.phone,
							cls: 'text-orange-400 font-semibold',
						},
						{
							label: 'Email',
							value: data.email,
							cls: 'text-gray-300 text-sm',
						},
					].map(({ label, value, cls }) => (
						<div key={label}>
							<p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
								{label}
							</p>
							<p className={cls}>{value}</p>
						</div>
					))}
					<div className="pt-4 border-t border-white/10">
						<p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
							Social
						</p>
						<div className="flex gap-3">
							{[
								{ href: data.socials.instagram, icon: 'fab fa-instagram' },
								{ href: data.socials.linkedin, icon: 'fab fa-linkedin' },
								{ href: data.socials.youtube, icon: 'fab fa-youtube' },
							].map(({ href, icon }) => (
								<a
									key={icon}
									href={href}
									target="_blank"
									rel="noreferrer"
									className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 transition-colors"
								>
									<i className={icon} />
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="px-6 pb-6">
					<a
						href="/admin"
						className="btn-outline w-full justify-center text-xs py-2.5"
					>
						<i className="fas fa-lock" /> Admin Panel
					</a>
				</div>
			</aside>

			{/* Navbar */}
			<nav
				className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
					scrolled
						? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3'
						: 'bg-transparent py-5'
				}`}
			>
				<div className="container-max flex items-center justify-between px-6 mx-auto">
					{/* Brand */}
					<a href="#home" className="flex items-center gap-2 group">
						<span className="w-2 h-2 rounded-full bg-orange-500 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all" />
						<span className="font-bold text-white tracking-tight">
							{data.name}
						</span>
					</a>

					{/* Desktop links */}
					<ul className="hidden md:flex items-center gap-8">
						{navLinks.map(({ label, href }) => (
							<li key={href}>
								<a
									href={href}
									className={`nav-link text-sm transition-all ${
										activeSection === href.slice(1)
											? 'text-orange-400'
											: ''
									}`}
								>
									{label}
								</a>
							</li>
						))}
						<li>
							<button
								onClick={() => setSideOpen(true)}
								className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 transition-colors"
							>
								<i className="fas fa-ellipsis-v text-xs" />
							</button>
						</li>
					</ul>

					{/* Mobile toggle */}
					<button
						className="md:hidden text-gray-300 hover:text-orange-400 transition-colors text-xl"
						onClick={() => setMobileOpen(!mobileOpen)}
					>
						<i className={mobileOpen ? 'fas fa-times' : 'fas fa-bars'} />
					</button>
				</div>

				{/* Mobile menu */}
				{mobileOpen && (
					<div className="md:hidden glass-dark mx-4 mt-2 rounded-xl overflow-hidden border border-white/10">
						{navLinks.map(({ label, href }) => (
							<a
								key={href}
								href={href}
								onClick={() => setMobileOpen(false)}
								className="flex items-center gap-3 px-5 py-3.5 text-sm text-gray-300 hover:text-orange-400 hover:bg-orange-500/5 border-b border-white/5 last:border-0 transition-colors"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
								{label}
							</a>
						))}
					</div>
				)}
			</nav>
		</>
	);
}
