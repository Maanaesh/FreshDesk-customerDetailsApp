# Cutomer Details App - FreshDesk

## Objective

This project is aimed at creating a simple Freshdesk app. The app will:

1. Display a personalized "Hello, World" message on the contact detail page.
2. Render the user’s Gravatar logo based on their email address.

## App Requirements

- The app will be placed on the **Contact Detail** page's sidebar.
- The message will be personalized with the contact’s name.
- The user’s Gravatar logo will be fetched and displayed based on the email address.

## Methodology

### 1. Create a Project Directory

First, create an empty directory for your app and navigate into it:

```bash
mkdir myFirstFreshApp
cd myFirstFreshApp
```
### 2. Initialize the Freshdesk App using FDK CLI
```
fdk create
```
During the process, you'll be prompted to choose the product and template:

- Product: Freshdesk
- Template: your_first_app

Once the project is created, the structure will look like this:

    .
    ├── README.md                 A file for your future self and developer friends to learn about app
    ├── app                       A folder to place all assets required for frontend components
    │   ├── index.html            A landing page for the user to use the app
    │   ├── scripts               JavaScript to place files frontend components business logic
    │   │   └── app.js
    │   └── styles                A folder to place all the styles for app
    │       ├── images
    │       │   └── icon.svg
    │       └── style.css
    ├── config                    A folder to place all the configuration files
    │   └── iparams.json
    └── manifest.json             A JSON file holding meta data for app to run on platform

### 3. Modify `manifest.json`
```
"location": {
    "contact_sidebar": { 
      "url": "index.html",
      "icon": "styles/images/icon.svg"
    }
}
```
### 4. Update index.html
- Add the required CDN for CryptoJS in the index.html file so that we can hash the contact's email for Gravatar:
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

```
### 5. Fetch and Render Contact Data
- In the app.js file, fetch the contact details using the Freshdesk client and destructure the necessary data like email and name:
  ```
  const contactData = await client.data.get('contact');
  const { contact: { email, name } } = contactData;
  ```
### 6. Hash the Email Address
```
const getHash = async (email) => {
  const finalEmail = email.trim().toLowerCase();
  const hash = CryptoJS.SHA256(finalEmail).toString();
  return hash;
};
```
### 7. Get Gravatar URL
```
const getImgUrl = async (email) => {
  const hash = await getHash(email);  // Await the hash
  const size = 100;
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};
```
### 8. Update the HTML DOM
```
const greetingElement = document.getElementById('welcome-txt');
greetingElement.innerText = `Hello, ${name}`;
```
### 9. Start the App
- To start the app locally for testing, use the FDK CLI:
```
fdk run
```
- append `?dev=true` to the Freshdesk URL in your browser to load the app in development mode and see your changes

## Deployment

### Zip and Upload the App
- this will create a `.zip` file in a directory called `/dist`
```
fdk validate
fdk pack
```
- Go to the Freshdesk admin panel.
- Navigate to Apps > Manage Apps > Upload Custom App.
- Upload the zipped file.
For more info [FreshDesk Docs](https://developers.freshworks.com/docs/app-sdk/v2.3/freshdesk/app-submission-process/custom-apps/)

## Screenshots
<img width="240" alt="image" src="https://github.com/user-attachments/assets/8216fb70-2c99-4340-8e6a-1b6b3dd21ba5">

