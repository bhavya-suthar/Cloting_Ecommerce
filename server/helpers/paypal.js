const paypal = require("paypal-rest-sdk")

paypal.configure({
    mode: 'sandbox',
    client_id: 'ARDq2UyiIlpxFjYHOv1F9TPUhZ4nCy8Ut_FkuflzOyhS75AoKNct3et7CURXJCrAoA1QFO73N_2LsZqr',
    client_secret: 'ED9-FZU4HZhuabNGcPKOkVBb5jhQIwdsfmDMQu7xIbgXiD3oDfCct3XJr7mhLISQclNgtaeZEBQCtcnH'
})

module.exports = paypal