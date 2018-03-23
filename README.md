---
nav: name of api endpoint
---

# Sardius React Boilerplate

## Folder Structure
- config ?
- docs - contains all markdown files for external documentation
- src
 - app - A main route component. Contains all files for main app
 - authentication - A main route component. Contains all files for authentication
 - common - Contains any files that will need to be used in multiple different places (components, apis, styles)
 - errorCodes - folder that contains all of error pages
 - client.js - The entry point file that initializes react
 - store.js - Initializes the redux store for react

## Component folder Structure
Every component should be inside of it's own folder, with an index.js file. If needed, a logic.js file should be included as well to handle anything to deal with props, actions, redux, sagas, or selectors. The only other file a component should include is style.scss.

A component should have everything it needs contained in its own folder. So if that component has child routes, it should have each child component in their own folder. That child component will follow the same rules as above. Nothing else should exist in the component folder. If there are non-route components that are used, even if only once by the route, put it in src/common/components/ and make sure it works as a black box (can be re-used somewhere if ever needed).
