import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import logo from '../y-combinator.svg';

// Best way to insert emoji in react
const Emoji = ({ label, symbol }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);

export const NavBar = () => {
  return (
    <header className="bg-primary-200 font-mono h-12 px-40 flex justify-start items-center ">
      <Link to="/">
        <img className="w-8 cursor-pointer border-white" src={logo} alt="logo" />
      </Link>
      <ul className="flex space-x-4 px-5 cursor-pointer">
        <NavLink
          activeStyle={{
            fontWeight: '500',
            color: 'white',
          }}
          to="/top"
        >
          <li>Top</li>{' '}
        </NavLink>
        <span>|</span>
        <NavLink
          activeStyle={{
            fontWeight: '500',
            color: 'white',
          }}
          to="/newest"
        >
          <li>new</li>{' '}
        </NavLink>
        <span>|</span>
        <NavLink
          activeStyle={{
            fontWeight: '500',
            color: 'white',
          }}
          to="/ask"
        >
          <li>ask</li>
        </NavLink>
        <span>|</span>
        <NavLink
          activeStyle={{
            fontWeight: '500',
            color: 'white',
          }}
          to="/show"
        >
          <li>show</li>
        </NavLink>
        <span>|</span>
        <NavLink
          activeStyle={{
            fontWeight: '500',
            color: 'white',
          }}
          to="/jobs"
        >
          <li>jobs</li>
        </NavLink>
      </ul>
      <span className="text-white text-sm pl-96">
        <a href="https://github.com/KarthikNayak024">
          Made with <Emoji symbol="❤️" /> by <strong>Karthik Nayak</strong>
        </a>
      </span>
    </header>
  );
};

NavBar.propTypes = {
  symbol: PropTypes.any,
  label: PropTypes.any,
};
