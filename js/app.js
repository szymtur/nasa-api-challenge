$(document).ready(function () {

    //NASA API - Astronomy Picture of the Day
    const apodUrl = "https://api.nasa.gov/planetary/apod?start_date=2018-06-10&end_date=2018-06-19&api_key=4OuIkgBXY1vgQKu01D3GkOy2XJYJQt5o7dwLA6di"

    $.ajax({
        url: apodUrl,
        success: function (result) {
            console.log('apod connected');
            
            const randomNumber = Math.floor(Math.random() * (result.length));
            const introFigure = $('.intro').find('#intro-photo');
            let randomBackgroundUrl = result[randomNumber].url;

            if (result[randomNumber].media_type == "video") {
                introFigure.html('<h1>please reload...</h1>');
            } else {
                introFigure.css('background-image', `url('${randomBackgroundUrl}')`);
                introFigure.css('background-position', 'center');
                introFigure.css('background-repeat', 'no-repeat');
                introFigure.css('background-size', 'cover');
            }
        },
        error: function (error) {
            console.log('apod connecting ' + error.statusText);
        }
    });


    //NASA API - Mars Rover Photos
    const marsUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1400&total_photos=105&camera=navcam&api_key=4OuIkgBXY1vgQKu01D3GkOy2XJYJQt5o7dwLA6di"

    $.ajax({
        url: marsUrl,
        success: function (result) {
            console.log('mrp connected');
            
            const photos = result.photos;
            const galleryFigures = $('.gallery').find('.photo');

            
            for (let i = 0; i < galleryFigures.length; i++) {
                $(galleryFigures[i]).css('background-image', `url('${photos[i].img_src}')`);
            }

            const button = $('.button');
            let counter = 6;

            button.on('click', function () {
                for (let i = counter; i < counter + 6; i++) {
                    if(i < photos.length - 1){
                        let newGalleryFigure = $('<figure class="photo"></figure>');
                            newGalleryFigure.css('background-image', `url('${photos[i].img_src}')`);
                        $('.gallery').append(newGalleryFigure); 
                    }
                    else {
                        $(this).css('display', 'none');
                        console.log("end of gallery");
                    }
                }
                counter += 6;
            })
        },
        error: function (error) {
            console.log('mrp connecting ' + error.statusText);
        }
    });
})
