import { BsCart3 } from 'react-icons/bs';
import { KingKlass } from '../svgs/Logo'
import { RxHamburgerMenu } from "react-icons/rx";
import { useCallback } from 'react';
import { useDesignerContext } from '../hooks/useDesignerContext';
import { LiaTimesCircle } from 'react-icons/lia';
import { initAppModals } from '../utility/initialVariables';
import { Link, useLocation } from 'react-router-dom';
import { NavLinks } from '../utility/constants';
import { getInitials } from '../utility/getInitials';
import { MdKeyboardArrowDown } from 'react-icons/md';


export default function Navbar() {
  const username = "Okereke Ugo";
  const { pathname } = useLocation();
  const { toggleNav, setToggleNav, setAppModals } = useDesignerContext() as DesignerContextProps;

  const iconClass = useCallback((type: 'Burger' | 'Cancel') => {
    return `cursor-pointer text-3xl hover:opacity-70 active:opacity-100 transition-opacity flex-none md:hidden`
  }, [])

  const toggleModal = (type: 'open' | 'close') => {
    if (type === 'open') {
      setToggleNav({ modalType: "openNavModal" })
    }
    else {
      setToggleNav({ modalType: "pass" })
    }
    setAppModals(initAppModals);
  }

  return (
    <header className="z-30 bg-white shadow-sm rounded-b-sm w-full md:px-8 px-6 pt-4 pb-2 fixed top-0 flex items-end justify-between">
      {
        toggleNav.modalType === 'openNavModal' ?
          <LiaTimesCircle
            onClick={() => toggleModal('close')}
            className={iconClass('Cancel')}
          />
          :
          <RxHamburgerMenu
            onClick={() => toggleModal('open')}
            className={iconClass('Burger')}
          />
      }
      <Link to={'/'}>
        <KingKlass size={{ width: '65', height: '35' }} />
      </Link>
      <BsCart3
        onClick={() => setToggleNav({ modalType: "carts" })}
        className={`md:hidden ${toggleNav.modalType !== "notifications" ? 'visible' : 'invisible'} cursor-pointer text-3xl hover:opacity-70 active:opacity-100 transition-opacity flex-none`} />

      <div className='hidden md:flex justify-between items-center flex-none w-[55%] text-sm'>
        {
          NavLinks?.map(nav => (
            <Link to={nav.link} key={nav.name}
              className='hover:text-gray-600 flex flex-col items-center font-medium'
            >
              {nav.name}
              <div className={`${pathname === nav.link ? 'scale-[1]' : 'scale-0'} w-1.5 h-1.5 rounded-full bg-red-700`}/>
            </Link>
          ))
        }
      </div>

      <div className="hidden md:flex items-center">
        <p className={`relative after:absolute after:bg-red-700 after:content-[""] after:w-2 after:h-2 after:rounded-full after:right-0.5 after:top-1 font-bold text-xl bg-gray-200 rounded-full w-10 h-10 grid place-content-center`}>{getInitials(username)}</p>
        <MdKeyboardArrowDown className='text-3xl hover:bg-gray-200 transition-colors cursor-pointer rounded-sm p-0.5'/>
      </div>
    </header>
  )
}