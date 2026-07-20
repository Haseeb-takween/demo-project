/* Shared animation tokens — use everywhere for consistency */
export const ease = [0.16, 1, 0.3, 1] as const; // power3.out
export const easeIn = [0.4, 0, 1, 1] as const;
export const spring = { type: 'spring', stiffness: 280, damping: 24 } as const;
export const springFast = { type: 'spring', stiffness: 380, damping: 28 } as const;
export const dur = 0.5;
export const microDur = 0.2;
export const staggerDelay = 0.07;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * staggerDelay, duration: dur, ease },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * staggerDelay, duration: dur, ease },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * staggerDelay, duration: dur, ease },
  }),
};

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay } },
};
