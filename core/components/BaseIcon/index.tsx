'use client';

import React from 'react';
import classes from './index.module.scss';
import HTMLReactParser from 'html-react-parser';

interface BaseIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  svg?: string;
}
export default function BaseIcon({ svg, ...props }: BaseIconProps) {
  return (
    <span {...props} className={classes.root}>
      {HTMLReactParser(svg ?? '')}
    </span>
  );
}
