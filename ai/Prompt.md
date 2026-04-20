# Problem
> I have this hero section, and i want to implement this (scroll frame video) like a independent component, following my own archtecture and existent hooks, take a look of the base code

``` tsx
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export default function Hero() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 20,
        restDelta: 0.001
    });

    const opacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0.3, 0.5], [0, -50]);

    // Handle smooth scrubbing via framer-motion native events
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (videoRef.current && Number.isFinite(videoRef.current.duration) && isVideoLoaded) {
            videoRef.current.currentTime = latest * videoRef.current.duration;
        }
    });

    // Fetch video into Blob to ensure it's fully in memory for better scrubbing performance without I/O stall
    useEffect(() => {
        const loadVideo = async () => {
            try {
                const response = await fetch("/video-underwater-optimized.mp4");
                const blob = await response.blob();
                if (videoRef.current) {
                    videoRef.current.src = URL.createObjectURL(blob);
                }
            } catch (error) {
                console.error("Failed to preload video:", error);
            }
        };
        loadVideo();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-zinc-950">

                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={() => setIsVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30 pointer-events-none" />

                <motion.div
                    style={{ opacity, y }}
                    className="relative z-10 h-full max-w-7xl mx-auto flex items-center px-4 md:px-8"
                >
                    <div className="grid md:grid-cols-2 gap-12 w-full">

                        <div className="flex flex-col gap-8">
                            <h1 className="text-5xl md:text-7xl text-white">
                                Você merece um sistema <span className="text-blue-500">melhor.</span>
                            </h1>

                            <p className="text-lg text-zinc-400 max-w-[45ch]">
                                Software ruim é barato e custa caro. <span className="text-blue-500">Resolva isso.</span>
                            </p>

                            <div className="flex gap-4 pt-4">
                                <button className="px-6 py-3 bg-white text-zinc-950 rounded-full flex items-center gap-2">
                                    Comece agora <ArrowRight />
                                </button>

                                <a href="#segunda-dobra" className="px-6 py-3 border border-white/10 text-white rounded-full hover:bg-white/5">
                                    Conheça mais
                                </a>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: [0, 5, 0, -5, 0], y: [0, -10, 0, 10, 0] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-48 h-48 rounded-full border border-white/5 backdrop-blur-2xl"
                            />
                        </div>

                    </div>
                </motion.div>
            </div>

            <div className="relative z-10 h-full max-w-7xl mx-auto flex items-center px-4 md:px-8"  >

                <div className="grid md:grid-cols-1 gap-12 w-full">

                    <div className="flex flex-col gap-8" >
                        <h1 className="text-5xl md:text-7xl text-white">
                            Transformamos sistemas em vantagem competitiva.
                        </h1>

                        <p className="text-lg text-zinc-400 max-w-[45ch]">
                            Fundamos a Ravius para mudar a realidade das <span className="text-blue-500">empresas.</span>
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}
```

> you gonna recive my context arch too in CONTEXT-BASE.md

# Solution
Create a independent component for this scroll video frame based in context-base.md