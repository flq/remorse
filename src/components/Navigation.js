import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import GlobalCommands from "./GlobalCommands";

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/typing">Type text</NavLink>
      <NavLink to="/test-writing-morse">Test your writing skills</NavLink>
      <NavLink to="/test-reading-morse">Test your reading skills</NavLink>
      <GlobalCommands />
    </nav>
  );
}