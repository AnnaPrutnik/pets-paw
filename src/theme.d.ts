import React from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    bgColor: React.CSSProperties['color'];
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
    bgColor: React.CSSProperties['color'];
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
}
