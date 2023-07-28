import Link from "next/link"
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const Banner = () => {
	const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

	const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // await console.log(container);
    }, []);

	return <section id="about" className="flex items-center h-screen relative overflow-hidden">
		<Particles
			className="absolute top-0 bottom-0 right-0 left-0 z-0"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
				fullScreen: { enable: false },
                fpsLimit: 30,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 1,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
		<div className="container mx-auto text-center text-white z-[1]">
			<h1 className="text-[30px] lg:text-[80px] font-semibold uppercase text-shadow-dark">REAL IELTS ON VIDEO</h1>
			<h2 className="text-[16px] lg:text-[34px] font-semibold uppercase">HỆ THỐNG LUYỆN THI IELTS QUA VIDEO COACHING</h2>
			<p className="text-[14px] lg:text-[16px] italic my-12">Real people make miracles!</p>

			<Link href="/login" className="inline-flex uppercase py-4 px-10 bg-cyan text-white font-bold hover:opacity-90 focus:opacity-90">TRẢI NGHIỆM NGAY</Link>
		</div>
	</section>
}

export default Banner