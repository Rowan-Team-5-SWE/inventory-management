import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyBW-WVHkVejTTXC7DeL_l2iUMM7tRiAVwI',
    authDomain: 'inventory-management-9b7eb.firebaseapp.com',
    databaseURL: 'https://inventory-management-9b7eb.firebaseio.com',
    projectId: 'inventory-management-9b7eb',
    storageBucket: 'inventory-management-9b7eb.appspot.com',
    messagingSenderId: '1041200270554',
    appId: '1:1041200270554:web:cc9ca6e7cc30c4202aa9e3',
    measurementId: 'G-TBNX27SFKH',
}

// fix for hotreloads
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const Firebase = firebase
