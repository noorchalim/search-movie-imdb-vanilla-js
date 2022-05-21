const tmblCari = document.querySelector('.search-button');
tmblCari.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword');
    const film = await getFilm(inputKeyword.value);
    updateUI(film);
});


//event binding
document.addEventListener('click', async function (e) {
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const detailFilm = await getDetailFilm(imdbid);
        updateUIDetail(detailFilm);
    }
});

function getDetailFilm(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=189f03fe&i=' + imdbid)
        .then(respon => respon.json())
        .then(f => f);
}

function updateUIDetail(f) {
    const detailFilm = tampilDetailFilm(f);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = detailFilm;
}

function getFilm(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=189f03fe&s=' + keyword)
    .then(respon => respon.json())
    .then(respon => respon.Search);
}

function updateUI(film) {
        let kartu = '';
        film.forEach(f => kartu += tampilKartu(f));
        const kontainerFilm = document.querySelector('.kontainer-film');
        kontainerFilm.innerHTML = kartu;
}






function tampilKartu(f) {
    return `<div class="col-md-4 my-3">
    <div class="card">
    <img src="${f.Poster}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${f.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${f.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#detailFilmModal" data-imdbid="${f.imdbID}">Show Details</a>
    </div>
    </div>
</div>
</div>`;
}

function tampilDetailFilm(f) {
    return `<div class="container-fluid">
    <div class="row">
    <div class="col-md-3">
        <img src="${f.Poster}" class="img-fluid">
    </div>
    <div class="col-md">
        <ul class="list-group">
        <li class="list-group-item"><h4>${f.Title} ${f.Year}</h4></li>
        <li class="list-group-item"><strong>Sutradara : </strong>${f.Director}</li>
        <li class="list-group-item"><strong>Pemeran : </strong>${f.Actors}</li>
        <li class="list-group-item"><strong>Penulis : </strong>${f.Writer}</li>
        <li class="list-group-item"><strong>Plot : </strong><br>${f.Plot}</li>
        </ul>
    </div>
    </div>
</div>`;
}