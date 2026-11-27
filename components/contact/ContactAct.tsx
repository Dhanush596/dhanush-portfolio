'use client';

import React from 'react';
import { ContactBlock } from './ContactBlock';
import { MegaFooter } from './MegaFooter';

export function ContactAct() {
  return (
    <section id="contact" className="relative w-full pt-20 transition-colors duration-700">
      {/* 5.1 Contact & Messaging Block */}
      <ContactBlock />

      {/* 5.2 Mega Footer */}
      <MegaFooter />
    </section>
  );
}
