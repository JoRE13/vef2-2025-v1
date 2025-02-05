let clicked = false;

try {
    const buttonElement = document.querySelector(".show-ans");
    buttonElement.addEventListener("click", () => {
        if (clicked === false) {
          document.documentElement.style.setProperty(
            "--true-ans",
            "1px solid #008000"
          );
          clicked = true;
          buttonElement.textContent = "Fela svör";
        } else {
          document.documentElement.style.setProperty("--true-ans", "none");
          clicked = false;
          buttonElement.textContent = "Sýna svör";
        }
      });
} catch(e){

}