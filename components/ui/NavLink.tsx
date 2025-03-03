'use client';

import React from 'react';
import { NavLinkProps } from '../../types/ui';

const NavLink: React.FC<NavLinkProps> = ({ children, active, onClick }) => (
  <a 
    href="#"
    onClick={onClick}
    className={`px-1 py-2 border-b-2 font-medium ${
      active 
        ? 'border-blue-400 text-blue-400' 
        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
    } transition-colors duration-200`}
  >
    {children}
  </a>
);

export default NavLink;