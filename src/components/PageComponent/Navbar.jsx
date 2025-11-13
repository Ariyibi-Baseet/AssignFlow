import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Flame } from "lucide-react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { signInWithGoogle } from "../../fi reBaseConfig";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, signInWithGoogle, logout } = useAuth();

  // Get First Letter First Name and First Letter in Last name from gmail login
  const getInitials = (name) => {
    if (!name) return "G"; // fallback
    const fullname = name.split(" ");
    const firstName = fullname[0]?.charAt(0).toUpperCase();
    const lastName = fullname[1]?.charAt(0).toUpperCase() || ""; // handle single name
    return firstName + lastName;
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo / Brand Name */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-2xl font-bold text-[#8d37ea]">
                AssignFlow <Flame />
              </span>
            </div>

            <Link to="https://github.com/Ariyibi-Baseet/AssignFlow">
              <Button className="bg-[#8d37ea] hover:bg-[#6868f0]">
                <Github size={30} />
                Star on Github
              </Button>
            </Link>

            {/*********** Desktop Menu ***************************/}
            {/* <div className="hidden md:flex space-x-6"> */}
            {/* <Link className="text-gray-700 dark:text-gray-200 hover:text-blue-600 disabled">
                Home
              </Link>
              <Link className="text-gray-700 dark:text-gray-200 hover:text-blue-600 disabled">
                About
              </Link>
              <Link className="text-gray-700 dark:text-gray-200 hover:text-blue-600 disabled">
                Assignments
              </Link>
              <Link className="text-gray-700 dark:text-gray-200 hover:text-blue-600 disabled">
                Saved
              </Link> */}
            {/* </div> */}
            {/***************************************************************/}

            <div className="flex items-center">
              {/* AUTH Section */}
              {!user ? (
                <Button className="ms-2" onClick={signInWithGoogle}>
                  Sign in
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-google"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                    </svg>
                  </span>
                </Button>
              ) : (
                <div className="ms-2 flex items-center">
                  <Avatar>
                    <AvatarImage src={user.photoURL} alt="User Avatar" />
                    <AvatarFallback className="font-bold">
                      {getInitials(user.displayName)}
                    </AvatarFallback>
                  </Avatar>

                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="ms-2"
                  >
                    Logout
                  </Button>
                </div>
              )}

              {/* <Button variant="desctructive" onClick={logout}>
                Logout
              </Button> */}
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
        {/* <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden bg-white dark:bg-gray-900 border-t"
            >
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
                {["Home", "About", "Assignments", "saved"].map((item) => (
                  <motion.a
                    key={item}
                    to="#"
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </nav>
    </>
  );
}

export default Navbar;
