/* HEADER */

/* window가 load 되었을 때 호출이 될 수 있도록 넣어주기 */
window.onload = function() {scrollFunction()};
/* window에서 scroll event가 발생할 떄 마다 호출될 수 있도록 넣어주기 */
window.onscroll = function() {scrollFunction()};

/* scroll될 때 navigation bar가 어떻게 보여질지 결정해주는 함수 */
function scrollFunction() {
    
    /* header 객체 가져오기 */
    var header = document.getElementById('header');
    
    /* documentElement.scrollTop 값 가져오고 그 값이 70보다 크다면 */
    if(document.documentElement.scrollTop > 70) {

        /* 만약, header객체에 navbar-fixed가 없다면 */
        if(!header.classList.contains('navbar-fixed')) {
            
            /* header.classList에 navbar-fixed라는 클래스를 추가해주기 */
            header.classList.add('navbar-fixed');
           
            /* body 객체를 가져와서 marginTop에 70px 넣어주기 */
            document.getElementsByTagName('body')[0].style.marginTop = '70px';
            
            /* header의 스타일에 가서 display 값을 none으로 바꿔주기 
            새로고침 했을 떄 fade 효과(잠깐 번쩍) 발생시키기 위함 */
            header.style.display = 'none';
            
            /* setTimeout 함수로 40ms이후에 호출되도록 해주고 header.style의 display값을 block으로 넣어주기 */
            setTimeout(function(){
                header.style.display = 'block';
            }, 40); 
        }


    /* documentElement.scrollTop 값이 70보다 크지 않다면 */
    } else {
        
        /* header에 navbar-fixed 클래스가 있다면 */
        if(header.classList.contains('navbar-fixed')) {
            
            /* header에서 navbar-fixed 제거해주기 */
            header.classList.remove('navbar-fixed');
            
            /* body 객체를 가져와서 marginTop 값을 0으로 설정 */
            document.getElementsByTagName('body')[0].style.marginTop= '0';
        }
    }
}

/* menuToggle 버튼을 눌렀을 때 호출되는 함수 */
function menuToggle() {
    
    /* menu객체를 가져와서 classList에서 show라는 클래스를 토글시킨다.
     토글: show라는 클래스가 없으면 추가, 있으면 제거해주는 함수 */
    document.getElementById('menu').classList.toggle('show');

}

/* ToggleBtn 버튼을 눌렀을 때 클릭 이벤트가 발생하면 menuToggle 함수를 호출 */
document.getElementById('toggleBtn').addEventListener('click', menuToggle);




/* WELCOME AREA */
/* 현재 노출되어야 하는 이미지슬라이드의 번호를 보관하고 있는 변수(imageSlideIndex) 선언 */
var imageSlideIndex = 1;

/* imageSlideIndex 함수 호출 */
showImageSlides(imageSlideIndex);

/* 일정 시간 이후 다음 슬라이드로 넘어가는 Timer 넣어주기 */
function imageSlideTimer() {
    plusImageSlides(1);
}
/* setInterval 함수를 이용해서 imageSlideTimer 함수를 3초 마다 호출하게끔 만들어주기 */
var imageTimer = setInterval(imageSlideTimer, 3000);


/* imageSlideIndex에 인자로 전달된 n값을 더하고 그 값을 전달하게 된다. */
function plusImageSlides(n) {
    /* Timer가 마음대로 움직이는 것을 방지하기 위해 클리어 해준 뒤, 다시 호출해주면 사용자가 클릭 한 후부터 3초를 세고 넘어가게 된다. */
    clearInterval(imageTimer);
    imageTimer = setInterval(imageSlideTimer, 3000);

    showImageSlides(imageSlideIndex += n);
}

/* imageSlideIndex에 인자로 전달된 n값으로 이미지 슬라이드를 초기화하여 보여주게 된다. */
function currentImageSlide(n) {
    
    /* Timer가 마음대로 움직이는 것을 방지하기 위해 클리어 해준 뒤, 다시 호출해주면 사용자가 클릭 한 후부터 3초를 세고 넘어가게 된다. */
    clearInterval(imageTimer);
    imageTimer = setInterval(imageSlideTimer, 3000);

    showImageSlides(imageSlideIndex = n);
}


/* 인자값으로 전달된 n값을 보고 적절한 슬라이드를 보여주는 함수 만들기 */
function showImageSlides(n) {
    var i;

    /* slides와 dots를 선언해주고 image-slide, dot객체 가져오기 */
    var slides = document.getElementsByClassName('image-slide');
    var dots = document.getElementsByClassName('dot');


    /* 만약 n 값이 slides.length값 보다 크다면 imageSlideIndex에 1 넣어주기 */
    if(n > slides.length) {imageSlideIndex = 1}
    /* 만약 n 값이 1보다 작다면 imageSlideIndex에 slides.length 값 넣어주기 */
    if(n < 1) {imageSlideIndex = slides.length}

    /* for문을 이용하여 이미지가 모두 안보이게 설정 */
    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    /* dots도 보이지 않게끔 처리 */
    for(i = 0; i < dots.length; i++){
        /* 만약, dots에 i 번째 인덱스 요소의 className에 'active'라는 클래스가 있다면 이를 공백으로 만들어서 제거한 후 다시 dots에 넣어주는 for문 
        모두 active가 없는 상태로 되어서 색깔이 회색에서 흰색으로 변하지 않게끔 해준다. */
        dots[i].className = dots[i].className.replace(' active', '');
    }
    /* 이미지 슬라이드 인덱스에 해당하는 슬라이드를 보여줌 (67번째 줄) 밑에 dots도 해당 */
    slides[imageSlideIndex - 1].style.display = 'block';
    dots[imageSlideIndex - 1].className += ' active';
}

