# STUDS: Building a Design System People Actually Wanted to Use

## Overview

When most people hear the term *design system*, they think of component libraries, style guides, design tokens, or documentation.

STUDS certainly included all of those things. But that isn't why it existed.

At its core, **STUDS was an effort to help a seventy-year-old company present a more consistent experience across dozens of independent software applications**. It became a shared language between designers and developers, a foundation for accessibility, and ultimately an exercise in organizational change as much as front-end architecture.

**My role was to help bridge the gap between design and engineering by translating design decisions into practical implementation while ensuring the system remained flexible enough for teams with very different technologies and workflows.**

---

## The Challenge

Simpson Strong-Tie is known worldwide for manufacturing structural connectors, fasteners, anchors, and building products. Over decades, the company also developed a broad portfolio of software used by architects, structural engineers, contractors, builders, and homeowners.

Like many mature organizations, those applications evolved independently. Different products were built by different teams, different technologies were adopted over time. Some applications were native desktop software, others were built using C#, React, Angular, or other web technologies.

Each solved its own business problem well, but collectively **they looked and felt like software from different companies.**

At the same time, expectations around software were changing. Users no longer expected applications to exist only on desktop Windows computers. Tablets were becoming common on construction sites, and responsive web applications were increasingly replacing traditional desktop software.

The company recognized that modernizing individual products wasn't enough. The experience itself needed to become more consistent.

---

## Building a Shared Language

One of the first realizations while creating STUDS was that **consistency doesn't begin with components, it begins with conversation.**

Before writing a single component, designers, developers, and stakeholders spent considerable time agreeing on how software should look, behave, and communicate: typography, spacing, corner radius, color, interaction patterns, accessibility, and responsive behavior.

**Those conversations became the real foundation of the design system.**

Instead of treating design and development as separate disciplines, STUDS intentionally created a common vocabulary between them.

Design tokens inside Figma matched the CSS variables and design tokens used by developers. When a designer specified a color or spacing value, developers could immediately recognize the corresponding implementation without translating between different naming systems.

That shared language reduced ambiguity, improved communication, and made implementation significantly more predictable.

### Simplicity Takes Work

One of the earliest discussions centered around color. Initially, the design system included multiple primary color palettes, each representing a family of related applications. Applications intended for architects used one visual identity. Software designed for structural engineers used another. Consumer-facing applications for builders and homeowners introduced additional palettes. The intention was to help users recognize which family of applications they were working with.

The idea was thoughtful, but over time we questioned whether those distinctions actually helped users accomplish their work. For many people, **the color differences didn't communicate meaningful information**. Instead, they introduced another visual system that users first had to learn before it became useful.

As the design system matured, we simplified the palette and centered it around the company's primary brand colors.

That wasn't simply a branding decision, it was a usability decision. Like many aspects of STUDS, the goal wasn't to add more visual language, it was to **remove unnecessary complexity**.

### Designing for Behavior

Another important discussion centered around responsive design. Many design tools naturally encourage designers to think in terms of desktop, tablet, and mobile layouts.

My experience had taught me to approach responsive design differently.

Rather than asking how a page should change at specific breakpoints, I preferred asking how each individual component should behave as available space changed. At the time, technologies like CSS Container Queries didn't yet exist as a browser baseline, making that vision difficult to implement directly.

Even so, the conversation shifted. Instead of designing pages, **we designed behaviors**. This way of thinking influenced many later decisions within STUDS and eventually became one of the ideas that shaped my own front-end methodology.

---

## One Design System, Multiple Paths

One of the assumptions we made early in the project was that developers would consume STUDS through CSS. That seemed natural to me because CSS has always been one of my strongest technical disciplines.

What surprised me was discovering how many application developers rarely wanted to write CSS directly. Many preferred working entirely through framework components, while others were already heavily invested in Telerik's component library.

Rather than asking every team to change how they worked, **we adapted the design system to fit their existing workflows**.

Teams comfortable writing CSS could simply include the standalone STUDS stylesheet, gaining access to shared colors, typography, spacing, tokens, themes, and component styling.

Teams building applications with supported frameworks could instead use component libraries that embedded STUDS automatically, allowing them to build interfaces without writing CSS themselves.

Finally, for teams already committed to Telerik, I translated the design language into a Telerik theme that could be integrated directly into their existing applications.

The underlying design language remained identical, only the implementation changed. That became one of the most important lessons from the project.

> **Consistency should be the goal. Implementation can take many paths.**

The success of a design system isn't measured by whether everyone writes code the same way, it's measured by whether users experience software that feels coherent, regardless of how it was built.

---

## Accessibility as a Foundation

Accessibility was never treated as an optional enhancement, it was part of the system from the very beginning.

Instead of restricting designers to a limited set of "accessible colors," STUDS provided accessible alternatives through design tokens, themes, and modern CSS.

**A designer could work naturally** using the design language they needed while **the system automatically supported higher-contrast themes** for users who requested them through their operating system or browser preferences.

The same philosophy extended beyond color.

Spacing, typography, motion preferences, and scalable sizing were all incorporated into the system itself rather than handled as individual exceptions.

The goal wasn't to bolt accessibility onto existing components, it was to **make accessibility part of the architecture.**

---

## Lessons Learned

Looking back, the most valuable part of STUDS wasn't the component library, it wasn't the design tokens, and it wasn't even the documentation. The greatest success was **creating shared understanding**.

Designers and developers began speaking the same language. Implementation decisions became easier because the underlying design decisions had already been discussed. Different teams continued using different technologies, yet **users experienced a more consistent product**.

Perhaps the biggest lesson I took away was that **successful architecture isn't about enforcing one implementation**, but it is about creating shared principles that **allow many implementations to arrive at the same destination**.

STUDS reinforced something I've come to believe throughout my career:

- Technology changes.
- Frameworks change.
- Design trends change.

But reducing unnecessary complexity while helping people work together more effectively… that never goes out of style.







