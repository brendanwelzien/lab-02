'use strict';

let animalArray = [];

// template for holding content
function Animal(animal, page) {
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;
    this.page = page;
    animalArray.push(this);
}



// create a copy of the animal
Animal.prototype.render = function () {
    let $animalClone = $('#animal-template').clone();

    // apply information to elements
    //$animalClone.find('h2').text(this.title);
    //$animalClone.find('img').attr('src', this.image_url);
    //$animalClone.find('p').text(this.description);
    let animalLoad = Mustache.render($animalClone.html(), this);
    $('main').append(animalLoad);
    //$animalClone.removeClass('photo');
    //$animalClone.attr('id', this.title);
    //$animalClone.attr('class', this.page);
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
                let page = 1;
                let animal = new Animal(item, page);
                console.log('animal obj', animal);
                animal.render();
            })
        })
            .then(() => $.ajax('page-2.json', ajaxFrame)
            .then(info => {
                info.forEach(item => {
                    console.log('test');
                    let page = 2;
                    let animal = new Animal(item, page);
                    console.log('animal obj', animal);
                    animal.render();
                })}))
             //$('.photo').hide();
        }

$(() => Animal.readJson());

// create select element and add titles for unique images
$('select').on('change', function () {
    let $currentAnimal = $(this).val();
    $('section').hide();
    $(`.${$currentAnimal}`).show();
    console.log($currentAnimal);
});

// buttons
 $('#pageOne').on('click', getFile);
function getFile() {
    $('.2').hide();
    $('.1').show();
    //$.get('page-1.json');
   // animalArray; 
}
$('#pageTwo').on('click', otherFile);
function otherFile () {
    $('.1').hide();
    $('.2').show();
    //$.get('page-2.json');
    //animalArray;
}

