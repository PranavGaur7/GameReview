const more = document.querySelector(".more");
const paraMore = document.querySelector(".paraMore");

more.addEventListener("click", () => {
    if (more.innerHTML === "....more") {
        paraMore.classList.remove("hide");
        more.innerHTML = "....Show Less"
    }
    else {
        paraMore.classList.add("hide");
        more.innerHTML = "....more";
    }
})

