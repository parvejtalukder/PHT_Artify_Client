import { MenuIcon, Moon, Palette, Sun, XIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const Header = () => {

    const loggedNotice = () => toast.success("Logged Out!");
    const pathLocation = useLocation();
    const realPath = pathLocation.pathname;
    const { user, SignOut } = useContext(AuthContext);
    const [mobileActualMenu, setIsMobileActualMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState("artify-light");
    
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "artify-light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        setTheme(savedTheme);
    }, [theme]);
    
    const toggleTheme = () => {
        const nextTheme = theme === "artify-dark" ? "artify-light" : "artify-dark";
            document.documentElement.setAttribute("data-theme", nextTheme);
            localStorage.setItem("theme", nextTheme);
            setTheme(nextTheme);
    };

    const navLinks = <>
        <li><Link to="/"className={`relative hover:text-orange-700 text-btn-login ${realPath === "/" ? "after:block after:absolute after:bottom-0 after:left-0 font-bold after:w-full after:h-0.5 after:bg-accent" : ""}`}>Home</Link></li>
        <li><Link to="/explore" className={`relative hover:text-orange-700 text-btn-login ${realPath === "/explore" ? "after:block after:absolute after:bottom-0 after:left-0 font-bold after:w-full after:h-0.5 after:bg-accent" : ""}`}>Explore</Link></li>
        {
            user && 
            <>
                    <li><Link to="/add-work" className={`relative hover:text-orange-700 text-btn-login ${realPath === "/add-work" ? "after:block after:absolute after:bottom-0 after:left-0 font-bold after:w-full after:h-0.5 after:bg-accent" : ""}`}>Add Art</Link></li>
                    <li><Link to="/gallery" className={`relative hover:text-orange-700 text-btn-login ${realPath === "/gallery" ? "after:block after:absolute after:bottom-0 after:left-0 font-bold after:w-full after:h-0.5 after:bg-accent" : ""}`}>Gallery</Link></li>
                    <li><Link to="/favorites" className={`relative hover:text-orange-700 text-btn-login ${realPath === "/favorites" ? "after:block after:absolute after:bottom-0 after:left-0 font-bold after:w-full after:h-0.5 after:bg-accent" : ""}`}>Favorites</Link></li>
            </>
        }
    </>

    const MobileMenu = <>
        <section className='z-40 absolute top-0 -left-4 rounded-b-2xl max-w-80 w-full h-100 bg-base-200/90 py-0 px-5 transform transition-transform duration-300 ease-in-out'>
            <div className="flex-none lg:hidden absolute">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <section className='relative left-70 top-2 flex bg-base-200 rounded-full'>
                    <XIcon className='text-right' onClick={() => {
                        setIsMobileActualMenu(!mobileActualMenu);
                    }}></XIcon>
                </section>
                <section onClick={() => {
                    setIsMobileActualMenu(!mobileActualMenu);
                }} className='relative flex flex-col justify-start items-start top-43 text-justify text-xl list-none left-6 h-auto w-400'>
                    {navLinks}
                </section>
                {/* <p>PHT</p> */}
              </label>
            </div>
        </section>
    </>

    return (
        <header className='sticky top-0 z-40 bg-base-100/70'>
            {/* <p>Header</p> */}
            <nav className='bg-transparent h-17 lg:h-20 py-4 px-5 flex justify-around gap-4 items-center border-b-2 backdrop-blur-md shadow-sm transition-colors duration-300'>
                <section className='flex transition-colors justify-between items-center gap-2'>
                    <MenuIcon onClick={() => {
                        setIsMobileActualMenu(!mobileActualMenu);
                    }} className='lg:hidden transition-colors text-accent'></MenuIcon>
                    <Link to={'/'} className='cinzel-font transition-colors font-bold text-2xl text-accent flex justify-center items-center gap-1'> <Palette className='text-[#CA8A04] transition-colors'></Palette> ARTIFY</Link>
                </section>
                {
                    mobileActualMenu && MobileMenu
                }
                <section className='geom-font hidden lg:block'>
                    <ul className='flex justify-around items-center gap-4'>
                        {navLinks}
                        {
                            realPath === "/login" && 
                            <> <p className={`relative hover:text-orange-700 text-btn-login after:block after:absolute after:bottom-0 after:left-0 font-bold after:w-full after:h-0.5 after:bg-accent`}>Login</p>
                            </>
                        }
                        {
                            realPath === "/register" && 
                            <> <p className={`relative hover:text-orange-700 text-btn-login after:block after:absolute after:bottom-0 after:left-0 font-bold after:w-full after:h-0.5 after:bg-accent`}>Register</p>
                            </>
                        }
                    </ul>
                </section>
                <div className="flex justify-around items-center gap-3 geom-font">
                    <button onClick={toggleTheme} className="rounded-full text-accent hover:bg-gray-100 transition-colors p-2"
                    > 
                    {
                        theme === 'light' ? <Moon size={20} /> : <Sun size={20} />
                    }
                    </button>
                    {
                        !user && <> 
                        {
                            realPath !== "/login" && <><Link to="/login" className="px-3 text-btn-login hover:text-gold-600 cinzel-font font-medium transition-colors">Login</Link></>
                        }
                        {
                            realPath !== "/register"  && <><Link to="/register" className="px-5 py-2 text-white rounded-full cinzel-font font-medium transition-all bg-accent shadow-[inset_0_0_4px_rgba(0,0,0,0.3)] hover:shadow-yellow-500/30">Register</Link></>
                        }                          
                        </>
                    }
                    {
                        user && <div className='relative group flex top-0 flex-col justify-start items-start'>
                        <section className='cursor-pointer'>
                            <img onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }} src={user.photoURL ? `${user.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaCPHZvXA8tqyRHDSn5E1ZuxW-h5ocCJcMQ&s"} alt={"Profile"} className='w-10 h-10 rounded-full' />
                        </section>
                        <section className={`invisible group-hover:visible ${isMobileMenuOpen ? "visible" : ""} transition-all`}>
                            <section className='absolute top-13 lg:top-14.5 bg-base-300 shadow-lg rounded-b-2xl p-3 border-2 z-40 flex flex-col gap-2 right-0.5 lg:right-3'>
                              <div className='flex items-center gap-2 border-b pb-2 mb-2'>
                                <div className='flex flex-col'>
                                  <p className='font-medium'>{user.displayName || "User"}</p>
                                  <p className='text-sm text-gray-500'>{user.email}</p>
                                </div>
                              </div>
                              <button onClick={() => { 
                                    SignOut();
                                    loggedNotice();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="px-3 py-2 rounded hover:bg-red-200 text-red-600 transition-colors text-left">Logout</button>
                            </section>
                        </section>
                        </div>
                    }
              </div>
              {/* <p>hi</p> */}
            </nav>
            {/* <p></p> */}
            <ToastContainer />
        </header>
    );
};

export default Header;

