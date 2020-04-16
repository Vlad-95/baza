ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [59.99585356410157,30.443931999999965],
        zoom: 14.5
    });

    var myPlacemark = new ymaps.Placemark([59.99585356410157,30.443931999999965]);
    myMap.geoObjects.add(myPlacemark);
}

var WINDOW_WIDTH = {
  desktop: 1200,
  laptop: 992,
  tablet: 768,
  mobile: 576
};

$(document).ready(function () {
    // ширина окна
    var documentWidth = document.documentElement.clientWidth;
    // обращаемся к шапке
    var headerWrap = document.querySelector('.header__wrap');
    // высота шапки
    var headerWrapHeight = headerWrap.offsetHeight;
    // бургер
    var burger = document.querySelector('.burger');
    // меню
    var menu = document.querySelector('.menu');

    // функция фиксации хэдера
    var headerFixHandler = function() {
        var scrollTop = document.documentElement.scrollTop;

        if (scrollTop > headerWrapHeight) {
            headerWrap.classList.add('fixed');
        } else {
            headerWrap.classList.remove('fixed');
        }
    };


    // фиксация хэдера при скролле
    window.addEventListener('scroll', headerFixHandler);

    // клик по бургеру
    /*burger.addEventListener('click', function () {
        burger.classList.toggle('active');
        menu.classList.toggle('show');

    });*/
    $('.burger').click(function () {
        $(this).toggleClass('active');
        $('.menu').fadeToggle().toggleClass('show');
    });

    // плавный скролл
    $("body").on('click', '[href*="#"]', function(e){
        var fixed_offset = 100;
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
        e.preventDefault();
        burger.classList.remove('active');
        menu.classList.remove('show');

    });

    // одинаковая высота цен
    $('.services__item').matchHeight();

    // маска
    $('#phone').mask("+7(999)999-99-99");

    // обращаемся к инпуту с Именем
    var nameInput = document.getElementById('name');
    var nameInputValue = nameInput.value;

    // проверка на ввод только букв
    nameInput.addEventListener('input',function (evt) {
        var newValue = evt.target.value;
        var regExp = /[^a-zA-Zа-яА-Я]/;
        if (newValue.match(regExp)) {
            nameInput.value = nameInputValue;
            return;
        }
        nameInputValue = newValue;
    });

    // обращаемся к инпуту с ВИН номером
    var vinInput = document.getElementById('vin');
    var vinInputValue = vinInput.value;

    // проверка на ввод только букв
    vinInput.addEventListener('input',function (evt) {
        var newValue = evt.target.value;
        var regExp = /[^a-zA-Z0-9]/;
        if (newValue.match(regExp)) {
            vinInput.value = vinInputValue;
            return;
        }
        vinInputValue = newValue;
    });

    // форма
    $('.feedback').validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true
            },
            vin: {
                required: false
            }

        },
        messages: {
            name: {
                required: "*"
            },
            phone: {
                required: "*"
            }

        },

        submitHandler: function () {
            $.ajax({
                type: "POST",
                url: "sender.php",
                data: $('.feedback').serialize(),

                error: function () {
                    $('.feedback .input-block .input').val('');
                    $('.msg').html("Ошибка");
                },
                success: function () {
                    // забыли закрыть success(function (data) {
                    $('.feedback .input-block .input').val('');
                    setTimeout(function () {
                        $('.layer-opacity').addClass("active");
                    }, 1500);
                    $('.layer-opacity, .layer-opacity .callback').click(function () {
                        $('.layer-opacity').removeClass("active");
                        clearTimeout();
                    })
                }
            });
        }
    });

});
