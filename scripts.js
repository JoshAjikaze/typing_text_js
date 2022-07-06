const TypeWriter = function (txtElement, words, wait = 1000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function () {
  //Current Index of word
  const current = this.wordIndex % this.words.length;
  //get full text of current word
  const fulltxt = this.words[current];

  //   check for deleting
  if (this.isDeleting) {
    //remove char
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  } else {
    //add char
    this.txt = fulltxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Type speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fulltxt) {
    // Make Pause at end
    typeSpeed = this.wait;
    // set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //move to next word
    this.wordIndex++;
    //Pause Before start typing
    typeSpeed = 200;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init in DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init Typewriter
  new TypeWriter(txtElement, words, wait);
}
