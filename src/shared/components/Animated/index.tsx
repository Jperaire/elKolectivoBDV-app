import { ReactNode, useState } from "react";
import styles from "./Animated.module.css";

interface AnimatedProps {
    children: ReactNode;
    animation: keyof typeof styles;
}

export const Animated = ({ children, animation }: AnimatedProps) => {
    const [active, setActive] = useState(false);

    return (
        <div
            className={active ? styles[animation] : ""}
            onMouseEnter={() => setActive(true)}
            onAnimationEnd={() => setActive(false)}
            onTouchStart={() => setActive(true)}
            onFocus={() => setActive(true)}
        >
            {children}
        </div>
    );
};
