let myinput = document.getElementById('input')
let localstrname = 'leadX'
const save_btn = document.getElementById('save_btn');
const save_tab = document.getElementById('save_tab')
const clear_btn = document.getElementById('clear_btn');
const ulEl = document.getElementById('ulEl')

const tabs = [
    {url: 'https://www.linkedin1.com/mia'}
]

let myleads = []

if(JSON.parse(localStorage.getItem(localstrname)) != null){
    myleads = JSON.parse(localStorage.getItem(localstrname))
}

if(myleads.length > 0){
    render(myleads) 
}

function render (leads) {
    for (i = 0; i < leads.length; i++){

        // ulEl.innerHTML += "<li>" + "<a href=" + "'" + leads[i] + "'" + " target=" + "'_blank'>" + leads[i] + "</a>" + "</li>"

        // const li = document.createElement('li')
        // li.innerHTML = "<a>" + leads[i] + "</a>"
        // ulEl.append(li)

        ulEl.innerHTML += ` <li><a class='leadx_links' href='${leads[i]}' target='_blank'>${leads[i]}</a></li>
        `
    }
}

save_btn.addEventListener('click', function save () {
    if(!myinput.value == ''){
        myleads.push(myinput.value)
        ulEl.textContent = ''
        render(myleads)
        myinput.value = ''
        localStorage.setItem(localstrname, JSON.stringify(myleads))
    }    
});

clear_btn.addEventListener('dblclick', function clear () {
    localStorage.clear();
    myleads = []
    ulEl.textContent = ''
});

save_tab.addEventListener('click', () => {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        myleads.push(tabs[0].url)
        ulEl.textContent = ''
        render(myleads)
        localStorage.setItem(localstrname, JSON.stringify(myleads))
    })
})

