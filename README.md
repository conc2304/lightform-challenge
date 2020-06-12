# lightform-challenge

## Instructions

- Navigate to [repo] https://github.com/conc2304/lightform-challenge **NOTE** repo is private and requires invited access
- Clone locally `git clone git@github.com:conc2304/lightform-challenge.git`
- Project setup: `npm install`
- Compiles and hot-reloads for development `npm run serve`
- Compiles and minifies for production `npm run build`
- Run your unit tests `npm run test:unit`
- Run your end-to-end tests `npm run test:e2e`
- Lints and fixes files `npm run lint`
- Customize configuration See [Configuration Reference](https://cli.vuejs.org/config/).

## Discussion

Technologies used: Pug, SCSS, Vue (with Typescript and Class-Style Components), Vue CLI, Mocha (with Chai assertions), Cypress, Babel, and Webpack

I used [Vue CLI](https://cli.vuejs.org/) to generate the scaffolding for this app.

Dependencies Added:

- [Vuex](https://vuex.vuejs.org/guide/) (State management pattern + library for Vue.js)
- [Vuetify](https://vuetifyjs.com/en/) (Material UI Components)
- [Axios](https://www.npmjs.com/package/axios) (Promise based HTTP client for browsers)
- [Vuelidate](https://vuelidate.js.org/#getting-started) (Model-based validation for Vue.js)
- [Class-Components](https://class-component.vuejs.org/) (Class-style syntax support for Vue components)

## Requirements

- View a list of notes
  - hint: the API is paginated
- Create a note with a title
- Delete notes
- Edit the note title or body

I created a page that loads a set of 5 notes upon landing on the home page. If there is room for more it will load more until the space is filled. If not it will lazy load them on scroll.

## Bonuses!

- Work on desktop, tablet, and mobile

Using flexbox, the notes wrap around as the screen resizes.

- Be hyperlinkable (users can bookmark specific tasks or pages)
- Be navigable with the window history (back and forward button)

Using Vue' History Mode in the router, pages are linkable and you can load each individual note's page. If a page is not found, the app will ask the user to go back home to their notebook.

- Has infinite scrolling

On scroll the app will continue to call for 5 more notes to display until there are no more, at which point the user is made aware that they have reached the end of their stack. A new note can be saved and get added to the list of notes. An existing note can be updated and deleted.

- Uses the Lightform brand colors

Using a globally loaded SCSS variables and mixins file, all brand colors and fonts are kept in one accessible place for all components to access them from. In order to make these colors accessible to Vuetify's components, a theme with registered color variables are made accessible as properties of the components.