/* imagePrev, Next 객체를 가져와서 클릭 이벤트 추가해주기, bind로 null 처리 후 1 값 넣기(안넣으면 함수가 바로 실행되기 때문) */
document.getElementById('imagePrev').addEventListener('click', plusImageSlides.bind(null, -1));
document.getElementById('imageNext').addEventListener('click', plusImageSlides.bind(null, 1));

/* Dot 객체 가져와서 클릭 이벤트 추가해주기 */
document.getElementById('firstDot').addEventListener('click', currentImageSlide.bind(null, 1));
document.getElementById('secondDot').addEventListener('click', currentImageSlide.bind(null, 2));
document.getElementById('thirdDot').addEventListener('click', currentImageSlide.bind(null, 3));
document.getElementById('forthDot').addEventListener('click', currentImageSlide.bind(null, 4));



/* PORTFOLIO AREA */
filterSelection('all');

function filterSelection(id) {
    var x, i;

    x = document.getElementsByClassName('listItem');
    for(i=0; i<x.length; i++){
        removeClass(x[i], 'active');
    }
    addClass(document.getElementById(id), 'active');

    x = document.getElementsByClassName('filterItem');
    if(id == 'all') id = '';
    for(i=0; i<x.length; i++) {
        removeClass(x[i], 'show');
        if(x[i].className.indexOf(id) > -1){
            addClass(x[i], 'show');
        }
    }
}

function addClass(element, name) {
    if(element.className.indexOf(name) == -1) {
        element.className += " " + name;
    }
}

function removeClass(element, name){
    var arr;
    arr = element.className.split(" ");

    while(arr.indexOf(name) > -1) {
        arr.splice(arr.indexOf(name), 1);
    }

    element.className = arr.join(" ");
}

document.getElementById('all').addEventListener('click', filterSelection.bind(null, 'all'));
document.getElementById('kimleejung').addEventListener('click', filterSelection.bind(null, 'kimleejung'));
document.getElementById('portfolio').addEventListener('click', filterSelection.bind(null, 'portfolio'));

function viewPortfolio(event){
    var polyNode = event.target;

    if(polyNode.tagName.toLowerCase() == 'i') {polyNode = polyNode.parentNode; }

    var overlayNode = polyNode;
    var imageNode = overlayNode.nextElementSibling;

    var itemNode = overlayNode.parentNode;
    var mainNode = itemNode.nextElementSibling;
    var subNode = mainNode.nextElementSibling;
    var textNode = subNode.nextElementSibling;

    document.getElementById('modalImage').src = imageNode.src;
    document.getElementById('modalMain').innerHTML = mainNode.innerHTML;
    document.getElementById('modalSub').innerHTML = subNode.innerHTML;
    document.getElementById('modalText').innerHTML = textNode.innerHTML;

    document.getElementById('portfolioModal').style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('portfolioModal').style.display = 'none';
});

var filterItems = document.getElementsByClassName('overlay');

for(var i=0; i<filterItems.length; i++){
    filterItems[i].addEventListener('click', viewPortfolio);
}

/* REVIEW AREA */
var reviewSlideIndex = 0;

function reviewSlideTimer() {
  plusReviewSlides(1);
}

var reviewTimer = setInterval(reviewSlideTimer, 3000);

function plusReviewSlides(n) {
  clearInterval(reviewTimer);
  reviewTimer = setInterval(reviewSlideTimer, 3000);
  showReviewSlides(reviewSlideIndex += n);
}

function showReviewSlides(n) {
  var i;
  var review_slides = document.getElementsByClassName('review-slide');

  if (n > review_slides.length - 3) {
    reviewSlideIndex = 0;
  }

  if (n < 0) {
    reviewSlideIndex = review_slides.length - 3;
  }

  for (i = 0; i < review_slides.length; i++) {
    removeClass(review_slides[i], 'show');
    removeClass(review_slides[i], 'res-show');
    addClass(review_slides[i], 'hide');
  }
  
  removeClass(review_slides[reviewSlideIndex], 'hide');
  addClass(review_slides[reviewSlideIndex], 'res-show');
  removeClass(review_slides[reviewSlideIndex+1], 'hide');
  addClass(review_slides[reviewSlideIndex+1], 'show');
  removeClass(review_slides[reviewSlideIndex+2], 'hide');
  addClass(review_slides[reviewSlideIndex+2], 'show');
}

document.getElementById('reviewPrev').addEventListener('click', plusReviewSlides.bind(null,-1));
document.getElementById('reviewNext').addEventListener('click', plusReviewSlides.bind(null,1));

/* ANCHOR */
function moveTo(id) {
    if(id == 'brand'){
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, document.getElementById(id).offsetTop - 70);
    }
    document.getElementById('menu').classList.remove('show');
  }
  
  document.getElementById('navbarBrand').addEventListener('click', moveTo.bind(null,'brand'));
  document.getElementById('navbarAbout').addEventListener('click', moveTo.bind(null,'about'));
  document.getElementById('navbarService').addEventListener('click', moveTo.bind(null,'service'));
  document.getElementById('navbarPortfolio').addEventListener('click', moveTo.bind(null,'portfolio'));
  document.getElementById('navbarReview').addEventListener('click', moveTo.bind(null,'review'));