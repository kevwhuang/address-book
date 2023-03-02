let state = true;
let users;

const display = () => {
    const main = document.querySelector('main');

    main.innerHTML = null;

    users.forEach(e => {
        main.innerHTML += `
            <section>
            <article>
            <p>${e.name.first} ${e.name.last}</p>
            <img src="${e.picture.large}" width="150" height="150"></img>
            </article>
            <div>
            <p>Age: ${e.dob.age}</p>
            <p>Location: ${e.location.city}, ${e.nat}</p>
            <p>Phone: ${e.cell}</p>
            <p>Email: ${e.email}</p>
            </div>
            </section>`;
    });

    main.innerHTML += `<div style="height:5px;"></div>`;
};

const retrieve = () => {
    fetch(`https://randomuser.me/api/` +
        `?results=100&inc=dob,cell,email,location,name,nat,picture&nat=au,us,fr,gb`)
        .then(res => res.json())
        .then(data => users = data.results)
        .then(() => users.sort((a, b) => a.name.last > b.name.last ? 1 : -1))
        .then(() => display());
};

const toggle = () => {
    for (const $ of document.querySelectorAll('div')) {
        state ? $.style.display = 'none' : $.style.display = 'block';
    }

    state = !state;
};

document.querySelectorAll('button')[0].onclick = () => retrieve();
document.querySelectorAll('button')[1].onclick = () => toggle();
onload = () => retrieve();
