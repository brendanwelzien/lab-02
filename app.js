'use strict';


let animalArray = [];

// template for holding content
function Animal(animal) {
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;
    animalArray.push(this);
}

// create a copy of the animal

Animal.prototype.render = function () {
    let $animalClone = $('.photo').clone();


    // apply information to elements
    $animalClone.find('h2').text(this.title);
    $animalClone.find('img').attr('src', this.image_url);
    $animalClone.find('p').text(this.description);
    $animalClone.removeClass('photo');
    $animalClone.attr('class', this.title);
    $('main').append($animalClone);
    console.log($animalClone);
}

// grab/update content of dog info from json package

Animal.readJson = () => {
    const ajaxFrame = {
        method: 'get',
        dataType: 'json'
    }
    $.ajax('page-1.json', ajaxFrame)
        .then(info => {
            info.forEach(item => {
                let animal = new Animal(item);
                console.log('dog obj', animal);
                animal.render();
            })
            $('.photo').hide();
        })
}
$(() => Animal.readJson());

// create select element and add titles for unique images
$('select').on('change', function () {
    let $currentAnimal = $(this).val();
    $('section').hide();
    $(`.${$currentAnimal}`).show();
    console.log($currentAnimal);
});
