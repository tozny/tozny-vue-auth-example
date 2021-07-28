# Vue.js App with TozId Authentication

This example shows how to create a Vue.js application that uses Tozny's SDK to authenticate and enable end to end encryption in your application. This is an example application and should not used as is for production purposes.

Please read [the full guide](https://developers.tozny.com/tozid/guides/vue-with-tozid) to get a step by step walkthrough of how this application works.

**Prerequisites:** [Node.js](https://nodejs.org/).

> [Tozny](https://dashboard.tozny.com/) 

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/tozny/tozny-vue-auth-example.git
cd tozny-vue-auth-example
npm install
npm run serve
```

### Create a realm and app in Tozny

You'll need to create a realm and an application in your Tozny dashboard prior to running this application.  Creating your account is 
free - [head over here to register](https://dashboard.tozny.com).  Once you do that navigate to tozId and create a realm.  Once in the realm 
you need to create your application and grab its client id.

Be sure to specify * as the allowed origins.

Create a .env.local in your root project directory and set these values with your Tozny specific entries:

```javascript
VUE_APP_REALM_NAME=
VUE_APP_APP_NAME=
VUE_APP_BROKER_URL=
VUE_APP_REGISTRATION_TOKEN=
```

## Links

This example uses the following libraries provided by Tozny:

* [Tozny SDK](https://github.com/tozny/browser-sodium-sdk)

## Help

Email us at support@tozny.com

## License

Apache 2.0, see [LICENSE](LICENSE).
