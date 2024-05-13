import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
}

export default function Drawer({
  isOpen,
  children,
}: DrawerProps): React.JSX.Element {
  const variants = {
    open: {
      x: 0,
      width: "auto",
      maxWidth: "100%",
    },
    closed: {
      x: "-100%",
      width: 0,
    },
  };

  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const drawerRef = useRef<HTMLDivElement>(null);

  // Effect to toggle the body scroll based on the drawer state
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        ref={drawerRef}
        className="fixed left-0 top-0 z-40 h-full overflow-hidden bg-white shadow-md xl:left-[103px] xl:rounded-r-2xl"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
        style={{
          width:
            drawerRef.current != null
              ? `${drawerRef.current.scrollWidth}px`
              : "auto",
          maxWidth: "calc(100% - 103px)",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
