# `@strv/react-sliders`

![CI](https://github.com/xhudec/react-sliders/workflows/CI/badge.svg)
![Dependabot](https://flat.badgen.net/dependabot/xhudec/react-sliders?icon=dependabot)
[![Mergify Status][mergify-status]][mergify]
[![management: perfekt👌](https://img.shields.io/badge/management-perfekt👌-red.svg?style=flat-square)](https://github.com/lekterable/perfekt)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/xhudec/react-sliders&style=flat

This project was bootstrapped with [`TSDX`](https://github.com/formik/tsdx).

## Goals

- [x] Customizable & CSS agnostic
  - **Modules**
    - `useRangeSlider`, `useSlider` (Hooks, which encapsulates the core logic and let consumers style their own sliders as they wish)
  - **Headless** (Inspiration [`react-table`](https://github.com/tannerlinsley/react-table), [`downshift-js`](https://github.com/downshift-js/downshift)) -[x] A11y
  - Full mouse & touch support
  - [Keyboard support](https://www.w3.org/TR/wai-aria-practices/examples/slider/slider-1.html)
- [x] API that is easy to use & integrate
  - with forms, ...
- [x] Tree-shakeable & Optimized bundle
  - should be already configured by [`TSDX`](https://github.com/formik/tsdx).
- [ ] Properly tested
- [ ] Well documented API with interactive examples on [CodeSandbox](https://codesandbox.io/)
- [x] Fully typed with TypeScript
- [x] Based on our already existing tools
  - [`code-quality-tools`](https://github.com/strvcom/code-quality-tools)
  - [`perfekt`](https://github.com/lekterable/perfekt)
