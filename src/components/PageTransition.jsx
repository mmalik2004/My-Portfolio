/* PageTransition.jsx — orchestrates all page entry animations */
import { useEffect, useState } from 'react';
import AboutTransition     from './transitions/AboutTransition';
import ProjectsTransition  from './transitions/ProjectsTransition';
import ExperienceTransition from './transitions/ExperienceTransition';
import EducationTransition from './transitions/EducationTransition';

const TRANSITION_MAP = {
  '/about':      AboutTransition,
  '/projects':   ProjectsTransition,
  '/experience': ExperienceTransition,
  '/education':  EducationTransition,
};

export default function PageTransition({ path, onDone }) {
  const Component = TRANSITION_MAP[path];
  if (!Component) { useEffect(() => onDone(), []); return null; }
  return <Component onDone={onDone} />;
}