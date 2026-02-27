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

	// close mobile menu on resize to desktop
	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth >= 768) setMobileOpen(false);
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

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

	// prevent body scroll when drawer/menu open
	useEffect(() => {
		document.body.style.overflow = mobileOpen || sideOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [mobileOpen, sideOpen]);

	return (
		<>
			{/* Backdrop */}
			<div
				className={`overlay ${
					sideOpen || mobileOpen ? 'open' : ''
				}`}
				onClick={() => {
					setSideOpen(false);
					setMobileOpen(false);
				}}
			/>

			{/* ── Side info drawer ── */}
			<aside className={`sidenav flex flex-col ${sideOpen ? 'open' : ''}`}>
				<div className="flex items-center justify-between px-5 py-4 border-b border-orange-500/20">
					<span className="text-orange-400 font-bold tracking-widest text-xs uppercase">
						Info
					</span>
					<button
						onClick={() => setSideOpen(false)}
						className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-orange-400 text-xl"
					>
						&times;
					</button>
				</div>
				<div className="px-5 py-6 space-y-5 flex-1 overflow-y-auto">
					{[
						{
							label: 'Address',
							value: data.address,
							cls: 'text-gray-300 text-sm leading-relaxed',
						},
						{
							label: 'Phone',
							value: data.phone,
							cls: 'text-orange-400 font-semibold text-sm',
						},
						{
							label: 'Email',
							value: data.email,
							cls: 'text-gray-300 text-sm break-all',
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
						<p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
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
				<div className="px-5 pb-6">
					<a
						href="/admin"
						className="btn-outline w-full justify-center text-xs py-2.5"
					>
						<i className="fas fa-lock" /> Admin Panel
					</a>
				</div>
			</aside>

			{/* ── Navbar ── */}
			<nav
				className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
					scrolled
						? 'bg-black/85 backdrop-blur-xl border-b border-white/5 py-3'
						: 'bg-transparent py-4'
				}`}
			>
				<div className="container-max flex items-center justify-between px-4 sm:px-6 mx-auto">
					{/* Brand */}
					<a href="#home" className="flex items-center gap-2 group flex-shrink-0">
						<span className="w-2 h-2 rounded-full bg-orange-500 group-hover:shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all" />
						<span className="font-bold text-white tracking-tight text-sm sm:text-base truncate max-w-[160px]">
							{data.name}
						</span>
					</a>

					{/* Desktop links */}
					<ul className="hidden md:flex items-center gap-6 lg:gap-8">
						{navLinks.map(({ label, href }) => (
							<li key={href}>
								<a
									href={href}
									className={`nav-link text-sm ${
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

					{/* Mobile: info + hamburger */}
					<div className="md:hidden flex items-center gap-2">
						<button
							onClick={() => setSideOpen(true)}
							className="w-9 h-9 glass rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 transition-colors"
						>
							<i className="fas fa-info text-xs" />
						</button>
						<button
							onClick={() => setMobileOpen(!mobileOpen)}
							className="w-9 h-9 glass rounded-full flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors"
						>
							<i
								className={`fas ${
									mobileOpen ? 'fa-times' : 'fa-bars'
								} text-sm`}
							/>
						</button>
					</div>
				</div>

				{/* Mobile dropdown menu */}
				{mobileOpen && (
					<div className="md:hidden mx-3 mt-2 glass-dark rounded-2xl overflow-hidden border border-white/10">
						{navLinks.map(({ label, href }) => (
							<a
								key={href}
								href={href}
								onClick={() => setMobileOpen(false)}
								className={`flex items-center gap-3 px-5 py-3.5 text-sm border-b border-white/5 last:border-0 transition-colors ${
									activeSection === href.slice(1)
										? 'text-orange-400 bg-orange-500/5'
										: 'text-gray-300 hover:text-orange-400 hover:bg-orange-500/5'
								}`}
							>
								<span
									className={`w-1.5 h-1.5 rounded-full ${
										activeSection === href.slice(1)
											? 'bg-orange-500'
											: 'bg-orange-500/40'
									}`}
								/>
								{label}
							</a>
						))}
						<div className="px-5 py-3 border-t border-white/5">
							<a
								href="/admin"
								className="flex items-center gap-2 text-xs text-gray-600 hover:text-orange-400 transition-colors"
							>
								<i className="fas fa-lock" /> Admin Panel
							</a>
						</div>
					</div>
				)}
			</nav>
		</>
	);
}
