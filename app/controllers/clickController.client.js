'use strict'

// immediately invoked function express (IIFE)

(function () {
    var addButton = document.querySelector('.btn-add')
    var deleteButton = document.querySelector('.btn-delete')
    var clickNbr = document.querySelector('.#click-nbr')
    var apiUrl = 'https://clementine-tutorial-impomales.c9users.io/api/clicks'
    
    function ready(fn) {
        if (typeof fn !== 'function') return 
        if (document.readyState === 'complete') return fn()
        document.addEventListener('DOMContentLoaded', fn, false)
    }
    
    function ajaxRequest(method, url, callback) {
        var xmlhttp = new XMLHttpRequest()
        
        xmlhttp.onreadystatechange = function() {
            // 4 means data retrieval completed.
            // 200 is OK status code.
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) 
                callback(xmlhttp.response)
        }
        
        // async is true.
        xmlhttp.open(method, url, true)
        xmlhttp.send()
    }
    
    function updateClickCount(data) {
        var clicksObject = JSON.parse(data)
        clickNbr.innerHTML = clicksObject.clicks
    }
})()