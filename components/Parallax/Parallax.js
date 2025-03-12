import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@studio-freight/hamo";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './parallax.module.scss';

export function Parallax({ className = "", children, speed = 1, horizontal = false, id = "parallax", aspectRatio = false }) {
    const trigger = useRef();
    const target = useRef();
    const timeline = useRef();
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [height, setHeight] = useState(windowHeight);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setHeight(entries[0].target.clientHeight)
        }
        )
        resizeObserver.observe(document.body)
    }, [children])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const y = windowWidth * speed *  0.05;
        const x = windowWidth * speed *  0.05;
        const setY = gsap.quickSetter(target.current, "y", "px");

        timeline.current = gsap.timeline({
            scrollTrigger: {
                id: id,
                trigger: trigger.current,
                scrub: 0.3,
                start: "top bottom",
                end: "bottom top",
                // markers:true
            },
        })
        if (horizontal) {
            timeline.current.fromTo(target.current, {
                x: -x,
                scale: 1
            }, {
                x: x,
                scale: 1,
                ease: "none"
            })
        } else
            timeline.current.fromTo(target.current, {
                y: -y,
                scale: 1
            }, {
                y: y,
                scale: 1,
                ease: "none"
            })

        return () => {
            timeline?.current?.kill();
        };
    }, [id, speed, windowWidth, height]);

    return (
        <div className="parallax-container">
            <div className={`${aspectRatio && styles.aspectRatio} ${className} ${styles.parallax}`}>
                <div ref={trigger}>
                    <div ref={target}>{children}</div>
                </div>
            </div>
        </div>
    );
}