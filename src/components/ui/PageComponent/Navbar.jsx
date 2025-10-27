import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <nav className="bg-white border-b shadow-sm dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo / Brand Name */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-2xl font-bold text-blue-600">
                AssignFlow <Flame />
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
              >
                Assignments
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
              >
                Saved
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
              >
                About
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                whileTap={{ scale: 0.85 }}
                className="text-gray-700 dark:text-gray-200 focus:outline-none"
              >
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden bg-white dark:bg-gray-900 border-t"
            >
              {/* <div className=""> */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05, delaChildren: 0.1 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.03, staggerDirection: -1 },
                  },
                }}
                className="flex flex-col space-y-2 px-4 py-3"
              >
                {["Home", "Assignments", "saved", "About"].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                  >
                    {item}
                  </motion.a>
                ))}
                {/* <a
                  href="#"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  Assignments
                </a>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  Saved
                </a>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
                >
                  About
                </a> */}
              </motion.div>
              {/* </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Navbar;
