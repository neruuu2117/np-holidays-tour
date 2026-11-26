# NP HOLIDAYS TOUR

A responsive, static travel-agency website built with HTML, CSS, and vanilla JavaScript. Open `index.html` in a browser to preview it, or publish the repository with GitHub Pages.

## Set up business contact details

Edit `NP_HOLIDAYS_CONFIG` at the top of `script.js` before launch:

- `phone`: display phone number (include country code if appropriate).
- `email`: business email address.
- `address`: office address to display.
- `whatsappNumber`: WhatsApp number in international format using digits only, without `+`, spaces, or punctuation.
- `mapsQuery`: verified address or place name used to build the Google Maps directions link.
- `social`: URLs for the official Instagram, Facebook, and YouTube profiles.

Leave details blank until they are verified. The contact section will show editable placeholders, and the booking form still prepares a complete enquiry that visitors can copy. When a WhatsApp number is configured, submitting the form opens a prefilled WhatsApp message; the visitor reviews and sends it themselves.

Sample tour prices are illustrative and can be edited in `index.html`. Replace them with confirmed prices and package inclusions before publishing.