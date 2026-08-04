export const smoothEase = [0.16, 1, 0.3, 1];
export const softEase = [0.22, 0.61, 0.36, 1];

export const viewportOnce = {
  amount: 0.16,
  margin: "0px 0px -8% 0px",
  once: true,
};

export const pageTransitionVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.24,
      ease: softEase,
    },
  },
};

export const navbarVariants = {
  hidden: {
    opacity: 0,
    y: -22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: smoothEase,
    },
  },
  autoHidden: {
    opacity: 0,
    y: "-108%",
    transition: {
      duration: 0.28,
      ease: softEase,
    },
  },
};

export const navbarInnerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.06,
    },
  },
};

export const navbarSectionVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

export const navbarLinksVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: smoothEase,
    },
  },
  closed: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.24,
      ease: softEase,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: smoothEase,
    },
  },
};

export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.14,
    },
  },
};

export const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 38,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.84,
      ease: smoothEase,
    },
  },
};

export const heroVisualVariants = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.18,
      duration: 0.94,
      ease: smoothEase,
    },
  },
};

export const carouselItemVariants = {
  hidden: {
    opacity: 0,
    x: 22,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.56,
      ease: smoothEase,
    },
  },
};

export const footerRevealVariants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

export const mobileNavVariants = {
  closed: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.22,
      ease: softEase,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: smoothEase,
      staggerChildren: 0.045,
    },
  },
};

export const productDropdownVariants = {
  closed: {
    opacity: 0,
    y: -10,
    scale: 0.985,
    transition: {
      duration: 0.2,
      ease: softEase,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.36,
      ease: smoothEase,
      staggerChildren: 0.045,
    },
  },
};

export const dropdownItemVariants = {
  closed: {
    opacity: 0,
    y: 7,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: smoothEase,
    },
  },
};
