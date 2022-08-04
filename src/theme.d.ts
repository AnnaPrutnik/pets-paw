import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    bgColor: {
      light: React.CSSProperties['color'];
      dark: React.CSSProperties['color'];
    };
    cards: {
      voting: React.CSSProperties['color'];
      breeds: React.CSSProperties['color'];
      gallery: React.CSSProperties['color'];
    };
    voting: {
      default: {
        likes: React.CSSProperties['color'];
        favorites: React.CSSProperties['color'];
        dislikes: React.CSSProperties['color'];
      };
      hover: {
        likes: React.CSSProperties['color'];
        favorites: React.CSSProperties['color'];
        dislikes: React.CSSProperties['color'];
      };
    };
  }

  interface ThemeOptions {
    bgColor: {
      light: React.CSSProperties['color'];
      dark: React.CSSProperties['color'];
    };
    cards: {
      voting: React.CSSProperties['color'];
      breeds: React.CSSProperties['color'];
      gallery: React.CSSProperties['color'];
    };
    voting: {
      default: {
        likes: React.CSSProperties['color'];
        favorites: React.CSSProperties['color'];
        dislikes: React.CSSProperties['color'];
      };
      hover: {
        likes: React.CSSProperties['color'];
        favorites: React.CSSProperties['color'];
        dislikes: React.CSSProperties['color'];
      };
    };
  }

  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mini: true;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}
