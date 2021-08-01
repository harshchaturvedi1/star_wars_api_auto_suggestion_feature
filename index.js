let timerId;
let insert_div = document.getElementById('feedPart');
let Afterfeed = document.getElementById('Afterfeed')
let id = 100;

let query1 = document.getElementById('input').value;
if (query1.length == 0) {
    Afterfeed.style.display = 'none';
    insert_div.innerHTML = null;
}


// called on each key stroke
const getData = () => {
    insert_div.innerHTML = null;
    Afterfeed.style.display = 'none';
    // showing anmation on typing

    let firstImage = document.getElementById('firstImage') //gif
    firstImage.style.display = 'block'
    let secondImge = document.getElementById('secondImge') //image
    secondImge.style.display = 'none'
    let beforeFeed = document.getElementById('beforeFeed')
    beforeFeed.style.display = 'block';

    if (timerId)
        clearTimeout(timerId)

    timerId = setTimeout(() => {
        main();
    }, 400)
}


async function callApi() {
    let query = document.getElementById('input').value;
    let res = await fetch(`https://swapi.dev/api/people/?search=${query}`);
    let data = await res.json();
    return data;
}

const appendEach = ({ name, birth_year, gender }) => {
    // console.log(name, birth_year, gender)

    let div_1 = document.createElement('div');
    div_1.setAttribute('class', 'eachfeed');
    div_1.setAttribute('id', id++);
    div_1.addEventListener('click', (event) => {
        let Ele_id = event.path[2].id;
        if (Ele_id == 'feedPart')
            Ele_id = event.path[1].id;
        localStorage.setItem('searchId', Ele_id)
        window.location.href = 'showDetails.html'
    })

    let div_1_1 = document.createElement('div');
    div_1_1.setAttribute('class', 'partone');

    let div_1_1_1 = document.createElement('div');
    div_1_1_1.setAttribute('class', 'name');
    div_1_1_1.innerHTML = name;

    let div_1_1_2 = document.createElement('div');
    div_1_1_2.setAttribute('class', 'birth');
    div_1_1_2.innerHTML = birth_year;


    let div_1_2 = document.createElement('div');
    div_1_2.setAttribute('class', 'gender');
    div_1_2.innerHTML = gender;

    div_1_1.append(div_1_1_1, div_1_1_2);
    div_1.append(div_1_1, div_1_2);
    insert_div.append(div_1);
}

// clearing animation and sshwing searched data
async function main() {



    let data = await callApi();
    let { results } = data;

    // search image
    let secondImge = document.getElementById('secondImge')
    secondImge.style.display = 'block'
    //clooecting div
    let beforeFeed = document.getElementById('beforeFeed')
    beforeFeed.style.display = 'none';
    // searching gif
    let firstImage = document.getElementById('firstImage')
    firstImage.style.display = 'none'
    if (results.length == 0) {
        let Afterfeed = document.getElementById('Afterfeed')
        Afterfeed.style.display = 'block';
    }
    else {

        for (let i = 0; i < results.length; i++) {
            results[i]['id'] = id;
            appendEach(results[i]);
        }

        localStorage.setItem('searchfeed', JSON.stringify(results));
    }
}
