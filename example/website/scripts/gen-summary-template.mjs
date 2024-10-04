import { upcaseLetter } from "./utils.mjs";

export const summaryTemplate = (pages) => {
  const page = "summary";

  const groupedPages = Array.from(pages).reduce((acc, page) => {
    if (!acc[page.demo.pageKind]) acc[page.demo.pageKind] = [];
    acc[page.demo.pageKind].push(page);
    return acc;
  }, {});

  return `
---
id: ${page}
title: ${upcaseLetter(page)}
sidebar_label: ${upcaseLetter(page)}
description: ${upcaseLetter(page)} animation
keywords:
  - ${page}
  - carousel animation
  - carousel animation ${page}
  - react-native-reanimated-carousel
  - reanimated-carousel
  - reanimated carousel
  - react-native
  - snap-carousel
  - react native
  - snap carousel
  - ios
  - android
  - carousel
  - snap
  - reanimated
image:
slug: /examples/${page}
---

{/* 

=========================================================================
=========================================================================
This page generated by /scripts/gen-pages.mjs, Don't update it manually 
=========================================================================
=========================================================================

*/}

import { Cards } from 'nextra/components'
import Link from 'next/link'

${Object.keys(groupedPages)
  .sort((a, b) => {
    const kindsSort = ["basic-layouts", "utils", "custom-animations"];
    return kindsSort.indexOf(a) - kindsSort.indexOf(b);
  })
  .map((kind) => {
    const pages = groupedPages[kind].filter(
      (page) => !!page.preview.isExist && !!page.demo.isExist,
    );

    if (pages.length === 0) return "";

    return `
### ${upcaseLetter(kind)}

<Cards num={2}>
  ${pages
    .map((page) => {
      const { pageKind, pageName } = page.demo;
      return `
        <Link href="/Examples/${pageKind}/${pageName}">
          <div className='summary-item'>
            <div className='image-container'>![${pageKind}-${pageName}](../../../app/app/demos/${pageKind}/${pageName}/preview.png)</div>
            <div className='label-container'>
              ${upcaseLetter(pageName)}
            </div>
          </div>
        </Link>
  `;
    })
    .join("\n")}
</Cards>
  `;
  })
  .join("")}

`;
};
