// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // BASE_URL: 'http://localhost:3000/api',
 BASE_URL: 'https://eshop.tsilingeridis.eu/api',
  PAGE_SIZE_OPTIONS: [6, 12, 18, 24, 30],
  TOTAL_PRODUCTS: 0,
  PRODUCTS_PER_PAGE: 6,
  CURRENT_PAGE: 1,
  COLOR_LIST: [
    { text: 'red' },
    { text: 'blue' },
    { text: 'green' },
    { text: 'white' },
    { text: 'beige' },
    { text: 'brown' },
    { text: 'yellow' },
    { text: 'pink' },
    { text: 'mocha' },
    { text: 'purple' },
    { text: 'orange' },
  ],

  HEEL_LIST: [
    { text: 'low (3-5CM)' },
    { text: 'medium (6-9CM)' },
    { text: 'high (10-12CM)' },
  ],

  SIZE_LIST: [
    { text: '36' },
    { text: '37' },
    { text: '38' },
    { text: '39' },
    { text: '40' },
  ],

  SALES_LIST: [
    { text: 'up to 10' },
    { text: '10 - 20' },
    { text: '20 - 30' },
    { text: '30 - 40' },
    { text: '50 - 60' },
    { text: '70 - 80' },
    { text: '80 and above' },
  ],

  MATERIAL_LIST: [
    { text: 'synthetic leather' },
    { text: 'synthetic suede' },
    { text: 'textile' },
    { text: 'pony skin' },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
