# `react-sliders`

![CI](https://github.com/xhudec/react-sliders/workflows/CI/badge.svg)
![Dependabot](https://flat.badgen.net/dependabot/xhudec/react-sliders?icon=dependabot)
[![Mergify Status][mergify-status]][mergify]

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/xhudec/react-sliders&style=flat

This project was bootstrapped with [`TSDX`](https://github.com/formik/tsdx).

## Goals

1. Customizable & CSS agnostic
   - **Modules**
     - `RangeSlider`, `Slider` (Ready to use, pre-styled components)
     - `useRangeSlider`, `useSlider` (Hooks, which encapsulates the core logic and let consumers style their own sliders as they wish)
   - **Headless** (Inspiration [`react-table`](https://github.com/tannerlinsley/react-table), [`downshift-js`](https://github.com/downshift-js/downshift))
2. A11y
   - Full mouse & touch support
   - Keyboard support
3. API that is easy to use & integrate
   - with forms, ...
4. Tree-shakeable & Optimized bundle
   - should be already configured by [`TSDX`](https://github.com/formik/tsdx).
5. Properly tested
6. Well documented API with interactive examples on [CodeSandbox](https://codesandbox.io/)
7. Fully typed with TypeScript
8. Based on our already existing tools
   - [`code-quality-tools`](https://github.com/strvcom/code-quality-tools)
   - [`perfekt`](https://github.com/lekterable/perfekt)
